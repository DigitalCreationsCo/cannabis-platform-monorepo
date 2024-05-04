// /* eslint-disable no-inner-declarations */
// /* eslint-disable @typescript-eslint/naming-convention */
// /* eslint-disable sonarjs/no-duplicate-string */
// import {
// 	type DailyDeal,
// 	PrismaClient,
// 	type Address,
// 	type Category,
// 	type Coordinates,
// 	type ImageArticle,
// 	type ImageOrganization,
// 	type ImageProduct,
// 	type ImageUser,
// 	type ImageVendor,
// 	type Membership,
// 	type Prisma,
// 	type ProductVariant,
// 	type Schedule,
// 	type SubDomain,
// 	type Vendor,
// } from '@prisma/client';
// import axios from 'axios';
// import { type Dispensary } from '../dispensary/organization.types.js';
// import { type DriverCreateType } from '../driver/driver.types.js';
// import { type ReviewWithUserDetails } from '../product/product.data.js';

// const prisma = new PrismaClient({
// 	datasources: { db: { url: process.env.DATABASE_URL } },
// });

// async function getValidTokenFromSupertokens(): Promise<string | null> {
// 	let token = null;

// 	const connectionURI = process.env.SUPERTOKENS_CONNECTION_URI;
// 	const APIKey = process.env.SUPERTOKENS_CORE_API_KEY;

// 	console.info(' ST Api Key: ', APIKey);
// 	const apiDomain = process.env.NEXT_PUBLIC_SERVER_MAIN_URL;
// 	const validityInSeconds = 3600;

// 	const requestData = {
// 		payload: {
// 			source: 'microservice',
// 			// Add other payload data here
// 		},
// 		useStaticSigningKey: true,
// 		algorithm: 'RS256',
// 		jwksDomain: apiDomain,
// 		validity: validityInSeconds,
// 	};

// 	await axios
// 		.post(`${connectionURI}/recipe/jwt`, requestData, {
// 			headers: {
// 				rid: 'jwt',
// 				'api-key': APIKey,
// 				'Content-Type': 'application/json; charset=utf-8',
// 			},
// 		})
// 		.then((response) => {
// 			console.log('Response:', response.data);
// 			token = response.data.jwt;
// 		})
// 		.catch((error) => {
// 			console.error('Error:', error);
// 		});
// 	return token;
// }

// async function main() {
// 	try {
// 		console.info(
// 			`\nPerforming seed in ${process.env.DATABASE_ENV} environment.`,
// 		);
// 		console.debug(`\nSeeding database at ${process.env.DATABASE_URL}`);

// 		const token = await getValidTokenFromSupertokens();

// 		const createSubscriptionPlans = async () => {
// 			const subscriptionPlans: Prisma.SubscriptionPlanCreateInput[] = [
// 				{
// 					id: '1',
// 					name: 'Express Premium',
// 					description:
// 						'Premium value delivery service, including on-demand delivery and daily deals service.',
// 					price: 1000000,
// 					currency: 'USD',
// 					deliveryLimit: 20,
// 					featuresDelivery: true,
// 					featuresPickup: false,
// 					featuresDailyDeals: true,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '2',
// 					name: 'Express Gold',
// 					description: 'Express Gold',
// 					price: 1000000,
// 					deliveryLimit: 99,
// 					featuresDelivery: true,
// 					featuresPickup: false,
// 					featuresDailyDeals: true,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 			];
// 			await prisma.subscriptionPlan.createMany({
// 				data: subscriptionPlans,
// 				skipDuplicates: true,
// 			});
// 			console.info('create prisma.subscriptionPlan records');
// 		};

// 		const createFeaturesBackend = async () => {
// 			await prisma.featuresBackend.createMany({
// 				data: [{ feature: 'weed_text', enabled: true }],
// 			});
// 		};

// 		const createFeaturesFrontend = async () => {
// 			await prisma.featuresFrontend.createMany({
// 				data: [
// 					{ feature: 'checkout_widget', enabled: false },
// 					{ feature: 'delivery_tracking', enabled: false },
// 					{ feature: 'orders', enabled: true },
// 					{ feature: 'products', enabled: false },
// 					{ feature: 'storefront', enabled: false },
// 					{ feature: 'users', enabled: true },
// 					{ feature: 'daily_deals_sms', enabled: true },
// 				],
// 			});
// 		};

// 		const createCompliance = async () => {
// 			await prisma.compliance.create({
// 				data: {
// 					state: 'MD',
// 					license: {
// 						create: {
// 							licenseType: ['dispensary', 'delivery'],
// 						},
// 					},
// 					transport: {
// 						create: {
// 							transportWeightLimit: 100,
// 							transportStartTime: 800,
// 							transportEndTime: 2000,
// 							transportLockedStorage: true,
// 							transportManifest: true,
// 							transportStaff: 1,
// 							medicalDelivery: true,
// 							recreationalDelivery: true,
// 						},
// 					},
// 					sale: {
// 						create: {
// 							medicalSales: true,
// 							recreationalSales: true,
// 							ageLimit: 21,
// 							thcLimit: 35,
// 							weightLimit: 100,
// 						},
// 					},
// 				},
// 			});
// 		};

// 		const createCoordinates = async () => {
// 			const coordinates: Coordinates[] = [
// 				{
// 					id: 'clm2fopi0000wvksikbl2upwp',
// 					radius: 10000,
// 					latitude: 40.046,
// 					longitude: -76.302,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '1',
// 					radius: 10000,
// 					latitude: 40.046,
// 					longitude: -76.302,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '2',
// 					radius: 10000,
// 					latitude: 20.046,
// 					longitude: -36.302,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '3',
// 					radius: 10000,
// 					latitude: 50.046,
// 					longitude: -16.302,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '4',
// 					radius: 10000,
// 					latitude: 5.046,
// 					longitude: -36.302,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 			];
// 			await prisma.coordinates.createMany({
// 				data: coordinates,
// 				skipDuplicates: true,
// 			});
// 			console.info('create prisma.coordinates records');
// 		};

// 		/**
// 		 * insert dispensary records into pg db, and POST geolocate records to mongo db
// 		 */
// 		async function createOrganizations() {
// 			try {
// 				const orgs: (Prisma.OrganizationCreateInput & {
// 					address: Prisma.AddressCreateNestedOneWithoutOrganizationInput;
// 					schedule: Prisma.ScheduleCreateNestedManyWithoutOrganizationInput;
// 					images: Prisma.ImageOrganizationCreateNestedManyWithoutOrganizationInput;
// 					// products: Prisma.ProductCreateInput[];
// 					// categoryList: Prisma.CategoryListCreateInput;
// 				})[] = [
// 					{
// 						id: 'bf346k4u7x2b2hhr6wvgippp',
// 						name: 'Curaleaf MD Reisterstown',
// 						stripeAccountId: null,
// 						stripeOnboardingComplete: false,
// 						dialCode: '1',
// 						phone: '',
// 						subdomain: {
// 							connectOrCreate: {
// 								where: {
// 									id: 'curaleaf',
// 								},
// 								create: {
// 									id: 'curaleaf',
// 									isValid: true,
// 									createdAt: new Date(),
// 									updatedAt: new Date(),
// 								},
// 							},
// 						},
// 						vendor: {
// 							connectOrCreate: {
// 								where: {
// 									name: 'curaleaf',
// 								},
// 								create: {
// 									name: 'curaleaf',
// 									publicName: 'Curaleaf',
// 									createdAt: new Date(),
// 									updatedAt: new Date(),
// 								},
// 							},
// 						},
// 						termsAccepted: false,
// 						address: {
// 							create: {
// 								street1: '11722 Reisterstown Rd',
// 								street2: '',
// 								city: 'Reisterstown',
// 								state: 'MD',
// 								zipcode: 21136,
// 								country: 'United States',
// 								countryCode: 'US',
// 								coordinates: {
// 									create: {
// 										radius: 10000,
// 										latitude: 39.445438,
// 										longitude: -76.809394,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 								},
// 								createdAt: new Date(),
// 								updatedAt: new Date(),
// 							},
// 						},
// 						ecommerceUrl:
// 							'https://curaleaf.com/shop/maryland/curaleaf-md-reisterstown',
// 						showInMarketPlace: true,
// 						schedule: {
// 							createMany: {
// 								data: [
// 									{
// 										day: 'Monday',
// 										openAt: 800,
// 										closeAt: 2000,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Tuesday',
// 										openAt: 800,
// 										closeAt: 2000,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Wednesday',
// 										openAt: 800,
// 										closeAt: 2000,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Thursday',
// 										openAt: 800,
// 										closeAt: 2000,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Friday',
// 										openAt: 800,
// 										closeAt: 2000,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Saturday',
// 										openAt: 800,
// 										closeAt: 2000,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Sunday',
// 										openAt: 800,
// 										closeAt: 2000,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 								],
// 							},
// 						},
// 						images: {
// 							createMany: {
// 								data: [
// 									{
// 										location:
// 											'https://storage.cloud.google.com/fa7347ba6f76eacc-image-dispensary/curaleaf/logo-small.png?authuser=3',

// 										blurhash: 'LNR{.4og-qWUkAofxbWB~Xj[Rjay',
// 										alt: 'Curaleaf MD Reisterstown',
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 								],
// 							},
// 						},
// 						orders: {
// 							create: {
// 								total: 12399,
// 								taxFactor: 0.6,
// 								taxAmount: 1239,
// 								orderStatus: 'Pending',
// 								subtotal: 12000,
// 								customer: {
// 									connect: {
// 										id: 'bfhk6k4u7xq030hr6wvgiwao',
// 									},
// 								},
// 								driver: {
// 									connect: {
// 										id: 'bf346k4u7x2b2hhr6wvgiwao',
// 									},
// 								},
// 								destinationAddress: {
// 									connect: {
// 										id: '3',
// 									},
// 								},
// 								purchase: {
// 									create: {
// 										paymentStatus: 'Pending',
// 										gateway: 'stripe',
// 										type: 'card',
// 										amount: 12399,
// 										token: '12345',
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 								},
// 								routeId: null,
// 								isDeliveredOrder: false,
// 								isCustomerReceivedOrder: false,
// 								isCompleted: false,
// 								createdAt: new Date(),
// 								updatedAt: new Date(),
// 								deliveryDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
// 								isDriverAssigned: false,
// 								driverAssignedAt: new Date(),
// 								isProductPickedUp: false,
// 								productPickedUpAt: new Date(),
// 								customerReceivedOrderAt: new Date(),
// 								completedAt: new Date(),
// 								deliveredAt: new Date(),
// 							},
// 						},
// 						subscriptionPlan: {
// 							connect: {
// 								id: '1',
// 							},
// 						},
// 						siteSetting: {
// 							create: {
// 								title: 'Curaleaf MD Reisterstown',
// 								description: 'CuraLeaf MD Description text',
// 								bannerText: 'Curaleaf MD Banner Text',
// 								createdAt: new Date(),
// 								updatedAt: new Date(),
// 							},
// 						},
// 						categoryList: {
// 							create: {} as any,
// 						},
// 						createdAt: new Date(),
// 						updatedAt: new Date(),
// 					},
// 					{
// 						id: 'bf346k4u7x2b2hhr6wsofcsc',
// 						name: 'ReLeaf Shop Baltimore',
// 						stripeAccountId: null,
// 						stripeOnboardingComplete: false,
// 						dialCode: '1',
// 						phone: '4107739054',
// 						ecommerceUrl: 'https://www.releaf-shop.com/shop',
// 						showInMarketPlace: true,
// 						subdomain: {
// 							connectOrCreate: {
// 								where: {
// 									id: 'releaf-shop',
// 								},
// 								create: {
// 									id: 'releaf-shop',
// 									isValid: true,
// 									createdAt: new Date(),
// 									updatedAt: new Date(),
// 								},
// 							},
// 						},
// 						vendor: {
// 							connectOrCreate: {
// 								where: {
// 									name: 'releaf-shop',
// 								},
// 								create: {
// 									name: 'releaf-shop',
// 									publicName: 'Releaf Shop',
// 									createdAt: new Date(),
// 									updatedAt: new Date(),
// 								},
// 							},
// 						},
// 						termsAccepted: false,
// 						address: {
// 							create: {
// 								street1: '1114 Cathederal Street',
// 								street2: 'Suite 5',
// 								city: 'Baltimore',
// 								state: 'MD',
// 								zipcode: 21201,
// 								country: 'United States',
// 								countryCode: 'US',
// 								coordinates: {
// 									create: {
// 										radius: 10000,
// 										latitude: 39.302045,
// 										longitude: -76.618481,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 								},
// 								createdAt: new Date(),
// 								updatedAt: new Date(),
// 							},
// 						},
// 						schedule: {
// 							create: {
// 								days: 1234560,
// 								openAt: 9,
// 								closeAt: 21,
// 								createdAt: new Date(),
// 								updatedAt: new Date(),
// 							},
// 						},
// 						siteSetting: {
// 							create: {
// 								title: 'Welcome to Releaf Shop Baltimore',
// 								createdAt: new Date(),
// 								updatedAt: new Date(),
// 							},
// 						},
// 						subscriptionPlan: {
// 							connect: {
// 								id: '1',
// 							},
// 						},
// 						images: {
// 							createMany: {
// 								data: [
// 									{
// 										location:
// 											'https://storage.cloud.google.com/fa7347ba6f76eacc-image-dispensary/releaf-shop/logo-small.png?authuser=3',
// 										blurhash: 'LyKLT]ay~Xaynmj[kAj[~Xj[ogj[',
// 										alt: 'Releaf Shop Baltimore',
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 								],
// 							},
// 						},
// 					},
// 					{
// 						id: 'bf346k4u7x2b2hhr6wsofppp',
// 						name: 'Gras',
// 						stripeAccountId: 'acct_1NtESYPZq3lkE1db',
// 						stripeOnboardingComplete: true,
// 						dialCode: '1',
// 						phone: '5707901185',
// 						ecommerceUrl: 'https://localhost:9000',
// 						showInMarketPlace: true,
// 						subdomain: {
// 							connectOrCreate: {
// 								where: {
// 									id: 'gras',
// 								},
// 								create: {
// 									id: 'gras',
// 									isValid: true,
// 									createdAt: new Date(),
// 									updatedAt: new Date(),
// 								},
// 							},
// 						},
// 						vendor: {
// 							connectOrCreate: {
// 								where: {
// 									name: 'gras',
// 								},
// 								create: {
// 									name: 'gras',
// 									publicName: 'Gras',
// 									createdAt: new Date(),
// 									updatedAt: new Date(),
// 								},
// 							},
// 						},
// 						termsAccepted: false,
// 						address: {
// 							create: {
// 								street1: '123 W 33rd St',
// 								street2: '',
// 								city: 'New York',
// 								state: 'NY',
// 								zipcode: 10011,
// 								country: 'United States',
// 								countryCode: 'US',
// 								coordinates: {
// 									create: {
// 										radius: 10000,
// 										latitude: 40.740851,
// 										longitude: -73.994265,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 								},
// 								createdAt: new Date(),
// 								updatedAt: new Date(),
// 							},
// 						},
// 						subscriptionPlan: {
// 							connect: {
// 								id: '1',
// 							},
// 						},
// 						images: {
// 							createMany: {
// 								data: [
// 									{
// 										location:
// 											'https://storage.cloud.google.com/fa7347ba6f76eacc-image-dispensary/gras/logo-small.png?authuser=3',
// 										blurhash: 'LHEpchR5Bqazt.j@aeoM~Eo|IVad',
// 										alt: 'Gras',
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 								],
// 							},
// 						},
// 						orders: {
// 							create: {
// 								subtotal: 12000,
// 								total: 12399,
// 								taxFactor: 0.6,
// 								taxAmount: 1239,
// 								orderStatus: 'Pending',
// 								customer: {
// 									connect: {
// 										id: 'bfhk6k4u7xq030hr6wvgiwao',
// 									},
// 								},
// 								destinationAddress: {
// 									connect: {
// 										id: '3',
// 									},
// 								},
// 								driver: {
// 									connect: {
// 										id: 'bf346k4u7x2b2hhr6wvgiwao',
// 									},
// 								},
// 								purchase: {
// 									create: {
// 										paymentStatus: 'Pending',
// 										gateway: 'stripe',
// 										type: 'card',
// 										amount: 12399,
// 										token: '12345',
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 								},
// 								routeId: null,
// 								isDeliveredOrder: false,
// 								isCustomerReceivedOrder: false,
// 								isCompleted: false,
// 								createdAt: new Date(),
// 								updatedAt: new Date(),
// 								deliveryDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
// 								isDriverAssigned: false,
// 								driverAssignedAt: new Date(),
// 								isProductPickedUp: false,
// 								productPickedUpAt: new Date(),
// 								customerReceivedOrderAt: new Date(),
// 								completedAt: new Date(),
// 								deliveredAt: new Date(),
// 							},
// 						},
// 						schedule: {
// 							createMany: {
// 								data: [
// 									{
// 										day: 'Monday',
// 										openAt: 900,
// 										closeAt: 2100,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Tuesday',
// 										openAt: 900,
// 										closeAt: 2100,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Wednesday',
// 										openAt: 900,
// 										closeAt: 2100,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Thursday',
// 										openAt: 900,
// 										closeAt: 2100,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Friday',
// 										openAt: 900,
// 										closeAt: 2100,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Saturday',
// 										openAt: 900,
// 										closeAt: 2100,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Sunday',
// 										openAt: 900,
// 										closeAt: 2100,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 								],
// 							},
// 						},
// 						siteSetting: {
// 							create: {
// 								title: 'Gras',
// 								description: 'Best nuggs on the east coast',
// 								bannerText: 'We deliver in New York City.',
// 								createdAt: new Date(),
// 								updatedAt: new Date(),
// 							},
// 						},
// 						categoryList: {
// 							create: {} as any,
// 						},
// 						createdAt: new Date(),
// 						updatedAt: new Date(),
// 					},
// 					{
// 						id: 'bf346k4u7x2b2hhr6wvgdddp',
// 						name: 'SunnySide',
// 						stripeAccountId: null,
// 						stripeOnboardingComplete: false,
// 						dialCode: '1',
// 						phone: '6663776778',
// 						ecommerceUrl: 'https://www.sunnyside.shop/store/lancaster-pa',
// 						showInMarketPlace: true,
// 						vendor: {
// 							connectOrCreate: {
// 								where: {
// 									name: 'sunnyside',
// 								},
// 								create: {
// 									name: 'sunnyside',
// 									publicName: 'SunnySide',
// 									createdAt: new Date(),
// 									updatedAt: new Date(),
// 								},
// 							},
// 						},
// 						subdomain: {
// 							connectOrCreate: {
// 								where: {
// 									id: 'sunnyside',
// 								},
// 								create: {
// 									id: 'sunnyside',
// 									isValid: true,
// 									createdAt: new Date(),
// 									updatedAt: new Date(),
// 								},
// 							},
// 						},
// 						termsAccepted: false,
// 						address: {
// 							create: {
// 								street1: '1866 Fruitville Pike',
// 								street2: '',
// 								city: 'Lancaster',
// 								state: 'PA',
// 								zipcode: 17601,
// 								country: 'United States',
// 								countryCode: 'US',
// 								coordinates: {
// 									create: {
// 										radius: 10000,
// 										latitude: 39.3077,
// 										longitude: -76.5958,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 								},
// 								createdAt: new Date(),
// 								updatedAt: new Date(),
// 							},
// 						},
// 						images: {
// 							create: [
// 								{
// 									location:
// 										'https://storage.cloud.google.com/fa7347ba6f76eacc-image-dispensary/sunnyside/logo-small.png?authuser=3',
// 									blurhash: 'LVQuj9n$ozr=cZXTrqX9LNX9aJX9',
// 									alt: 'SunnySide',
// 									createdAt: new Date(),
// 									updatedAt: new Date(),
// 								},
// 							],
// 						},
// 						orders: {
// 							create: {
// 								subtotal: 12000,
// 								total: 23444,
// 								taxFactor: 0.6,
// 								taxAmount: 1239,
// 								orderStatus: 'Processing',
// 								customer: {
// 									connect: {
// 										id: 'bfhk6k4u7xq030hr6wvgiwao',
// 									},
// 								},
// 								destinationAddress: {
// 									connect: {
// 										id: '5',
// 									},
// 								},
// 								driver: {
// 									connect: {
// 										id: 'bf346k4u7x2b2hhr6wvgiwao',
// 									},
// 								},
// 								purchase: {
// 									create: {
// 										paymentStatus: 'Paid',
// 										gateway: 'stripe',
// 										type: 'card',
// 										amount: 23444,
// 										token: '12345',
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 								},
// 								routeId: null,
// 								isDeliveredOrder: false,
// 								isCustomerReceivedOrder: false,
// 								isCompleted: false,
// 								createdAt: new Date(),
// 								updatedAt: new Date(),
// 								deliveryDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
// 								isDriverAssigned: false,
// 								driverAssignedAt: new Date(),
// 								isProductPickedUp: false,
// 								productPickedUpAt: new Date(),
// 								customerReceivedOrderAt: new Date(),
// 								completedAt: new Date(),
// 								deliveredAt: new Date(),
// 							},
// 						},
// 						siteSetting: {
// 							create: {
// 								title: 'Sunnyside',
// 								description: 'Sunnyside Description text',
// 								bannerText: 'Sunnyside Banner Text',
// 								createdAt: new Date(),
// 								updatedAt: new Date(),
// 							},
// 						},
// 						subscriptionPlan: {
// 							connect: {
// 								id: '1',
// 							},
// 						},
// 						schedule: {
// 							createMany: {
// 								data: [
// 									{
// 										day: 'Monday',
// 										openAt: 900,
// 										closeAt: 2100,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Tuesday',
// 										openAt: 900,
// 										closeAt: 2100,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Wednesday',
// 										openAt: 900,
// 										closeAt: 2100,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Thursday',
// 										openAt: 900,
// 										closeAt: 2100,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Friday',
// 										openAt: 900,
// 										closeAt: 2100,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Saturday',
// 										openAt: 900,
// 										closeAt: 2100,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Sunday',
// 										openAt: 900,
// 										closeAt: 2100,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 								],
// 							},
// 						},
// 						createdAt: new Date(),
// 						updatedAt: new Date(),
// 					},
// 					{
// 						id: 'bf346k4u7x2b2hhr6wvgaaap',
// 						name: 'Remedy Baltimore',
// 						stripeAccountId: null,
// 						stripeOnboardingComplete: false,
// 						dialCode: '1',
// 						phone: '',
// 						termsAccepted: false,
// 						ecommerceUrl:
// 							'https://baltimore.remedymaryland.com/stores/remedy-baltimore',
// 						showInMarketPlace: true,
// 						subdomain: {
// 							connectOrCreate: {
// 								where: {
// 									id: 'remedy',
// 								},
// 								create: {
// 									id: 'remedy',
// 									isValid: true,
// 									createdAt: new Date(),
// 									updatedAt: new Date(),
// 								},
// 							},
// 						},
// 						vendor: {
// 							connectOrCreate: {
// 								where: {
// 									name: 'remedy',
// 								},
// 								create: {
// 									name: 'remedy',
// 									publicName: 'Remedy',
// 									createdAt: new Date(),
// 									updatedAt: new Date(),
// 								},
// 							},
// 						},
// 						address: {
// 							create: {
// 								street1: '7165 Security Blvd Suite C',
// 								street2: '',
// 								city: 'Windsor Mill',
// 								state: 'MD',
// 								zipcode: 21244,
// 								country: 'United States',
// 								countryCode: 'US',
// 								coordinates: {
// 									create: {
// 										radius: 10000,
// 										latitude: 39.313284,
// 										longitude: -76.757832,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 								},
// 								createdAt: new Date(),
// 								updatedAt: new Date(),
// 							},
// 						},
// 						subscriptionPlan: {
// 							connect: {
// 								id: '1',
// 							},
// 						},
// 						images: {
// 							create: [
// 								{
// 									location:
// 										'https://storage.cloud.google.com/fa7347ba6f76eacc-image-dispensary/remedy/logo-small.png?authuser=3',

// 									blurhash: 'LKF5c*R.03xV$xM}NL%004j@~SWE',
// 									alt: 'Remedy Baltimore',
// 									createdAt: new Date(),
// 									updatedAt: new Date(),
// 								},
// 							],
// 						},
// 						orders: {
// 							create: {
// 								subtotal: 12000,
// 								total: 1244,
// 								taxFactor: 0.6,
// 								taxAmount: 1239,
// 								orderStatus: 'Delivered',
// 								customer: {
// 									connect: {
// 										id: 'bfhk6k4u7xq030hr6wvgiwao',
// 									},
// 								},
// 								destinationAddress: {
// 									connect: {
// 										id: '3',
// 									},
// 								},
// 								driver: {
// 									connect: {
// 										id: 'bf346k4u7x2b2hhr6wvgiwao',
// 									},
// 								},
// 								purchase: {
// 									create: {
// 										paymentStatus: 'Paid',
// 										gateway: 'stripe',
// 										type: 'card',
// 										amount: 12399,
// 										token: '12345',
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 								},
// 								isDeliveredOrder: false,
// 								isCustomerReceivedOrder: false,
// 								isCompleted: false,
// 								routeId: null,
// 								createdAt: new Date(),
// 								updatedAt: new Date(),
// 								deliveryDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
// 								isDriverAssigned: false,
// 								driverAssignedAt: new Date(),
// 								isProductPickedUp: false,
// 								productPickedUpAt: new Date(),
// 								customerReceivedOrderAt: new Date(),
// 								completedAt: new Date(),
// 								deliveredAt: new Date(),
// 							},
// 						},
// 						schedule: {
// 							createMany: {
// 								data: [
// 									{
// 										day: 'Monday',
// 										openAt: 500,
// 										closeAt: 2200,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Tuesday',
// 										openAt: 500,
// 										closeAt: 2200,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Wednesday',
// 										openAt: 500,
// 										closeAt: 2200,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Thursday',
// 										openAt: 500,
// 										closeAt: 2200,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Friday',
// 										openAt: 500,
// 										closeAt: 2200,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Saturday',
// 										openAt: 500,
// 										closeAt: 2200,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 									{
// 										day: 'Sunday',
// 										openAt: 500,
// 										closeAt: 2200,
// 										createdAt: new Date(),
// 										updatedAt: new Date(),
// 									},
// 								],
// 							},
// 						},
// 						siteSetting: {
// 							create: {
// 								title: 'Remedy Baltimore',
// 								description: 'Remedy Description text',
// 								bannerText: 'Remedy Banner Text',
// 								primaryColor: '#fff',
// 								secondaryColor: '#17C649',
// 								tertiaryColor: '#fff2da',
// 								backgroundColor: '#000',
// 								createdAt: new Date(),
// 								updatedAt: new Date(),
// 							},
// 						},
// 						categoryList: {
// 							create: {} as any,
// 						},
// 						createdAt: new Date(),
// 						updatedAt: new Date(),
// 					},
// 				];

// 				for (const org of orgs) {
// 					await prisma.organization
// 						.create({
// 							data: org,
// 						})
// 						.then(async (organization) => {
// 							console.info(
// 								'create prisma.organization record: ' +
// 									organization.name +
// 									': ' +
// 									organization.id,
// 							);

// 							await axios.post<Dispensary>(
// 								process?.env?.NEXT_PUBLIC_SERVER_MAIN_URL +
// 									'/api/v1/serve-local/organizations/record',
// 								{
// 									id: organization.id,
// 									name: organization.name,
// 									dialCode: organization.dialCode,
// 									phone: organization.phone,
// 									address: {
// 										street1: org.address.create?.street1,
// 										street2: org.address.create?.street2,
// 										city: org.address.create?.city,
// 										state: org.address.create?.state,
// 										zipcode: org.address.create?.zipcode,
// 										country: org.address.create?.country,
// 										countryCode: org.address.create?.countryCode,
// 										coordinates: {
// 											latitude:
// 												org.address.create?.coordinates?.create?.latitude,
// 											longitude:
// 												org.address.create?.coordinates?.create?.longitude,
// 										},
// 									},
// 									vendorId: organization.vendorId,
// 									subdomain: organization.subdomainId,
// 								},
// 								{
// 									headers: {
// 										Authorization: `Bearer ${token}`,
// 									},
// 									validateStatus: (status) =>
// 										(status >= 200 && status <= 302) || status == 404,
// 								},
// 							);

// 							console.info(
// 								'create mongo.organization_geolocate record: ' +
// 									organization.name +
// 									': ' +
// 									organization.id,
// 							);
// 						})
// 						.finally(() => {
// 							console.info('create prisma.organization records');
// 						})
// 						.catch((error) => {
// 							throw new Error(`${org.name} was not created. ${error.message}`);
// 						});
// 				}
// 			} catch (error) {
// 				throw new Error(error.message);
// 			}
// 		}

// 		const createUsers = async () => {
// 			// USERS
// 			const users: Prisma.UserCreateInput[] = [
// 				{
// 					id: 'bfhk6k4u7xq030hr6wvgiwao',
// 					firstName: 'Bob',
// 					lastName: 'Roberts',
// 					username: 'BigChiefa22',
// 					email: 'bmejia220@gmail.com',
// 					phone: '1232343453',
// 					emailVerified: false,
// 					scannedDOB: new Date(),
// 					is_legal_age: false,
// 					id_verified: false,
// 					isSignUpComplete: false,
// 					dialCode: '1',
// 					idFrontImage: null,
// 					idBackImage: null,
// 					termsAccepted: true,
// 					profilePicture: {
// 						create: {
// 							id: '1',
// 							location:
// 								'https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png',
// 							blurhash: 'dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH',
// 							alt: 'Bob Roberts',
// 							createdAt: new Date(),
// 							updatedAt: new Date(),
// 						},
// 					},
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: 'pf346k4u7xq030hr6wvgiwap',
// 					firstName: 'Sam',
// 					lastName: 'Samuels',
// 					username: 'Sammy223',
// 					email: 'abdeveloper8888@gmail.com',
// 					phone: '1232343452',
// 					emailVerified: true,
// 					is_legal_age: false,
// 					id_verified: false,
// 					scannedDOB: new Date(),
// 					isSignUpComplete: false,
// 					dialCode: '1',
// 					idFrontImage: null,
// 					idBackImage: null,
// 					termsAccepted: true,
// 					profilePicture: {
// 						create: {
// 							id: '2',
// 							location:
// 								'https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png',
// 							blurhash: '',
// 							alt: 'Sam Samuels',
// 							createdAt: new Date(),
// 							updatedAt: new Date(),
// 						},
// 					},
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 			];

// 			for (const user of users) {
// 				await prisma.user.create({ data: user });
// 			}
// 			console.info('create prisma.user records');
// 		};

// 		const createAddresses = async () => {
// 			// ADDRESS
// 			const addresses: Address[] = [
// 				{
// 					id: 'clm2fooj6000ovksiht6oif7z',
// 					street1: '832 Columbia Avenue',
// 					street2: '',
// 					city: 'Lancaster',
// 					state: 'PA',
// 					zipcode: 17603,
// 					country: 'United States',
// 					countryCode: 'US',
// 					coordinateId: 'clm2fopi0000wvksikbl2upwp',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '1',
// 					street1: '123 King St',
// 					street2: 'Suite 200',
// 					city: 'Lancaster',
// 					state: 'PA',
// 					zipcode: 17602,
// 					country: 'United States',
// 					countryCode: 'US',
// 					coordinateId: null,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '2',
// 					street1: '345 Marietta St',
// 					street2: 'Suite 200',
// 					city: 'Lancaster',
// 					state: 'PA',
// 					zipcode: 17602,
// 					country: 'United States',
// 					countryCode: 'US',
// 					coordinateId: null,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '3',
// 					street1: '45 King St',
// 					street2: 'Suite 99',
// 					city: 'Lancaster',
// 					state: 'PA',
// 					zipcode: 17602,
// 					country: 'United States',
// 					countryCode: 'US',
// 					coordinateId: null,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '4',
// 					street1: '999 Golden St.',
// 					street2: 'Suite A',
// 					city: 'Lancaster',
// 					state: 'PA',
// 					zipcode: 17602,
// 					country: 'United States',
// 					countryCode: 'US',
// 					coordinateId: null,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '5',
// 					street1: '119 McDade Blvd',
// 					street2: 'Apt 4',
// 					city: 'Glenolden',
// 					state: 'PA',
// 					zipcode: 17602,
// 					country: 'United States',
// 					countryCode: 'US',
// 					coordinateId: null,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 			];
// 			await prisma.address.createMany({
// 				data: addresses,
// 				skipDuplicates: true,
// 			});
// 			console.info('create prisma.address records');
// 		};

// 		const createVendors = async () => {
// 			// VENDOR
// 			const vendors: Vendor[] = [
// 				{
// 					id: '1',
// 					name: 'gras',
// 					publicName: 'Gras',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '2',
// 					name: 'curaleaf',
// 					publicName: 'Curaleaf',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '3',
// 					name: 'sunnyside',
// 					publicName: 'SunnySide',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 			];

// 			await prisma.vendor.createMany({
// 				data: vendors,
// 				skipDuplicates: true,
// 			});
// 			console.info('create prisma.vendor records');
// 		};

// 		const createSchedules = async () => {
// 			// SCHEDULES
// 			const schedules: Schedule[] = [];

// 			await prisma.schedule.createMany({
// 				data: schedules,
// 				skipDuplicates: true,
// 			});
// 			console.info('create prisma.schedule records');
// 		};

// 		const createSubdomains = async () => {
// 			// SUBDOMAIN
// 			const subdomains: SubDomain[] = [
// 				{
// 					id: '',
// 					isValid: true,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: 'curaleaf',
// 					isValid: true,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: 'sunnyside',
// 					isValid: true,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 			];

// 			await prisma.subDomain.createMany({
// 				data: subdomains,
// 				skipDuplicates: true,
// 			});
// 			console.info('create prisma.subDomain records');
// 		};

// 		const createCategories = async () => {
// 			// CATEGORY
// 			const Categories: Category[] = [
// 				{
// 					id: '1',
// 					name: 'Edibles',
// 					slug: 'edibles',
// 					icon: 'Breakfast',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '2',
// 					name: 'Seeds',
// 					slug: 'seeds',
// 					icon: 'Breakfast',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '3',
// 					name: 'Medicinal',
// 					slug: 'medicinal',
// 					icon: 'Breakfast',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '4',
// 					name: 'Topicals',
// 					slug: 'topicals',
// 					icon: 'Breakfast',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '5',
// 					name: 'Vape Pens',
// 					slug: 'vape-pens',
// 					icon: 'Breakfast',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '6',
// 					name: 'Tinctures',
// 					slug: 'tinctures',
// 					icon: 'Breakfast',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '7',
// 					name: 'Capsules',
// 					slug: 'capsules',
// 					icon: 'Breakfast',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '8',
// 					name: 'Hash',
// 					slug: 'hash',
// 					icon: 'Breakfast',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '9',
// 					name: 'Flower',
// 					slug: 'flower',
// 					icon: 'Breakfast',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 			];

// 			await prisma.category.createMany({
// 				data: Categories,
// 				skipDuplicates: true,
// 			});
// 			console.info('create prisma.category records');
// 		};

// 		const createDrivers = async () => {
// 			// DRIVERS
// 			const drivers: DriverCreateType[] = [
// 				{
// 					driver: {
// 						email: 'bmejiadeveloper2@gmail.com',
// 					},
// 					email: 'bmejiadeveloper2@gmail.com',
// 					id: 'bf346k4u7x2b2hhr6wvgiwao',
// 					firstName: 'Bryant',
// 					lastName: 'Mejia',
// 					username: 'BigChiefa',
// 					phone: '1232343456',
// 					emailVerified: true,
// 					is_legal_age: null,
// 					id_verified: true,
// 					isSignUpComplete: true,
// 					dialCode: '1',
// 					idFrontImage: '',
// 					idBackImage: '',
// 					termsAccepted: true,
// 					address: [
// 						{
// 							street1: '1234 Main St',
// 							city: 'Baltimore',
// 							state: 'MD',
// 							zipcode: 21202,
// 							country: 'United States',

// 							countryCode: 'US',
// 							coordinates: {
// 								latitude: 39.2904,
// 								longitude: -76.6122,
// 							},
// 							createdAt: new Date(),
// 							updatedAt: new Date(),
// 						},
// 					],
// 					profilePicture: {
// 						userId: 'bf346k4u7x2b2hhr6wvgiwao',
// 						location:
// 							'https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png',
// 						blurhash: 'dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH',
// 						alt: 'Bryant Mejia',
// 						createdAt: new Date(),
// 						updatedAt: new Date(),
// 					},
// 					memberships: [],
// 				},
// 				{
// 					driver: { email: 'bryantmejia@grascannabis.org' },
// 					email: 'bryantmejia@grascannabis.org',
// 					id: 'jjyt0krxhwdmtg4um1cj56on',
// 					firstName: 'Bryant',
// 					lastName: 'Mejia',
// 					username: 'bmejia248',
// 					emailVerified: true,
// 					is_legal_age: true,
// 					isSignUpComplete: true,
// 					termsAccepted: true,
// 					id_verified: true,
// 					scannedDOB: '2023-09-02T19:45:01.192Z',
// 					dialCode: '1',
// 					phone: '5707901185',
// 					address: [
// 						{
// 							id: 'clm2fooj6000ovksiht6oif7z',
// 							street1: '832 Columbia Avenue',
// 							street2: '',
// 							city: 'Lancaster',
// 							state: 'PA',
// 							zipcode: 17603,
// 							country: 'United States',
// 							countryCode: 'US',
// 							coordinates: {
// 								latitude: 40.0379959,
// 								longitude: -76.3229132,
// 								radius: null,
// 								createdAt: '2023-09-02T19:45:36.791Z',
// 								updatedAt: '2023-09-02T19:45:36.791Z',
// 							},
// 							createdAt: '2023-09-02T19:45:35.538Z',
// 							updatedAt: '2023-09-02T19:45:36.791Z',
// 						},
// 					],
// 					profilePicture: {
// 						userId: 'jjyt0krxhwdmtg4um1cj56on',
// 						id: 'clm2foj6r000gvksi76ql2f8d',
// 						location:
// 							'https://storage.cloud.google.com/image-user/avatar6.png?authuser=1',
// 						blurhash: '',
// 						alt: 'Bryant Mejia',
// 						createdAt: '2023-09-02T19:45:28.610Z',
// 						updatedAt: '2023-09-02T19:45:28.610Z',
// 					},
// 					memberships: [],
// 				},
// 			];

// 			for (const driver of drivers) {
// 				console.info(
// 					'create driver record: ' + driver.firstName + ', ' + driver.email,
// 				);

// 				console.info('using auth token: ', token);
// 				await Promise.resolve(
// 					axios.post<Dispensary>(
// 						process?.env?.NEXT_PUBLIC_SERVER_MAIN_URL + '/api/v1/driver',
// 						driver,
// 						{
// 							headers: {
// 								Authorization: `Bearer ${token}`,
// 							},
// 							validateStatus: (status) =>
// 								(status >= 200 && status <= 302) || status == 404,
// 						},
// 					),
// 				)
// 					.then(() => {
// 						console.info(
// 							'created prisma driver record and mongo.driver_session record: ' +
// 								driver.email +
// 								', ' +
// 								driver.firstName,
// 						);
// 					})
// 					.catch((error) => {
// 						console.error('create Driver: ', error.message);
// 						throw new Error(error.message);
// 					});
// 			}
// 		};

// 		const createOrders = async () => {
// 			// ORDER
// 			const orders: Prisma.OrderCreateInput[] = [
// 				{
// 					id: 'clmwcjxec0000vk9bc7u79p81',
// 					deliveryFee: 9999,
// 					platformFee: 1200,
// 					mileageFee: 1425,
// 					distance: 15455,
// 					isWeedTextOrder: false,
// 					isDeliveredOnTime: false,
// 					duration: 1234,
// 					subtotal: 12000,
// 					total: 12399,
// 					taxFactor: 0.6,
// 					taxAmount: 1239,
// 					orderStatus: 'Pending',
// 					customer: {
// 						connect: {
// 							id: 'bfhk6k4u7xq030hr6wvgiwao',
// 						},
// 					},
// 					destinationAddress: {
// 						connect: {
// 							id: '5',
// 						},
// 					},
// 					driver: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgiwao',
// 						},
// 					},
// 					organization: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgippp',
// 						},
// 					},
// 					purchase: {
// 						create: {
// 							paymentStatus: 'Pending',
// 							gateway: 'stripe',
// 							type: 'card',
// 							amount: 12399,
// 							token: '12345',
// 							createdAt: new Date(),
// 							updatedAt: new Date(),
// 						},
// 					},
// 					routeId: null,
// 					isDeliveredOrder: false,
// 					isCustomerReceivedOrder: false,
// 					isCompleted: false,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 					deliveryDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
// 					isDriverAssigned: false,
// 					driverAssignedAt: new Date(),
// 					isProductPickedUp: false,
// 					productPickedUpAt: new Date(),
// 					customerReceivedOrderAt: new Date(),
// 					completedAt: new Date(),
// 					deliveredAt: new Date(),
// 				},
// 				{
// 					deliveryFee: 9999,
// 					platformFee: 1200,
// 					mileageFee: 1425,
// 					distance: 15455,
// 					isDeliveredOnTime: false,
// 					duration: 1234,
// 					subtotal: 12000,
// 					total: 23444,
// 					taxFactor: 0.6,
// 					taxAmount: 1239,
// 					orderStatus: 'Processing',
// 					customer: {
// 						connect: {
// 							id: 'bfhk6k4u7xq030hr6wvgiwao',
// 						},
// 					},
// 					destinationAddress: {
// 						connect: {
// 							id: '5',
// 						},
// 					},
// 					driver: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgiwao',
// 						},
// 					},
// 					organization: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgippp',
// 						},
// 					},
// 					purchase: {
// 						create: {
// 							paymentStatus: 'Paid',
// 							gateway: 'stripe',
// 							type: 'card',
// 							amount: 23444,
// 							token: '12345',
// 							createdAt: new Date(),
// 							updatedAt: new Date(),
// 						},
// 					},
// 					routeId: null,
// 					isDeliveredOrder: false,
// 					isCustomerReceivedOrder: false,
// 					isCompleted: false,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 					deliveryDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
// 					isDriverAssigned: false,
// 					driverAssignedAt: new Date(),
// 					isProductPickedUp: false,
// 					productPickedUpAt: new Date(),
// 					customerReceivedOrderAt: new Date(),
// 					completedAt: new Date(),
// 					deliveredAt: new Date(),
// 				},
// 				{
// 					deliveryFee: 9999,
// 					platformFee: 1200,
// 					mileageFee: 1425,
// 					distance: 15455,
// 					isDeliveredOnTime: false,
// 					duration: 1234,
// 					subtotal: 12000,
// 					total: 1244,
// 					taxFactor: 0.6,
// 					taxAmount: 1239,
// 					orderStatus: 'Completed',
// 					customer: {
// 						connect: {
// 							id: 'bfhk6k4u7xq030hr6wvgiwao',
// 						},
// 					},
// 					destinationAddress: {
// 						connect: {
// 							id: '3',
// 						},
// 					},
// 					driver: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgiwao',
// 						},
// 					},
// 					organization: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgippp',
// 						},
// 					},
// 					isDeliveredOrder: false,
// 					isCustomerReceivedOrder: false,
// 					isCompleted: false,
// 					routeId: null,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 					deliveryDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
// 					isDriverAssigned: false,
// 					driverAssignedAt: new Date(),
// 					isProductPickedUp: false,
// 					productPickedUpAt: new Date(),
// 					customerReceivedOrderAt: new Date(),
// 					completedAt: new Date(),
// 					deliveredAt: new Date(),
// 				},
// 				{
// 					deliveryFee: 9999,
// 					platformFee: 1200,
// 					mileageFee: 1425,
// 					distance: 15455,
// 					isDeliveredOnTime: false,
// 					duration: 1234,
// 					subtotal: 12000,
// 					total: 6999,
// 					taxFactor: 0.6,
// 					taxAmount: 1239,
// 					orderStatus: 'Delivered',
// 					customer: {
// 						connect: {
// 							id: 'bfhk6k4u7xq030hr6wvgiwao',
// 						},
// 					},
// 					destinationAddress: {
// 						connect: {
// 							id: '5',
// 						},
// 					},
// 					driver: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgiwao',
// 						},
// 					},
// 					organization: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgippp',
// 						},
// 					},
// 					routeId: null,
// 					isDeliveredOrder: false,
// 					isCustomerReceivedOrder: false,
// 					isCompleted: false,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 					deliveryDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
// 					isDriverAssigned: false,
// 					driverAssignedAt: new Date(),
// 					isProductPickedUp: false,
// 					productPickedUpAt: new Date(),
// 					customerReceivedOrderAt: new Date(),
// 					completedAt: new Date(),
// 					deliveredAt: new Date(),
// 				},
// 				{
// 					deliveryFee: 9999,
// 					platformFee: 1200,
// 					mileageFee: 1425,
// 					distance: 15455,
// 					isDeliveredOnTime: false,
// 					duration: 1234,
// 					subtotal: 12000,
// 					total: 12999,
// 					taxFactor: 0.6,
// 					taxAmount: 1239,
// 					orderStatus: 'Cancelled',
// 					customer: {
// 						connect: {
// 							id: 'bfhk6k4u7xq030hr6wvgiwao',
// 						},
// 					},
// 					destinationAddress: {
// 						connect: {
// 							id: '3',
// 						},
// 					},
// 					driver: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgiwao',
// 						},
// 					},
// 					organization: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgdddp',
// 						},
// 					},
// 					routeId: null,
// 					isDeliveredOrder: false,
// 					isCustomerReceivedOrder: false,
// 					isCompleted: false,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 					deliveryDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
// 					isDriverAssigned: false,
// 					driverAssignedAt: new Date(),
// 					isProductPickedUp: false,
// 					productPickedUpAt: new Date(),
// 					customerReceivedOrderAt: new Date(),
// 					completedAt: new Date(),
// 					deliveredAt: new Date(),
// 				},
// 				{
// 					deliveryFee: 9999,
// 					platformFee: 1200,
// 					mileageFee: 1425,
// 					distance: 15455,
// 					isDeliveredOnTime: false,
// 					duration: 1234,
// 					subtotal: 12000,
// 					total: 14599,
// 					taxFactor: 0.6,
// 					taxAmount: 1239,
// 					orderStatus: 'Pending',
// 					customer: {
// 						connect: {
// 							id: 'bfhk6k4u7xq030hr6wvgiwao',
// 						},
// 					},
// 					destinationAddress: {
// 						connect: {
// 							id: '4',
// 						},
// 					},
// 					driver: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgiwao',
// 						},
// 					},
// 					organization: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgaaap',
// 						},
// 					},
// 					isDeliveredOrder: false,
// 					isCustomerReceivedOrder: false,
// 					isCompleted: false,
// 					routeId: null,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 					deliveryDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
// 					isDriverAssigned: false,
// 					driverAssignedAt: new Date(),
// 					isProductPickedUp: false,
// 					productPickedUpAt: new Date(),
// 					customerReceivedOrderAt: new Date(),
// 					completedAt: new Date(),
// 					deliveredAt: new Date(),
// 				},
// 			];
// 			for (const order of orders) {
// 				await prisma.order.create({
// 					data: order,
// 				});
// 			}
// 			console.info('create prisma.order records');
// 		};

// 		async function createMemberships() {
// 			// MEMBERSHIP
// 			const memberships: Membership[] = [
// 				{
// 					id: '1',
// 					role: 'MEMBER',
// 					organizationId: 'bf346k4u7x2b2hhr6wsofppp',
// 					userId: 'bfhk6k4u7xq030hr6wvgiwao',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '2',
// 					role: 'ADMIN',
// 					userId: 'pf346k4u7xq030hr6wvgiwap',
// 					organizationId: 'bf346k4u7x2b2hhr6wvgippp',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				// {
// 				// 	id: '1',
// 				// 	role: 'MEMBER',
// 				// 	organizationId: '2',
// 				// 	userId: 'bfhk6k4u7xq030hr6wvgiwao',
// 				// 	createdAt: new Date(),
// 				// 	updatedAt: new Date(),
// 				// },
// 				// {
// 				// 	id: '2',
// 				// 	role: 'ADMIN',
// 				// 	organizationId: '2',
// 				// 	userId: '1',
// 				// 	createdAt: new Date(),
// 				// 	updatedAt: new Date(),
// 				// },
// 				// {
// 				// 	id: '3',
// 				// 	role: 'OWNER',
// 				// 	organizationId: '2',
// 				// 	userId: '1',
// 				// 	createdAt: new Date(),
// 				// 	updatedAt: new Date(),
// 				// },
// 				// {
// 				// 	id: '4',
// 				// 	role: 'OWNER',
// 				// 	organizationId: '3',
// 				// 	userId: '3',
// 				// 	createdAt: new Date(),
// 				// 	updatedAt: new Date(),
// 				// },
// 			];

// 			for (const membership of memberships) {
// 				await prisma.membership.create({
// 					data: {
// 						id: membership.id,
// 						role: membership.role,
// 						organizationId: membership.organizationId,
// 						userId: membership.userId,
// 						createdAt: membership.createdAt,
// 						updatedAt: membership.updatedAt,
// 					},
// 				});
// 			}

// 			console.info('create prisma.membership records');
// 		}

// 		// PRODUCTVARIANT
// 		const variants: ProductVariant[] = [
// 			{
// 				id: '1',
// 				name: 'King OG',
// 				unit: 'g',
// 				size: 3.5,
// 				currency: 'USD',
// 				basePrice: 6999,
// 				discount: 10,
// 				stock: 5,
// 				productId: '1',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgippp',
// 				rating: 4.5,
// 				organizationName: 'Curaleaf MD Reisterstown',
// 				quantity: 3,
// 				isDiscount: true,
// 				salePrice: 6499,
// 				sku: '1234567',
// 				createdAt: new Date(),
// 				updatedAt: new Date(),
// 			},
// 			{
// 				id: '2',
// 				name: 'King OG',
// 				unit: 'g',
// 				size: 9,
// 				currency: 'USD',
// 				basePrice: 17999,
// 				discount: 5,
// 				rating: 4.5,
// 				stock: 9,
// 				productId: '1',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgippp',
// 				organizationName: 'Curaleaf MD Reisterstown',
// 				quantity: 3,
// 				isDiscount: true,
// 				salePrice: 6499,
// 				sku: '1234567',
// 				createdAt: new Date(),
// 				updatedAt: new Date(),
// 			},
// 			{
// 				id: '3',
// 				name: 'Blackberry Kush',
// 				unit: 'g',
// 				size: 3.5,
// 				currency: 'USD',
// 				basePrice: 6999,
// 				discount: 5,
// 				stock: 5,
// 				productId: '2',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgippp',
// 				rating: 4.5,
// 				organizationName: 'Curaleaf MD Reisterstown',
// 				quantity: 3,
// 				isDiscount: true,
// 				salePrice: 6499,
// 				sku: '1234567',
// 				createdAt: new Date(),
// 				updatedAt: new Date(),
// 			},
// 			{
// 				id: '4',
// 				name: 'Blackberry Nuggs',
// 				unit: 'g',
// 				size: 3.5,
// 				currency: 'USD',
// 				basePrice: 6999,
// 				discount: 5,
// 				stock: 5,
// 				productId: '3',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgippp',
// 				organizationName: 'Curaleaf MD Reisterstown',
// 				quantity: 3,
// 				isDiscount: true,
// 				rating: 4.5,
// 				salePrice: 6499,
// 				sku: '1234567',
// 				createdAt: new Date(),
// 				updatedAt: new Date(),
// 			},
// 			{
// 				id: '5',
// 				name: 'Red Taffy Firetruck',
// 				unit: 'g',
// 				size: 3.5,
// 				currency: 'USD',
// 				basePrice: 6999,
// 				discount: 5,
// 				rating: 4.5,
// 				stock: 5,
// 				productId: '4',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgippp',
// 				organizationName: 'Curaleaf MD Reisterstown',
// 				quantity: 3,
// 				isDiscount: true,
// 				salePrice: 6499,
// 				sku: '1234567',
// 				createdAt: new Date(),
// 				updatedAt: new Date(),
// 			},
// 			{
// 				id: '6',
// 				name: 'Eagle cbd oil',
// 				unit: 'g',
// 				size: 3.5,
// 				currency: 'USD',
// 				basePrice: 6999,
// 				discount: 5,
// 				stock: 5,
// 				productId: '5',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgippp',
// 				quantity: 3,
// 				rating: 4.5,
// 				isDiscount: true,
// 				salePrice: 6499,
// 				organizationName: 'Curaleaf MD Reisterstown',
// 				sku: '1234567',
// 				createdAt: new Date(),
// 				updatedAt: new Date(),
// 			},
// 			{
// 				id: '7',
// 				name: 'Magic Mountain Bush',
// 				unit: 'g',
// 				size: 3.5,
// 				currency: 'USD',
// 				basePrice: 6999,
// 				rating: 4.5,
// 				discount: 5,
// 				stock: 5,
// 				productId: '6',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgippp',
// 				organizationName: 'Curaleaf MD Reisterstown',
// 				quantity: 3,
// 				isDiscount: true,
// 				salePrice: 6499,
// 				sku: '1234567',
// 				createdAt: new Date(),
// 				updatedAt: new Date(),
// 			},
// 			{
// 				id: '8',
// 				name: 'Razmatazz',
// 				unit: 'g',
// 				size: 3.5,
// 				currency: 'USD',
// 				basePrice: 6999,
// 				discount: 5,
// 				stock: 5,
// 				rating: 4.5,
// 				productId: '7',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgippp',
// 				organizationName: 'Curaleaf MD Reisterstown',
// 				quantity: 3,
// 				isDiscount: true,
// 				salePrice: 6499,
// 				sku: '1234567',
// 				createdAt: new Date(),
// 				updatedAt: new Date(),
// 			},
// 		];
// 		async function createVariants() {
// 			await prisma.productVariant.createMany({
// 				data: variants,
// 				skipDuplicates: true,
// 			});
// 			console.info('create prisma.productVariant records');
// 		}

// 		const createProductsAndVariants = async () => {
// 			// PRODUCT
// 			const products: Prisma.ProductCreateInput[] = [
// 				{
// 					id: '1',
// 					name: 'King OG',
// 					description: 'turpentines all day baby',
// 					features: 'fresh, without formaline',
// 					tags: 'mini, flower, og',
// 					organization: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgippp',
// 						},
// 					},
// 					rating: 4.5,
// 					reviews: {
// 						create: {
// 							id: '1',
// 							rating: 5,
// 							comment: 'Great thing!',
// 							user: {
// 								connect: {
// 									id: 'bfhk6k4u7xq030hr6wvgiwao',
// 								},
// 							},
// 							createdAt: new Date(),
// 							updatedAt: new Date(),
// 						},
// 					},
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '2',
// 					name: 'Blackberry Kush',
// 					description: 'Satisfying Liquid Goochy',
// 					features: 'fresh, relaxing',
// 					tags: 'flower, og',
// 					organization: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgippp',
// 						},
// 					},
// 					rating: 4.5,
// 					variants: {
// 						create: {
// 							id: '3',
// 							name: 'Blackberry Kush',
// 							unit: 'g',
// 							size: 3.5,
// 							currency: 'USD',
// 							basePrice: 6999,
// 							discount: 5,
// 							stock: 5,
// 							organizationId: 'bf346k4u7x2b2hhr6wvgippp',
// 							organizationName: 'Curaleaf MD Reisterstown',
// 							rating: 4.5,
// 							quantity: 3,
// 							isDiscount: true,
// 							salePrice: 6499,
// 							sku: '1234567',
// 							createdAt: new Date(),
// 							updatedAt: new Date(),
// 						},
// 					},
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '3',
// 					name: 'Blackberry Nuggs',
// 					description: 'check out these nuggs',
// 					features: 'fresh, relaxing',
// 					tags: 'flower, og',
// 					organization: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgippp',
// 						},
// 					},
// 					rating: 3.3,
// 					variants: {
// 						create: {
// 							id: '4',
// 							name: 'Blackberry Nuggs',
// 							unit: 'g',
// 							size: 3.5,
// 							currency: 'USD',
// 							basePrice: 6999,
// 							discount: 5,
// 							stock: 5,
// 							organizationId: 'bf346k4u7x2b2hhr6wvgippp',
// 							organizationName: 'Curaleaf MD Reisterstown',
// 							quantity: 3,
// 							isDiscount: true,
// 							rating: 4.5,
// 							salePrice: 6499,
// 							sku: '1234567',
// 							createdAt: new Date(),
// 							updatedAt: new Date(),
// 						},
// 					},
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '4',
// 					name: 'Red Taffy Firetruck',
// 					description: 'Wonderfuly for you',
// 					features: 'fresh, relaxing',
// 					tags: 'flower, og',
// 					organization: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgippp',
// 						},
// 					},
// 					rating: 4.0,
// 					variants: {
// 						create: {
// 							id: '5',
// 							name: 'Red Taffy Firetruck',
// 							unit: 'g',
// 							size: 3.5,
// 							currency: 'USD',
// 							basePrice: 6999,
// 							discount: 5,
// 							rating: 4.5,
// 							stock: 5,
// 							organizationId: 'bf346k4u7x2b2hhr6wvgippp',
// 							organizationName: 'Curaleaf MD Reisterstown',
// 							quantity: 3,
// 							isDiscount: true,
// 							salePrice: 6499,
// 							sku: '1234567',
// 							createdAt: new Date(),
// 							updatedAt: new Date(),
// 						},
// 					},
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '5',
// 					name: 'Eagle cbd oil',
// 					description: 'Satisfying Liquid Goochy',
// 					features: 'fresh, relaxing',
// 					tags: 'cbd, og',
// 					organization: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wsofcsc',
// 						},
// 					},
// 					rating: 2.5,
// 					variants: {
// 						create: {
// 							id: '6',
// 							name: 'Eagle cbd oil',
// 							unit: 'g',
// 							size: 3.5,
// 							currency: 'USD',
// 							basePrice: 6999,
// 							discount: 5,
// 							stock: 5,
// 							organizationId: 'bf346k4u7x2b2hhr6wsofcsc',
// 							quantity: 3,
// 							rating: 4.5,
// 							isDiscount: true,
// 							salePrice: 6499,
// 							organizationName: 'ReLeaf Shop Baltimore',
// 							sku: '1234567',
// 							createdAt: new Date(),
// 							updatedAt: new Date(),
// 						},
// 					},
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '6',
// 					name: 'Magic Mountain Bush',
// 					description: 'helpful for your heart',
// 					features: 'fresh, relaxing',
// 					tags: 'flower, og',
// 					organization: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgdddp',
// 						},
// 					},
// 					rating: 5.0,
// 					variants: {
// 						create: {
// 							id: '7',
// 							name: 'Magic Mountain Bush',
// 							unit: 'g',
// 							size: 3.5,
// 							currency: 'USD',
// 							basePrice: 6999,
// 							rating: 4.5,
// 							discount: 5,
// 							stock: 5,
// 							organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
// 							organizationName: 'SunnySide',
// 							quantity: 3,
// 							isDiscount: true,
// 							salePrice: 6499,
// 							sku: '1234567',
// 							createdAt: new Date(),
// 							updatedAt: new Date(),
// 						},
// 					},
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '7',
// 					name: 'Razmatazz',
// 					description: 'sweet and sour',
// 					features: 'fresh, relaxing',
// 					tags: 'flower, og',
// 					organization: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgdddp',
// 						},
// 					},
// 					rating: 4.0,
// 					variants: {
// 						create: {
// 							id: '8',
// 							name: 'Razmatazz',
// 							unit: 'g',
// 							size: 3.5,
// 							currency: 'USD',
// 							basePrice: 6999,
// 							discount: 5,
// 							stock: 5,
// 							rating: 4.5,
// 							organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
// 							organizationName: 'SunnySide',
// 							quantity: 3,
// 							isDiscount: true,
// 							salePrice: 6499,
// 							sku: '1234567',
// 							createdAt: new Date(),
// 							updatedAt: new Date(),
// 						},
// 					},
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '8',
// 					name: 'Eagle cbd oil',
// 					description: 'Satisfying Liquid Goochy',
// 					features: 'fresh, relaxing',
// 					tags: 'cbd, og',
// 					organization: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgdddp',
// 						},
// 					},
// 					rating: 2.5,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '9',
// 					name: 'Magic Mountain Bush',
// 					description: 'helpful for your heart',
// 					features: 'fresh, relaxing',
// 					tags: 'flower, og',
// 					organization: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgaaap',
// 						},
// 					},
// 					rating: 5.0,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '10',
// 					name: 'Razmatazz',
// 					description: 'sweet and sour',
// 					features: 'fresh, relaxing',
// 					tags: 'flower, og',
// 					organization: {
// 						connect: {
// 							id: 'bf346k4u7x2b2hhr6wvgaaap',
// 						},
// 					},
// 					rating: 4.0,
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 			];

// 			for (const product of products) {
// 				await prisma.product.create({
// 					data: {
// 						...product,
// 						categories: {
// 							connect: [{ id: '9' }],
// 						},
// 						// variants: {
// 						//   connect: variants.filter(variant => variant.productId === product.id).map(variant => ({ id: variant.id }))
// 						// }
// 					},
// 				});
// 			}
// 			console.info('create prisma.product records');
// 		};

// 		const createVendorImages = async () => {
// 			// IMAGEVENDOR
// 			const ImageVendors: ImageVendor[] = [
// 				{
// 					id: '1',
// 					location:
// 						'https://cloudfront-us-east-1.images.arcpublishing.com/gray/GHYFGWKYW5CMRHTINQDDFCN7CI.jpg',
// 					blurhash: '',
// 					alt: 'Alt text',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 			];

// 			await prisma.imageVendor.createMany({
// 				data: ImageVendors,
// 				skipDuplicates: true,
// 			});
// 		};

// 		const createOrganizationImages = async () => {
// 			// IMAGEORGANIZATION
// 			const ImageOrganizations: ImageOrganization[] = [
// 				{
// 					id: '1',
// 					location:
// 						'https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png',
// 					alt: 'Alt text',
// 					blurhash: '',
// 					organizationId: '1',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '2',
// 					location:
// 						'https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png',
// 					blurhash: '',
// 					alt: 'Alt Text',
// 					organizationId: '2',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 			];

// 			await prisma.imageOrganization.createMany({
// 				data: ImageOrganizations,
// 				skipDuplicates: true,
// 			});
// 			console.info('create prisma.imageOrganization records');
// 		};

// 		const createProductImages = async () => {
// 			// IMAGEPRODUCT
// 			const ImageProducts: ImageProduct[] = [
// 				{
// 					id: '1',
// 					location:
// 						'https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png',
// 					blurhash: '',
// 					alt: 'Alt text',
// 					variantId: '1',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '2',
// 					location:
// 						'https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png',
// 					blurhash: '',
// 					alt: 'Alt text',
// 					variantId: '1',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '3',
// 					location:
// 						'https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png',
// 					blurhash: '',
// 					alt: 'Alt text',
// 					variantId: '3',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '4',
// 					location:
// 						'https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png',
// 					blurhash: '',
// 					alt: 'Alt text',
// 					variantId: '4',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '5',
// 					location:
// 						'https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png',
// 					blurhash: '',
// 					alt: 'Alt text',
// 					variantId: '5',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '6',
// 					location:
// 						'https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png',
// 					blurhash: '',
// 					alt: 'Alt text',
// 					variantId: '6',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '7',
// 					location:
// 						'https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png',
// 					blurhash: '',
// 					alt: 'Alt text',
// 					variantId: '7',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 			];
// 			await prisma.imageProduct.createMany({
// 				data: ImageProducts,
// 				skipDuplicates: true,
// 			});
// 			console.info('create prisma.imageProduct records');
// 		};

// 		const createUserImages = async () => {
// 			// IMAGEUSER
// 			const ImageUsers: ImageUser[] = [
// 				{
// 					id: '1',
// 					location:
// 						'https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png',
// 					blurhash: '',
// 					alt: 'Alt text',
// 					userId: '1',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 			];
// 			await prisma.imageUser.createMany({
// 				data: ImageUsers,
// 				skipDuplicates: true,
// 			});
// 			console.info('create prisma.imageUser records');
// 		};

// 		const createArticles = async () => {
// 			// ARTICLES
// 			const articles: Prisma.ArticleCreateInput[] = [
// 				{
// 					id: '1',
// 					name: 'we-support-your-dispensary',
// 					title: `Your Dispensary Thrives With Gras`,
// 					description: 'Connect with customers who love what you do.',
// 					href: '12345',
// 					content: '',
// 					author: '',
// 					tag: 'gras',
// 					image: {
// 						create: {
// 							location:
// 								'https://greenstocknews.com/images/placeholder/cannabis/medicinal/md1.jpg',
// 							blurhash: '',
// 							alt: 'Your Dispensary Thrives With Gras',
// 							createdAt: new Date(),
// 							updatedAt: new Date(),
// 						},
// 					},
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '2',
// 					name: 'offering-delivery-service',
// 					title: 'Fast and Safe Delivery',
// 					description: 'Delivery By Our Trained Delivery Team',
// 					href: '123457',
// 					content: '',
// 					author: '',
// 					tag: 'gras',
// 					image: {
// 						create: {
// 							location:
// 								'https://img.freepik.com/premium-photo/delivery-person-holding-parcel-with-food-delivery-against-yellow-surface_93675-111653.jpg',
// 							blurhash: '',
// 							alt: 'Fast and Safe Delivery',
// 							createdAt: new Date(),
// 							updatedAt: new Date(),
// 						},
// 					},
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '3',
// 					title: 'Gras Is Here To Serve',
// 					name: 'gras-is-here',
// 					description: 'Sign Up Your Dispensary for Home Delivery',
// 					href: '12377456',
// 					content: '',
// 					author: '',
// 					tag: 'gras',
// 					image: {
// 						create: {
// 							location:
// 								'https://gras-dispensary-images.us-southeast-1.linodeobjects.com/loveweed.png',
// 							blurhash: '',
// 							alt: 'Gras Is Here To Serve',
// 							createdAt: new Date(),
// 							updatedAt: new Date(),
// 						},
// 					},
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 			];

// 			for (const article of articles) {
// 				await prisma.article.create({
// 					data: article,
// 				});
// 			}
// 			console.info('create prisma.article records');
// 		};

// 		const createArticleImages = async () => {
// 			// IMAGEARTICLE
// 			const ImageArticles: ImageArticle[] = [
// 				{
// 					id: '1',
// 					location:
// 						'https://greenstocknews.com/images/placeholder/cannabis/medicinal/md1.jpg',
// 					blurhash: '',
// 					alt: 'Alt text',
// 					articleId: '1',

// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '2',
// 					location:
// 						'https://img.freepik.com/premium-photo/delivery-person-holding-parcel-with-food-delivery-against-yellow-surface_93675-111653.jpg',
// 					blurhash: '',
// 					alt: 'Alt text',
// 					articleId: '2',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 				{
// 					id: '3',
// 					location:
// 						'https://gras-dispensary-images.us-southeast-1.linodeobjects.com/loveweed.png',
// 					blurhash: '',
// 					alt: 'Alt text',
// 					articleId: '3',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 				},
// 			];
// 			await prisma.imageArticle.createMany({
// 				data: ImageArticles,
// 				skipDuplicates: true,
// 			});
// 			console.info('create prisma.imageArticle records');
// 		};

// 		const createReviews = async () => {
// 			// REVIEWS
// 			// need to update this seed for user information, will fail seed as it is now - 06182023
// 			const reviews: ReviewWithUserDetails[] = [
// 				{
// 					id: '1',
// 					rating: 5,
// 					comment: 'Great thing!',
// 					productId: '1',
// 					userId: 'bfhk6k4u7xq030hr6wvgiwao',
// 					createdAt: new Date(),
// 					updatedAt: new Date(),
// 					user: {
// 						id: 'bfhk6k4u7xq030hr6wvgiwao',
// 						username: 'Sammy223',
// 						profilePicture: {
// 							id: '2',
// 							userId: 'bfhk6k4u7xq030hr6wvgiwao',
// 							location:
// 								'https://www.baltimoremagazine.com/wp-content/uploads/2019/12/baltimore-oriole-s52-11-018-l-0.jpg',
// 							blurhash: 'dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH',
// 							createdAt: new Date(),
// 							updatedAt: new Date(),
// 						},
// 					},
// 				},
// 			];
// 			for (const review of reviews) {
// 				await prisma.review.create({
// 					data: {
// 						id: review.id,
// 						rating: review.rating,
// 						comment: review.comment,
// 						user: {
// 							connect: {
// 								id: review.userId,
// 							},
// 						},
// 						product: {
// 							connect: {
// 								id: review.productId,
// 							},
// 						},
// 						createdAt: review.createdAt,
// 						updatedAt: review.updatedAt,
// 					},
// 				});
// 			}
// 			console.info('create prisma.review records');
// 		};

// 		async function createDailyDeals() {
// 			const dailyDeals: DailyDeal[] = [
// 				{
// 					id: '1',
// 					title: 'You dont want to miss this!',
// 					message: "You dont want to miss this! Order before we're sold out!",
// 					isExpired: false,
// 					doesRepeat: false,
// 					// cron schedule
// 					schedule: '0 0 0 * * *',
// 					organizationId: 'bf346k4u7x2b2hhr6wsofppp',
// 					startTime: new Date(),
// 					// set date for tomorrow
// 					endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
// 				},
// 			];

// 			await prisma.dailyDeal.createMany({
// 				data: dailyDeals,
// 			});
// 		}

// 		await Promise.all([
// 			await createSubscriptionPlans(),
// 			await createCompliance(),
// 			await createDrivers(),
// 			await createCoordinates(),
// 			await createAddresses(),
// 		])
// 			.then(async () => {
// 				await Promise.all([await createVendors(), await createUsers()]);
// 			})
// 			.then(async () => {
// 				await Promise.all([
// 					await createOrganizations(),

// 					// await createSchedules(); // appended to organizations
// 					await createSubdomains(),
// 					await createCategories(),

// 					// await createOrders(); // appended to organization seed

// 					// await createVariants(); // appended to product seed
// 					// await createReviews(); // appended to product seed

// 					await createVendorImages(),
// 					// await createOrganizationImages(); //appended to organizations
// 					// await createProductImages(); // appended to products
// 					// await createUserImages(); // appended to user seed
// 					await createArticles(),
// 					// await createArticleImages(); // appended to article seed
// 					await createSchedules(),
// 				]);
// 			})
// 			.then(async () => {
// 				await Promise.all([
// 					await createMemberships(),

// 					await createProductsAndVariants(),
// 					await createDailyDeals(),
// 				]);
// 			})
// 			.then(async () => {
// 				await Promise.all([
// 					await createFeaturesBackend(),
// 					await createFeaturesFrontend(),
// 				]);
// 			});
// 	} catch (e) {
// 		throw new Error(e);
// 	}
// }

// main()
// 	.then(async () => await prisma.$disconnect())
// 	.catch(async (e) => {
// 		console.error(e);
// 		await prisma.$disconnect();
// 		process.exit(1);
// 	});

export {};
