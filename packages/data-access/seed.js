"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
// import client from "./generated/prisma-client/index.js"
var users = [
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
        updatedAt: new Date()
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
        updatedAt: new Date()
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
        updatedAt: new Date()
    },
];
var memberships = [
    {
        id: '1',
        role: "MEMBER",
        organizationId: '2',
        userId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '2',
        role: "ADMIN",
        organizationId: "2",
        userId: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '3',
        role: "OWNER",
        organizationId: "2",
        userId: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '4',
        role: "OWNER",
        organizationId: "3",
        userId: "3",
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
var addresses = [
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
        updatedAt: new Date()
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
        updatedAt: new Date()
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
        updatedAt: new Date()
    },
];
var vendors = [
    {
        id: "1",
        name: "Gras",
        publicName: "Gras",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "2",
        name: "Curaleaf",
        publicName: "Curaleaf",
        createdAt: new Date(),
        updatedAt: new Date()
    },
];
var orgs = [
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
        termsAccepted: true
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
        termsAccepted: true
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
        termsAccepted: true
    },
];
var siteSettings = [
    {
        title: "Cannabis Delivered To Your Door",
        description: "grascannabis.com",
        bannerText: "Welcome to Gras",
        organizationId: "1",
        id: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "CuraLeaf Dispensary",
        description: "CuraLeaf Dispensaries in Lancaster, PA",
        bannerText: "Store-wide sale on Cbd 10% discount",
        organizationId: "2",
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date()
    },
];
var orderItems = [
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
        updatedAt: new Date()
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
        updatedAt: new Date()
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
        updatedAt: new Date()
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
        updatedAt: new Date()
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
        updatedAt: new Date()
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
        updatedAt: new Date()
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
        updatedAt: new Date()
    },
];
var products = [
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
        updatedAt: new Date()
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
        updatedAt: new Date()
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
        updatedAt: new Date()
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
        updatedAt: new Date()
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
        updatedAt: new Date()
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
        updatedAt: new Date()
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
        updatedAt: new Date()
    },
];
var subdomains = [
    {
        id: "",
        isValid: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "curaleaf",
        isValid: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
];
var ImageVendors = [
    {
        id: "1",
        location: "https://cloudfront-us-east-1.images.arcpublishing.com/gray/GHYFGWKYW5CMRHTINQDDFCN7CI.jpg",
        blurhash: "d6PZfSi_.AyE_3t7t7R**0o#DgR4_3R*D%xtMcV@%itS",
        createdAt: new Date(),
        updatedAt: new Date()
    },
];
var ImageUsers = [
    {
        id: "1",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        userId: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
];
var ImageOrganizations = [
    {
        id: "1",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        organizationId: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "2",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        organizationId: "2",
        createdAt: new Date(),
        updatedAt: new Date()
    },
];
var ImageProducts = [
    {
        id: "1",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        productId: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "2",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        productId: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "3",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        productId: "3",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "4",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        productId: "4",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "5",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        productId: "5",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "6",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        productId: "6",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "7",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        productId: "7",
        createdAt: new Date(),
        updatedAt: new Date()
    },
];
var Categories = [
    {
        id: "1",
        name: "Edibles",
        slug: "edibles",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "2",
        name: "Seeds",
        slug: "seeds",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "3",
        name: "Medicinal",
        slug: "medicinal",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "4",
        name: "Topicals",
        slug: "topicals",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "5",
        name: "Vape Pens",
        slug: "vape-pens",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "6",
        name: "Tinctures",
        slug: "tinctures",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "7",
        name: "Capsules",
        slug: "capsules",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "8",
        name: "Hash",
        slug: "hash",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "9",
        name: "Flower",
        slug: "flower",
        icon: "Breakfast",
        createdAt: new Date(),
        updatedAt: new Date()
    },
];
var drivers = [
    {
        id: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date()
    },
];
var orders = [
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
        deliveredAt: new Date()
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
        deliveredAt: new Date()
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
        deliveredAt: new Date()
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
        deliveredAt: new Date()
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
        deliveredAt: new Date()
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
        deliveredAt: new Date()
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
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.imageVendor.deleteMany()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.imageOrganization.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.imageProduct.deleteMany()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.imageUser.deleteMany()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma.address.deleteMany()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, prisma.organization.deleteMany()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, prisma.vendor.deleteMany()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, prisma.product.deleteMany()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, prisma.subDomain.deleteMany()];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, prisma.siteSetting.deleteMany()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, prisma.category.deleteMany()];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, prisma.driver.deleteMany()];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, prisma.order.deleteMany()];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, prisma.orderItem.deleteMany()];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, prisma.membership.deleteMany()];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.deleteMany()];
                case 16:
                    _a.sent();
                    console.log("cleared all records");
                    return [4 /*yield*/, prisma.user.createMany({
                            data: users
                        })];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, prisma.address.createMany({
                            data: addresses
                        })];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, prisma.vendor.createMany({
                            data: vendors
                        })];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, prisma.siteSetting.createMany({
                            data: siteSettings
                        })];
                case 20:
                    _a.sent();
                    return [4 /*yield*/, prisma.organization.createMany({
                            data: orgs
                        })];
                case 21:
                    _a.sent();
                    return [4 /*yield*/, prisma.product.createMany({
                            data: products
                        })];
                case 22:
                    _a.sent();
                    return [4 /*yield*/, prisma.subDomain.createMany({
                            data: subdomains
                        })];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, prisma.imageVendor.createMany({
                            data: ImageVendors
                        })];
                case 24:
                    _a.sent();
                    return [4 /*yield*/, prisma.imageOrganization.createMany({
                            data: ImageOrganizations
                        })];
                case 25:
                    _a.sent();
                    return [4 /*yield*/, prisma.imageProduct.createMany({
                            data: ImageProducts
                        })];
                case 26:
                    _a.sent();
                    return [4 /*yield*/, prisma.imageUser.createMany({
                            data: ImageUsers
                        })];
                case 27:
                    _a.sent();
                    return [4 /*yield*/, prisma.category.createMany({
                            data: Categories
                        })];
                case 28:
                    _a.sent();
                    return [4 /*yield*/, prisma.driver.createMany({
                            data: drivers
                        })];
                case 29:
                    _a.sent();
                    return [4 /*yield*/, prisma.orderItem.createMany({
                            data: orderItems
                        })];
                case 30:
                    _a.sent();
                    return [4 /*yield*/, prisma.order.createMany({
                            data: orders
                        })];
                case 31:
                    _a.sent();
                    return [4 /*yield*/, prisma.membership.createMany({
                            data: memberships
                        })];
                case 32:
                    _a.sent();
                    console.log("inserted all records");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })["catch"](function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
