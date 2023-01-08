import { Order, Address, Driver, Organization, Product, User, Membership, Vendor, SiteSetting, OrderItem, SubDomain, ImageVendor, ImageUser, ImageOrganization, ImageProduct, Category, PrismaClient, CategoryList, Prisma, ProductVariant } from "@prisma/client";

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

const orderItems: OrderItem[] = [
  {
    variantId: "1",
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
    variantId: "2",
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
    variantId: "3",
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
    variantId: "4",
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
    variantId: "5",
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
    variantId: "6",
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
    variantId: "7",
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
]

const variants: ProductVariant[] = [
  {
    id: "1",
    name: "King OG",
    unit: "g",
    size: 3.5,
    currency: "USD",
    basePrice: 6999,
    discount: 10,
    stock: 5,
    productId: '1',
    sku: 1234567,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "8",
    name: "King OG",
    unit: "g",
    size: 9,
    currency: "USD",
    basePrice: 17999,
    discount: 5,
    stock: 9,
    productId: '1',
    sku: 1234567,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Blackberry Kush",
    unit: "g",
    size: 3.5,
    currency: "USD",
    basePrice: 6999,
    discount: 5,
    stock: 5,
    productId: '2',
    sku: 1234567,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Blackberry Nuggs",
    unit: "g",
    size: 3.5,
    currency: "USD",
    basePrice: 6999,
    discount: 5,
    stock: 5,
    productId: '3',
    sku: 1234567,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Red Taffy Firetruck",
    unit: "g",
    size: 3.5,
    currency: "USD",
    basePrice: 6999,
    discount: 5,
    stock: 5,
    productId: '4',
    sku: 1234567,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Eagle cbd oil",
    unit: "g",
    size: 3.5,
    currency: "USD",
    basePrice: 6999,
    discount: 5,
    stock: 5,
    productId: '5',
    sku: 1234567,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    name: "Magic Mountain Bush",
    unit: "g",
    size: 3.5,
    currency: "USD",
    basePrice: 6999,
    discount: 5,
    stock: 5,
    productId: '6',
    sku: 1234567,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    name: "Razmatazz",
    unit: "g",
    size: 3.5,
    currency: "USD",
    basePrice: 6999,
    discount: 5,
    stock: 5,
    productId: '7',
    sku: 1234567,
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
    variantId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    location:
      "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
    blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
    variantId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    location:
      "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
    blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
    variantId: "3",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    location:
      "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
    blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
    variantId: "4",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    location:
      "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
    blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
    variantId: "5",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    location:
      "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
    blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
    variantId: "6",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    location:
      "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
    blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
    variantId: "7",
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

const CategoryLists: CategoryList[] = [
  {
    id: '1',
    organizationId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    organizationId: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    organizationId: '3',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

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

async function main() {
  
  await prisma.user.createMany({
    data: users,
  });
  await prisma.address.createMany({
    data: addresses,
  });
  await prisma.vendor.createMany({
    data: vendors,
  });
  await prisma.siteSetting.createMany({
    data: siteSettings,
  });
  await prisma.organization.createMany({
    data: orgs,
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
  CategoryLists.map(async (list) => {
    await prisma.categoryList.create({
      data: {
        ...list,
        categories: {
          connect: [
              { id: '1' },
              { id: '2' },
              { id: '3' },
              { id: '9' }
          ]
        }
      }
    })
  })

  products.map(async (product) => {
  await prisma.product.create({
    data: {
      ...product,
      categories: {
        connect: [
          { id: '9' }
        ]
      }
    }
  });
  })
  
  await prisma.driver.createMany({
    data: drivers,
  });
  await prisma.productVariant.createMany({
    data: variants,
  })
  await prisma.orderItem.createMany({
    data: orderItems,
  })
  await prisma.order.createMany({
    data: orders,
  });
  await prisma.membership.createMany({
    data: memberships,
  });
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
