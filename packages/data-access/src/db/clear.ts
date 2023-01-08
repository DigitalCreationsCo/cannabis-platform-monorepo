import { Order, Address, Driver, Organization, Product, User, Membership, Vendor, SiteSetting, OrderItem, SubDomain, ImageVendor, ImageUser, ImageOrganization, ImageProduct, Category, PrismaClient, CategoryList, Prisma, ProductVariant } from "@prisma/client";
// import client from "./generated/prisma-client/index.js"

const prisma = new PrismaClient();

async function clearRecords() {
    await prisma.imageVendor.deleteMany();
    await prisma.imageOrganization.deleteMany();
    await prisma.imageProduct.deleteMany();
    await prisma.imageUser.deleteMany();
    await prisma.address.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.vendor.deleteMany();
    await prisma.product.deleteMany();
    await prisma.subDomain.deleteMany();
    await prisma.siteSetting.deleteMany();
    await prisma.category.deleteMany();
    await prisma.categoryList.deleteMany();
    await prisma.driver.deleteMany();
    await prisma.order.deleteMany();
    await prisma.orderItem.deleteMany()
    await prisma.membership.deleteMany();
    await prisma.user.deleteMany();
    
  console.log("cleared all records");
}

export default clearRecords()
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
