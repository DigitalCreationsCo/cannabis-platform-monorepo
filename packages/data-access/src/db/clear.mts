import { PrismaClient } from '@prisma/client';
import { Collection, MongoClient } from 'mongodb';
// import client from "./generated/prisma-client/index.js"

const prisma = new PrismaClient();

async function clearRecords() {
    let
        organizations_geolocate: Collection | null = null;

    await prisma.$connect().then(() => console.log('connected to db'));
    await MongoClient.connect(process?.env?.MONGODB_CONNECTION_URL as string)
        .then(async (client) => {
            organizations_geolocate = await client.db(process?.env?.LOCATION_DB_NS as string).collection("organizations_geolocate");

            console.log('clearing tables...');

            await prisma.imageVendor.deleteMany();
            console.info('clear prisma.imageVendor')

            await prisma.imageOrganization.deleteMany();
            console.info('clear prisma.imageOrganization')

            await prisma.imageProduct.deleteMany();
            console.info('clear prisma.imageProduct')

            await prisma.imageUser.deleteMany();
            console.info('clear prisma.imageUser')

            await prisma.article.deleteMany();
            console.info('clear prisma.article')

            await prisma.imageArticle.deleteMany();
            console.info('clear prisma.imageArticle')

            await prisma.siteSetting.deleteMany();
            console.info('clear prisma.siteSetting')

            await prisma.category.deleteMany();
            console.info('clear prisma.category')

            await prisma.categoryList.deleteMany();
            console.info('clear prisma.categoryList')

            await prisma.route.deleteMany();
            console.info('clear prisma.route');

            await prisma.driver.deleteMany();
            console.info('clear prisma.driver');

            await prisma.order.deleteMany();
            console.info('clear prisma.order');

            await prisma.productVariant.deleteMany();
            console.info('clear prisma.productVariant');

            await prisma.product.deleteMany();
            console.info('clear prisma.product');

            await prisma.organization.deleteMany();
            console.info('clear prisma.organization');

            organizations_geolocate?.deleteMany({});
            console.info('clear mongo.organizations_geolocate');

            await prisma.address.deleteMany();
            console.info('clear prisma.address');

            await prisma.vendor.deleteMany();
            console.info('clear prisma.vendor');

            await prisma.subDomain.deleteMany();
            console.info('clear prisma.subDomain');

            await prisma.membership.deleteMany();
            console.info('clear prisma.membership');

            await prisma.user.deleteMany();
            console.info('clear prisma.user');

        })
        .catch((err) => { console.error('Clear Records Error: ', err.message); process.exit(1); })
        .finally(() => {
            console.log('cleared all tables');
            prisma.$disconnect();
            process.exit(0);
        })
}

export default clearRecords();
