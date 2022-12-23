import client, { Order, Address, Driver, Organization, Product, User, Membership, Vendor, SiteSetting, OrderItem, SubDomain, ImageVendor, ImageUser, ImageOrganization, ImageProduct, Category, PrismaClient } from "@prisma/client";
// import client from "./generated/prisma-client/index.js"

const users: User[] = [
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

const memberships:Membership[]  = [
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
]

const addresses:Address[] = [
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
    userId: null,
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
    userId: null,
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

const vendors:Vendor[] = [
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

const orgs:Organization[] = [
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
const siteSettings:SiteSetting[] = [
  {
    title: "Cannabis Delivered To Your Door",
    description: "grascannabis.com",
    bannerText: "Welcome to Gras",
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "CuraLeaf Dispensary",
    description: "CuraLeaf Dispensaries in Lancaster, PA",
    bannerText: "Store-wide sale on Cbd 10% discount",
    id: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const orderItems: OrderItem[] = [
  {
    id: "1",
    name: "King OG",
    unit: "g",
    size: 3.5,
    basePrice: 6999,
    currency: "USD",
    discount: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Blackberry Kush",
    unit: "g",
    size: 3.5,
    basePrice: 6999,
    currency: "USD",
    discount: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Blackberry Nuggs",
    unit: "g",
    size: 3.5,
    basePrice: 6999,
    currency: "USD",
    discount: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Red Taffy Firetruck",
    unit: "g",
    size: 3.5,
    basePrice: 6999,
    currency: "USD",
    discount: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Eagle cbd oil",
    unit: "g",
    size: 3.5,
    basePrice: 6999,
    currency: "USD",
    discount: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    name: "Magic Mountain Bush",
    unit: "g",
    size: 3.5,
    basePrice: 6999,
    currency: "USD",
    discount: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    name: "Razmatazz",
    unit: "g",
    size: 3.5,
    basePrice: 6999,
    currency: "USD",
    discount: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const products:Product[] = [
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
    quantity: 0,
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
    quantity: 0,
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
    quantity: 0,
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
    quantity: 0,
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
    quantity: 0,
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
    quantity: 0,
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
    quantity: 0,
    stock: 10,
    tags: "flower, og",
    organizationId: "2",
    rating: 4.0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const subdomains:SubDomain[] = [
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
const ImageVendors: ImageVendor[] = [
  {
    id: "1",
    location:
      "https://cloudfront-us-east-1.images.arcpublishing.com/gray/GHYFGWKYW5CMRHTINQDDFCN7CI.jpg",
    blurhash: "d6PZfSi_.AyE_3t7t7R**0o#DgR4_3R*D%xtMcV@%itS",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const ImageUsers: ImageUser[] = [
  {
    id: "1",
    location:
      "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
    blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
    userId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const ImageOrganizations: ImageOrganization[] = [
  {
    id: "1",
    location:
      "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
    blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
    organizationId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    location:
      "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
    blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
    organizationId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const ImageProducts: ImageProduct[] = [
  {
    id: "1",
    location:
      "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
    blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
    productId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    location:
      "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
    blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
    productId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const Categories: Category[] = [
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

const drivers: Driver[] = [
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

const orders: Order[] = [
  {
    id: "1",
    total: 12399,
    status: "Pending",
    customerId: "1",
    driverId: "2",
    organizationId: "2",
    isDelivered: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deliveredAt: null,
    
  },
  {
    id: "2",
    total: 23444,
    status: "Processing",
    customerId: "1",
    driverId: "2",
    organizationId: "2",
    isDelivered: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deliveredAt: null,
  },
  {
    id: "3",
    total: 1244,
    status: "Delivered",
    customerId: "2",
    driverId: "1",
    organizationId: "2",
    isDelivered: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    deliveredAt: new Date(),
  },
  {
    id: "4",
    total: 6999,
    status: "Delivered",
    customerId: "1",
    driverId: "2",
    organizationId: "2",
    isDelivered: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    deliveredAt: new Date(),
  },
  {
    id: "5",
    total: 12999,
    status: "Cancelled",
    customerId: "2",
    driverId: "1",
    organizationId: "2",
    isDelivered: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deliveredAt: null,
  },
  {
    id: "6",
    total: 14599,
    status: "Pending",
    customerId: "1",
    driverId: "2",
    organizationId: "2",
    isDelivered: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deliveredAt: null,
  },
];

const prisma = new PrismaClient();

async function main() {
  await prisma.imageVendor.deleteMany();
  await prisma.imageOrganization.deleteMany();
  await prisma.imageProduct.deleteMany();
  await prisma.imageUser.deleteMany();
  await prisma.user.deleteMany();
  await prisma.address.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subDomain.deleteMany();
  await prisma.category.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.order.deleteMany();
  await prisma.orderItem.deleteMany()
  await prisma.membership.deleteMany();

  console.log("cleared all records");

  await prisma.user.createMany({
    data: users,
  });
  await prisma.address.createMany({
    data: addresses,
  });
  await prisma.vendor.createMany({
    data: vendors,
  });
  await prisma.organization.createMany({
    data: orgs,
  });
  await prisma.siteSetting.createMany({
    data: siteSettings,
  });
  await prisma.product.createMany({
    data: products,
  });
  await prisma.subDomain.createMany({
    data: subdomains,
  });
  await prisma.imageVendor.createMany({
    data: ImageVendors,
  });
  await prisma.imageOrganization.createMany({
    data: ImageOrganizations,
  });
  await prisma.imageProduct.createMany({
    data: ImageProducts,
  });
  await prisma.imageUser.createMany({
    data: ImageUsers,
  });
  await prisma.category.createMany({
    data: Categories,
  });
  await prisma.driver.createMany({
    data: drivers,
  });
  await prisma.order.createMany({
    data: orders,
  });
  await prisma.membership.createMany({
    data: memberships,
  });
  await prisma.orderItem.createMany({
    data: orderItems,
  })
  console.log("inserted all records");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
