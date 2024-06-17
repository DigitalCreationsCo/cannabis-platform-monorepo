// import { MongoClient, type Collection } from 'mongodb';
// // import client from "./generated/prisma-client/index.js"

// async function clearRecords() {
// 	console.info(`\nClearing records in ${process.env.DATABASE_ENV} `);
// 	console.debug(`\n database at ${process.env.DATABASE_URL}`);

// 	let organizations_geolocate: Collection | null = null;
// 	let driver_sessions_collection: Collection | null = null;
// 	let dispatch_orders_collection: Collection | null = null;

// 	await prisma.$connect().then(() => console.info('connected to db'));
// 	await MongoClient.connect(process?.env?.MONGODB_CONNECTION_URL as string)
// 		.then(async (client) => {
// 			organizations_geolocate = await client
// 				.db(process?.env?.LOCATION_DB_NS as string)
// 				.collection('organizations_geolocate');
// 			driver_sessions_collection = await client
// 				.db(process?.env?.DISPATCH_DB_NS as string)
// 				.collection('driver_sessions');
// 			dispatch_orders_collection = await client
// 				.db(process?.env?.DISPATCH_DB_NS as string)
// 				.collection('dispatch_orders');
// 		})
// 		.then(async () => {
// 			console.info('clearing tables...');

// 			await prisma.compliance.deleteMany();
// 			console.info('clear prisma.compliance');

// 			await prisma.imageVendor.deleteMany();
// 			console.info('clear prisma.imageVendor');

// 			await prisma.imageOrganization.deleteMany();
// 			console.info('clear prisma.imageOrganization');

// 			await prisma.imageProduct.deleteMany();
// 			console.info('clear prisma.imageProduct');

// 			await prisma.imageUser.deleteMany();
// 			console.info('clear prisma.imageUser');

// 			await prisma.article.deleteMany();
// 			console.info('clear prisma.article');

// 			await prisma.imageArticle.deleteMany();
// 			console.info('clear prisma.imageArticle');

// 			await prisma.siteSetting.deleteMany();
// 			console.info('clear prisma.siteSetting');

// 			await prisma.category.deleteMany();
// 			console.info('clear prisma.category');

// 			await prisma.categoryList.deleteMany();
// 			console.info('clear prisma.categoryList');

// 			await prisma.route.deleteMany();
// 			console.info('clear prisma.route');

// 			await prisma.driverSession.deleteMany();
// 			console.info('clear prisma.driverSession');

// 			driver_sessions_collection?.deleteMany();
// 			console.info('clear mongo.driver_sessions');

// 			await prisma.driver.deleteMany();
// 			console.info('clear prisma.driver');

// 			await prisma.purchase.deleteMany();
// 			console.info('clear prisma.purchase');

// 			await prisma.order.deleteMany();
// 			console.info('clear prisma.order');

// 			dispatch_orders_collection?.deleteMany();
// 			console.info('clear mongo.dispatch_orders');

// 			await prisma.productVariant.deleteMany();
// 			console.info('clear prisma.productVariant');

// 			await prisma.product.deleteMany();
// 			console.info('clear prisma.product');

// 			await prisma.organization.deleteMany();
// 			console.info('clear prisma.organization');

// 			organizations_geolocate?.deleteMany();
// 			console.info('clear mongo.organizations_geolocate');

// 			await prisma.address.deleteMany();
// 			console.info('clear prisma.address');

// 			await prisma.vendor.deleteMany();
// 			console.info('clear prisma.vendor');

// 			await prisma.subDomain.deleteMany();
// 			console.info('clear prisma.subDomain');

// 			await prisma.membership.deleteMany();
// 			console.info('clear prisma.membership');

// 			await prisma.user.deleteMany();
// 			console.info('clear prisma.user');

// 			await prisma.dailyDeal.deleteMany();
// 			console.info('clear prisma.dailyDeal');

// 			await prisma.featuresBackend.deleteMany();
// 			console.info('clear prisma.featuresBackend');

// 			await prisma.featuresFrontend.deleteMany();
// 			console.info('clear prisma.featuresFrontend');

// 			await prisma.subscriptionPlan.deleteMany();
// 			console.info('clear prisma.subscriptionPlan');

// 			await prisma.coordinates.deleteMany();
// 			console.info('clear prisma.coordinates');

// 			await prisma.schedule.deleteMany();
// 			console.info('clear prisma.schedule');
// 		})
// 		.catch((err) => {
// 			console.error('Clear Records Error: ', err.message);
// 			process.exit(1);
// 		})
// 		.finally(() => {
// 			console.info('cleared all tables');
// 			prisma.$disconnect();
// 			process.exit(0);
// 		});
// }

// export default clearRecords();
