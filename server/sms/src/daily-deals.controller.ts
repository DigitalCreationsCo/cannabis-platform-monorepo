import {
	isValidOrderRecord,
	urlBuilder,
	multiplyAllItemsForOrder,
	buildOrderRecord,
	isEmpty,
	showTime,
	getDailyDealProductsAndCalculateTotal,
} from '@gras/core';
import SMS from '@gras/core/lib/sms/sms.module';
import {
	type DailyDealCreateWithSkus,
	findDailyDeal,
	findDailyDealsByOrganization,
	findUserWithDetailsByPhone,
	type OrderCreateType,
	type DailyDealWithOrganization,
	type DailyDeal,
	findActiveDailyDeals,
	findOrganizationById,
	type OrderWithShopDetails,
	createDailyDeal,
} from '@gras/data-access';
import axios from 'axios';
import nodeCache from 'node-cache';
import { redisDailyDeals } from './redis-daily-deals';

const oneDaySeconds = 86400;
type RequestedDeliveryTime = 'now' | 'later';

const dailyDealCache = new nodeCache({
	stdTTL: oneDaySeconds,
	checkperiod: oneDaySeconds,
});

/* =================================
WeedTextController - controller class for daily deal functions

members:
getActiveDailyDeals
createDailyDeal
getDailyDealById
getManyDailyDealsByOrganization
handleWeedTextOrder

================================= */
export class DailyDealsController {
	/**
	 * getActiveDailyDeals
	 */
	static async getActiveDailyDeals(req, res) {
		try {
			const dailyDeals = await findActiveDailyDeals();

			return res.status(200).json({
				success: 'true',
				payload: dailyDeals,
			});
		} catch (error) {
			console.error(`getActiveDailyDeals: ${error}`);
			return res.status(500).json({ success: 'false', error: error.message });
		}
	}

	/**
	 * createDailyDeal
	 */
	static async createDailyDeal(req, res) {
		try {
			const dailyDealCreateDataWithSkus: DailyDealCreateWithSkus = req.body;
			const dailyDealWithProductDetails =
				await getDailyDealProductsAndCalculateTotal(
					dailyDealCreateDataWithSkus
				);
			await createDailyDeal(dailyDealWithProductDetails);
			console.debug(' Successfully created DailyDeal record.');
			return res.status(201).json({
				success: 'true',
				message: ' You created a new Daily Deal.',
			});
		} catch (error) {
			console.error(`createDailyDeal: ${error}`);
			return res.status(500).json({ success: 'false', error: error.message });
		}
	}

	/**
	 * getDailyDealById
	 */
	static async getDailyDealById(req, res) {
		try {
			const { id } = req.params;

			if (!id) throw new Error('No deal id provided');

			const dailyDeal = await getCacheDailyDeal(id);

			if (!dailyDeal) throw new Error('No deal found');

			return res.status(201).json({
				success: 'true',
				message: ' You created a new Daily Deal.',
				payload: dailyDeal,
			});
		} catch (error) {
			console.error(`getDailyDealById: ${error}`);
			if (
				error.message === 'No deal id provided' ||
				error.message === 'No deal found'
			) {
				return res.status(400).json({ success: 'false', error: error.message });
			}
			return res.status(500).json({ success: 'false', error: error.message });
		}
	}

	/**
	 * getManyDailyDealsByOrganization
	 */
	static async getManyDailyDealsByOrganization(req, res) {
		try {
			const { id } = req.params;

			if (!id) throw new Error('No dispensary id provided');

			const dailyDeals = await findDailyDealsByOrganization(id);

			if (!dailyDeals.length) throw new Error('No deal was found');

			return res.status(200).json({
				success: 'true',
				payload: dailyDeals,
			});
		} catch (error) {
			console.error(`getManyDailyDealsByOrganization: ${error}`);
			return res.status(500).json({ success: 'false', error: error.message });
		}
	}

	/** sms platform received inbound message, keyword automation and webhook sends the inbound to this endpoint for order processing
	* sms platform automation records the customer response, adds the payload from the weedtext outgoing message, and sends both payloads here

	* ! OPTION: sms platform can save the response to redis, and this endpoint can subscribe to redis db
	* no webhook needed, just a subscription to redis db
	* keep the webhook as a fallback, in case the subscription fails
    */
	static async handleWeedTextOrder(req, res) {
		try {
			// external service handles keywords
			// handle them here as well for redundancy

			// TODO: CREATE MULTISTEP MESSAGING
			// step 1 - ask for number of orders
			// step 2 - ask for delivery time ( now or later )
			const deliveryTime: RequestedDeliveryTime = 'now';

			const dailyDailyDeal = await isValidWeedTextOrderRequest(req.body);
			if (dailyDailyDeal) {
				const { numOrders, phoneNumber, dealId } = req.body;

				// limit the number of db lookups and ajax calls, for the lowest latency possible
				const order = await processWeedTextOrder({
					dailyDeal: dailyDailyDeal,
					numOrders,
					phoneNumber,
					dealId,
				});

				// sendOrderConfirmation via sms
				sendOrderConfirmationSMS(
					phoneNumber,
					numOrders,
					deliveryTime,
					order.deliveryDeadline
				);
				return res.status(200).json({
					success: 'true',
					message: 'Order created Successfully',
				});
			} else {
				// do nothing, it's not a valid request
				return res
					.status(400)
					.json({ success: 'false', message: 'Invalid Request' });
			}
		} catch (error) {
			console.error(`handleWeedTextOrder: ${error}`);
			return res.status(500).json({ success: 'false', error: error.message });
		}
	}
}

/**
 * createOrder via ajax to server/main, sendNewOrderEmail from server/main
 * , startFulfillment
 * @param numOrders
 * @param phoneNumber
 * @param deal
 */
async function processWeedTextOrder({
	dailyDeal,
	numOrders,
	phoneNumber,
	dealId,
}: {
	dealId: string;
	numOrders: number;
	phoneNumber: string;
	dailyDeal: DailyDealWithOrganization;
}) {
	try {
		// send ajax request to server/main for order processing
		// create an order using the phoneNumber of the customers,
		// get user by phonenumber -> from a cached list of users. if not found, get from db and cache
		const order: OrderCreateType = await buildOrderFromWeedTextRequest({
			dailyDeal,
			numOrders,
			customerPhoneNumber: phoneNumber,
			dealId,
		});

		if (!isValidOrderRecord(order)) {
			throw new Error('Invalid Order');
		}

		const createdOrder = await axios.post<OrderWithShopDetails>(
			urlBuilder.main.orders(),
			order
		);

		// send ajax request for payment service to charge the customer's card
		await axios.post(urlBuilder.payment.chargeCustomer(), {
			order: createdOrder,
		});

		// a successful stripe webhook response will start the fulfillment process
		return createdOrder.data;
	} catch (error) {
		console.error(error);
	}
}

async function buildOrderFromWeedTextRequest({
	dailyDeal,
	numOrders,
	customerPhoneNumber,
	dealId,
}: {
	dealId: string;
	numOrders: number;
	customerPhoneNumber: string;
	dailyDeal: DailyDealWithOrganization;
}): Promise<OrderCreateType> {
	try {
		const customer = await findUserWithDetailsByPhone(customerPhoneNumber);

		let organization;
		let deal;
		if (!isEmpty(dailyDeal.organization)) {
			const { organization, ...rest } = dailyDeal;
			deal = rest;
		} else {
			organization = await findOrganizationById(dailyDeal.organizationId);
			deal = dailyDeal;
		}

		// GET ITEMS FROM DAILY DEAL
		const items = multiplyAllItemsForOrder([], numOrders);

		return await buildOrderRecord({
			type: 'delivery',
			organizationId: organization.id,
			subtotal: deal.total,
			total: deal.total,
			taxFactor: 0,
			taxAmount: 0,
			organization,
			customer,
			customerId: customer.id,
			isWeedTextOrder: true,
			destinationAddress: customer.address[0],
			items,
		});
	} catch (error) {
		console.error(error);
		throw new Error('buildOrderFromWeedTextRequest: ' + error.message);
	}
}

async function sendOrderConfirmationSMS(
	phone: string,
	numOrders: number,
	deliveryTime: RequestedDeliveryTime,
	etaTime: Date
) {
	SMS.send(
		'new_order',
		phone,
		`Got it, you want ${numOrders}, delivered ${deliveryTime}.  We'll deliver to you by ${showTime(
			etaTime
		)} We'll message you when it's on the way!`
	);
}

const isValidWeedTextOrderRequest = async (
	body: Record<string, any>
): Promise<DailyDealWithOrganization | false> => {
	try {
		// check body for required fields
		const isValidRequestPayload = (body) =>
			body &&
			body.date &&
			body.id &&
			body.phoneNumber &&
			body.numOrders &&
			typeof body.numOrders === 'number';

		if (!isValidRequestPayload(body)) {
			return false;
		} else {
			const dailyDeal = await getCacheDailyDeal(body.dealId);

			if (!dailyDeal) return false;

			return isOrderPlacedAtAValidTime(body.date, dailyDeal) && dailyDeal;
			// check the time of the request, if it's not from today, return false
		}
	} catch (error) {
		console.error(error);
		return false;
	}
};

function isOrderPlacedAtAValidTime(date: any, deal: DailyDeal) {
	const { startTime, endTime } = deal;
	// check the time of the request, if it's not from today, don't process it
	// compare date to today's date
	// if order date is today and the order time is between the deal's hours, return true
	// else return false
	return (
		new Date().toDateString === new Date(date).toDateString &&
		new Date(date) >= startTime &&
		new Date(date) <= endTime
	);
}

const getCacheDailyDeal = async (
	dealId: string
): Promise<DailyDealWithOrganization | false> => {
	// get dailydeal from memory cache
	let dailyDeal = await dailyDealCache.get<DailyDealWithOrganization>(dealId);
	if (!dailyDeal) {
		// get dailydeal from redis
		dailyDeal = JSON.parse(await redisDailyDeals.get(dealId));
		if (!dailyDeal) {
			// get dailydeal from db
			dailyDeal = (await findDailyDeal(dealId)) as DailyDealWithOrganization;
			if (!dailyDeal) {
				return false;
			} else {
				setCacheDailyDeal(dailyDeal);
			}
		}
	}
	return dailyDeal.isExpired && dailyDeal;
};

export const getAllCacheDailyDeals = async (): Promise<
	DailyDealWithOrganization[]
> => {
	// get dailydeal from memory cache
	let dailyDeals = Object.values(
		await dailyDealCache.mget<DailyDealWithOrganization>(
			await dailyDealCache.keys()
		)
	);
	if (!dailyDeals.length || dailyDeals.length === 0) {
		// get dailydeal from redis
		// RETURN DailyDeal[] || []
		dailyDeals = JSON.parse(await redisDailyDeals.get('*'));
		console.info('redis daily deals: ', dailyDeals);

		if (!dailyDeals.length || dailyDeals.length === 0) {
			// get dailydeal from db
			dailyDeals = await findActiveDailyDeals();
			dailyDeals.forEach((deal) => {
				try {
					setCacheDailyDeal(deal);
				} catch (error) {
					console.error(
						'getAllCacheDailyDeals encountered an error with deal ' + deal.id,
						deal,
						error
					);
					throw new Error(error.message);
				}
			});
		}
	}
	return dailyDeals;
};

export const setCacheDailyDeal = async (deal: DailyDealWithOrganization) => {
	try {
		dailyDealCache.set<DailyDealWithOrganization>(deal.id, deal, oneDaySeconds);
		await redisDailyDeals.setEx(deal.id, oneDaySeconds, JSON.stringify(deal));
	} catch (error) {
		console.error('cacheDailyDeal: ', error);
	}
};
