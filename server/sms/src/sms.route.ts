import SMSModule from '@cd/core-lib/lib/sms';
import { type ProductVariant } from '@cd/data-access';
import { Router } from 'express';
import nodeCache from 'node-cache';
const redisWeedText = {};

const dailyDealCache = new nodeCache({ stdTTL: 86400, checkperiod: 86400 });
const router = Router();
/* =================================
SMS Routes

"/weed-text-response"                    POST

================================= */

// sms platform received inbound message, keyword automation and webhook sends the inbound to this endpoint for order processing
// sms platform automation records the customer response, adds the payload from the weedtext outgoing message, and sends both payloads here

// ! OPTION: sms platform can save the response to redis, and this endpoint can subscribe to redis db
// no webhook needed, just a subscription to redis db
// keep the webhook as a fallback, in case the subscription fails
router.route('/weed-text-response').post(async (req, res) => {
	try {
		const dailyWeedTextOffer = isValidWeedTextOrderRequest(req.body);
		if (dailyWeedTextOffer) {
			const { numOrders, phoneNumber, dealId } = req.body;

			// limit the number of db lookups and ajax calls, for the lowest latency possible
			await pushWeedTextOrder(numOrders, phoneNumber, dealId);
			sendOrderConfirmationSMS(phoneNumber);
			// sendOrderConfirmation via sms here
		} else {
			// do nothing, it's not a valid request
		}
	} catch (error) {
		console.error(error);
	}
});

export default router;

/**
 * createOrder via ajax to server/main, sendNewOrderEmail from server/main
 * , startFulfillment
 * @param numOrders
 * @param phoneNumber
 * @param deal
 */
async function pushWeedTextOrder(numOrders: number, phoneNumber: string, deal) {
	// send ajax request to server/main for order processing
	// create an order using the phoneNumber of the customers,
	// get user by phonenumber -> from a cached list of users. if not found, get from db and cache
	// return a promise
}

async function sendOrderConfirmationSMS(phone: string) {
	SMSModule.send(
		'new_order',
		phone,
		`Thanks for ordering. We will send you an update when your order is on the way!`,
	);
}

const isValidWeedTextOrderRequest = async (
	body: Record<string, any>,
): Promise<WeedTextDeal | false> => {
	try {
		// check body for required fields
		const isValidRequestPayload = (body) =>
			body &&
			body.date &&
			body.dealId &&
			body.phoneNumber &&
			body.numOrders &&
			typeof body.numOrders === 'number';

		if (!isValidRequestPayload(body)) {
			return false;
		} else {
			const dailyDeal = await getDailyDeal(body.dealId);

			if (!dailyDeal) return false;

			return isOrderPlacedAtAValidTime(body.date, dailyDeal) && dailyDeal;
			// check the time of the request, if it's not from today, return false
		}
	} catch (error) {
		console.error(error);
		return false;
	}
};

function isOrderPlacedAtAValidTime(date: any, deal: WeedTextDeal) {
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

const getDailyDeal = async (dealId: string): Promise<WeedTextDeal | false> => {
	// get dailydeal from memory cache
	let dailyDeal = await dailyDealCache.get(dealId);
	if (!dailyDeal) {
		// get dailydeal from redis
		dailyDeal = await redisWeedText.get(dealId);
		if (!dailyDeal) {
			return false;
		} else {
			await dailyDealCache.set(dealId, dailyDeal);
		}
	}
	return dailyDeal as any;
};

const setDailyDeal = async (deal: WeedTextDeal) => {
	// get dailydeal from rediscache
	return await redisWeedText.setEx(deal.dealId, deal, 86400);
};

interface WeedTextDeal {
	dealId: string;
	startTime: Date;
	endTime: Date;
	products: ProductVariant[];
	subtotal: number;
}
