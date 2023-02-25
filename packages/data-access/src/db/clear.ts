import { PrismaClient } from '@prisma/client';
// import client from "./generated/prisma-client/index.js"

const prisma = new PrismaClient();

async function clearRecords() {
    console.log('clearing tables...');
    await prisma.imageVendor.deleteMany();
    await prisma.imageOrganization.deleteMany();
    await prisma.imageProduct.deleteMany();
    await prisma.imageUser.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.vendor.deleteMany();
    await prisma.product.deleteMany();
    await prisma.subDomain.deleteMany();
    await prisma.siteSetting.deleteMany();
    await prisma.category.deleteMany();
    await prisma.categoryList.deleteMany();
    await prisma.driver.deleteMany();
    await prisma.order.deleteMany();

    await prisma.address.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.membership.deleteMany();
    await prisma.user.deleteMany();

    console.log('cleared all tables');
}

export default clearRecords();
