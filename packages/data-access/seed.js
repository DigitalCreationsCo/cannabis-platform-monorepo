var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
// import client from "./generated/prisma-client/index.js"
const users = [
    {
        id: "1",
        firstName: "Bryant",
        lastName: "Mejia",
        username: "BigChiefa",
        email: "bmejiadeveloper2@gmail.com",
        emailVerified: false,
        hashedPassword: "",
        dialCode: "1",
        phone: "1232343456",
        termsAccepted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        firstName: "Bob",
        lastName: "Roberts",
        username: "BigChiefa22",
        email: "bob@gmail.com",
        emailVerified: false,
        hashedPassword: "",
        dialCode: "1",
        phone: "1232343456",
        termsAccepted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3",
        firstName: "Sam",
        lastName: "Samuels",
        username: "Sammy223",
        email: "sam@gmail.com",
        emailVerified: true,
        hashedPassword: "",
        dialCode: "1",
        phone: "1232343456",
        termsAccepted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const memberships = [
    {
        id: '1',
        role: "MEMBER",
        organizationId: '2',
        userId: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        role: "ADMIN",
        organizationId: "2",
        userId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '3',
        role: "OWNER",
        organizationId: "2",
        userId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '4',
        role: "OWNER",
        organizationId: "3",
        userId: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
];
const addresses = [
    {
        id: "1",
        street1: "123 King St",
        street2: "Suite 200",
        city: "Lancaster",
        state: "PA",
        zipcode: "17602",
        country: "United States",
        countryCode: "US",
        coordinateId: "2",
        userId: '3',
        organizationId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        street1: "45 King St",
        street2: "Suite 99",
        city: "Lancaster",
        state: "PA",
        zipcode: "17602",
        country: "United States",
        countryCode: "US",
        coordinateId: "2",
        userId: '2',
        organizationId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3",
        street1: "119 McDade Blvd",
        street2: "Apt 4",
        city: "Glenolden",
        state: "PA",
        zipcode: "17602",
        country: "United States",
        countryCode: "US",
        coordinateId: "3",
        userId: "1",
        organizationId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const vendors = [
    {
        id: "1",
        name: "Gras",
        publicName: "Gras",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        name: "Curaleaf",
        publicName: "Curaleaf",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const orgs = [
    {
        id: "1",
        name: "Gras",
        email: "gras@grascannabis.org",
        emailVerified: false,
        dialCode: "1",
        phone: "1232343456",
        vendorId: "1",
        subdomainId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        termsAccepted: true,
    },
    {
        id: "2",
        name: "Curaleaf",
        email: "curaleaf@grascannabis.org",
        emailVerified: false,
        dialCode: "1",
        phone: "1232343456",
        vendorId: "2",
        subdomainId: "curaleaf",
        createdAt: new Date(),
        updatedAt: new Date(),
        termsAccepted: true,
    },
    {
        id: "3",
        name: "Sunnyside",
        email: "sunnysidedispensaries@grascannabis.org",
        emailVerified: true,
        dialCode: "1",
        phone: "1232343456",
        vendorId: "3",
        subdomainId: "sunnyside",
        createdAt: new Date(),
        updatedAt: new Date(),
        termsAccepted: true,
    },
];
const siteSettings = [
    {
        title: "Cannabis Delivered To Your Door",
        description: "grascannabis.com",
        bannerText: "Welcome to Gras",
        organizationId: "1",
        id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "CuraLeaf Dispensary",
        description: "CuraLeaf Dispensaries in Lancaster, PA",
        bannerText: "Store-wide sale on Cbd 10% discount",
        organizationId: "2",
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const orderItems = [
    {
        productId: "1",
        orderId: '1',
        name: "King OG",
        unit: "g",
        size: 3.5,
        quantity: 3,
        currency: "USD",
        basePrice: 6999,
        discount: 10,
        salePrice: 6499,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        productId: "2",
        orderId: '1',
        name: "Blackberry Kush",
        unit: "g",
        size: 3.5,
        quantity: 3,
        currency: "USD",
        basePrice: 6999,
        discount: 5,
        salePrice: 6499,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        productId: "3",
        orderId: '1',
        name: "Blackberry Nuggs",
        unit: "g",
        size: 3.5,
        quantity: 3,
        currency: "USD",
        basePrice: 6999,
        discount: 5,
        salePrice: 6499,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        productId: "4",
        orderId: '1',
        name: "Red Taffy Firetruck",
        unit: "g",
        size: 3.5,
        quantity: 3,
        currency: "USD",
        basePrice: 6999,
        discount: 5,
        salePrice: 6499,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        productId: "5",
        orderId: '1',
        name: "Eagle cbd oil",
        unit: "g",
        size: 3.5,
        quantity: 3,
        currency: "USD",
        basePrice: 6999,
        discount: 5,
        salePrice: 6499,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        productId: "6",
        orderId: '1',
        name: "Magic Mountain Bush",
        unit: "g",
        size: 3.5,
        quantity: 3,
        currency: "USD",
        basePrice: 6999,
        discount: 5,
        salePrice: 6499,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        productId: "7",
        orderId: '1',
        name: "Razmatazz",
        unit: "g",
        size: 3.5,
        quantity: 3,
        currency: "USD",
        basePrice: 6999,
        discount: 5,
        salePrice: 6499,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const products = [
    {
        id: "1",
        name: "King OG",
        description: "turpentines all day baby",
        features: "fresh, without formaline",
        unit: "g",
        size: 3.5,
        basePrice: 6999,
        currency: "USD",
        discount: 10,
        stock: 14,
        tags: "mini, flower, og",
        organizationId: "2",
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        name: "Blackberry Kush",
        description: "Satisfying Liquid Goochy",
        features: "fresh, relaxing",
        unit: "g",
        size: 3.5,
        basePrice: 6999,
        currency: "USD",
        discount: 5,
        stock: 10,
        tags: "flower, og",
        organizationId: "2",
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3",
        name: "Blackberry Nuggs",
        description: "check out these nuggs",
        features: "fresh, relaxing",
        unit: "g",
        size: 3.5,
        basePrice: 6999,
        currency: "USD",
        discount: 5,
        stock: 10,
        tags: "flower, og",
        organizationId: "2",
        rating: 3.3,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "4",
        name: "Red Taffy Firetruck",
        description: "Wonderfuly for you",
        features: "fresh, relaxing",
        unit: "g",
        size: 3.5,
        basePrice: 6999,
        currency: "USD",
        discount: 5,
        stock: 10,
        tags: "flower, og",
        organizationId: "2",
        rating: 4.0,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "5",
        name: "Eagle cbd oil",
        description: "Satisfying Liquid Goochy",
        features: "fresh, relaxing",
        unit: "g",
        size: 3.5,
        basePrice: 6999,
        currency: "USD",
        discount: 5,
        stock: 10,
        tags: "cbd, og",
        organizationId: "2",
        rating: 2.5,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "6",
        name: "Magic Mountain Bush",
        description: "helpful for your heart",
        features: "fresh, relaxing",
        unit: "g",
        size: 3.5,
        basePrice: 6999,
        currency: "USD",
        discount: 5,
        stock: 10,
        tags: "flower, og",
        organizationId: "2",
        rating: 5.0,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "7",
        name: "Razmatazz",
        description: "sweet and sour",
        features: "fresh, relaxing",
        unit: "g",
        size: 3.5,
        basePrice: 6999,
        currency: "USD",
        discount: 5,
        stock: 10,
        tags: "flower, og",
        organizationId: "2",
        rating: 4.0,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const subdomains = [
    {
        id: "",
        isValid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "curaleaf",
        isValid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const ImageVendors = [
    {
        id: "1",
        location: "https://cloudfront-us-east-1.images.arcpublishing.com/gray/GHYFGWKYW5CMRHTINQDDFCN7CI.jpg",
        blurhash: "d6PZfSi_.AyE_3t7t7R**0o#DgR4_3R*D%xtMcV@%itS",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const ImageUsers = [
    {
        id: "1",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        userId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const ImageOrganizations = [
    {
        id: "1",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        organizationId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        organizationId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const ImageProducts = [
    {
        id: "1",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        productId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        productId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        productId: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "4",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        productId: "4",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "5",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        productId: "5",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "6",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        productId: "6",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "7",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        productId: "7",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const Categories = [
    {
        id: "1",
        name: "Edibles",
        slug: "edibles",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        name: "Seeds",
        slug: "seeds",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3",
        name: "Medicinal",
        slug: "medicinal",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "4",
        name: "Topicals",
        slug: "topicals",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "5",
        name: "Vape Pens",
        slug: "vape-pens",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "6",
        name: "Tinctures",
        slug: "tinctures",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "7",
        name: "Capsules",
        slug: "capsules",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "8",
        name: "Hash",
        slug: "hash",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "9",
        name: "Flower",
        slug: "flower",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const drivers = [
    {
        id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const orders = [
    {
        id: "1",
        subtotal: 12000,
        total: 12399,
        taxFactor: 0.6,
        tax: 1239,
        status: "Pending",
        customerId: "1",
        addressCustomerId: '1',
        driverId: "2",
        organizationId: "2",
        isDelivered: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deliveredAt: new Date(),
    },
    {
        id: "2",
        subtotal: 12000,
        total: 23444,
        taxFactor: 0.6,
        tax: 1239,
        status: "Processing",
        customerId: "1",
        addressCustomerId: '1',
        driverId: "2",
        organizationId: "2",
        isDelivered: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deliveredAt: new Date(),
    },
    {
        id: "3",
        subtotal: 12000,
        total: 1244,
        taxFactor: 0.6,
        tax: 1239,
        status: "Delivered",
        customerId: "2",
        addressCustomerId: '2',
        driverId: "1",
        organizationId: "2",
        isDelivered: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deliveredAt: new Date(),
    },
    {
        id: "4",
        subtotal: 12000,
        total: 6999,
        taxFactor: 0.6,
        tax: 1239,
        status: "Delivered",
        customerId: "1",
        addressCustomerId: '1',
        driverId: "2",
        organizationId: "2",
        isDelivered: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deliveredAt: new Date(),
    },
    {
        id: "5",
        subtotal: 12000,
        total: 12999,
        taxFactor: 0.6,
        tax: 1239,
        status: "Cancelled",
        customerId: "2",
        addressCustomerId: '2',
        driverId: "1",
        organizationId: "2",
        isDelivered: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deliveredAt: new Date(),
    },
    {
        id: "6",
        subtotal: 12000,
        total: 14599,
        taxFactor: 0.6,
        tax: 1239,
        status: "Pending",
        customerId: "1",
        addressCustomerId: '1',
        driverId: "2",
        organizationId: "2",
        isDelivered: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deliveredAt: new Date(),
    },
];
// const deliveries: Delivery[] = [
//   {
//     id: "1",
//     orderId: "1",
//     customerId: "",
//     addressCustomerId: "",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "1",
//     orderId: "1",
//     customerId: "",
//     addressCustomerId: "",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "1",
//     orderId: "1",
//     customerId: "",
//     addressCustomerId: "",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "1",
//     orderId: "1",
//     customerId: "",
//     addressCustomerId: "",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "1",
//     orderId: "1",
//     customerId: "",
//     addressCustomerId: "",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "1",
//     orderId: "1",
//     customerId: "",
//     addressCustomerId: "",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];
const prisma = new PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.imageVendor.deleteMany();
        yield prisma.imageOrganization.deleteMany();
        yield prisma.imageProduct.deleteMany();
        yield prisma.imageUser.deleteMany();
        yield prisma.address.deleteMany();
        yield prisma.organization.deleteMany();
        yield prisma.vendor.deleteMany();
        yield prisma.product.deleteMany();
        yield prisma.subDomain.deleteMany();
        yield prisma.siteSetting.deleteMany();
        yield prisma.category.deleteMany();
        yield prisma.driver.deleteMany();
        yield prisma.order.deleteMany();
        yield prisma.orderItem.deleteMany();
        yield prisma.membership.deleteMany();
        yield prisma.user.deleteMany();
        console.log("cleared all records");
        yield prisma.user.createMany({
            data: users,
        });
        yield prisma.address.createMany({
            data: addresses,
        });
        yield prisma.vendor.createMany({
            data: vendors,
        });
        yield prisma.siteSetting.createMany({
            data: siteSettings,
        });
        yield prisma.organization.createMany({
            data: orgs,
        });
        yield prisma.product.createMany({
            data: products,
        });
        yield prisma.subDomain.createMany({
            data: subdomains,
        });
        yield prisma.imageVendor.createMany({
            data: ImageVendors,
        });
        yield prisma.imageOrganization.createMany({
            data: ImageOrganizations,
        });
        yield prisma.imageProduct.createMany({
            data: ImageProducts,
        });
        yield prisma.imageUser.createMany({
            data: ImageUsers,
        });
        yield prisma.category.createMany({
            data: Categories,
        });
        yield prisma.driver.createMany({
            data: drivers,
        });
        yield prisma.orderItem.createMany({
            data: orderItems,
        });
        yield prisma.order.createMany({
            data: orders,
        });
        yield prisma.membership.createMany({
            data: memberships,
        });
        console.log("inserted all records");
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
