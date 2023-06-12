import { Address, Category, CategoryList, Driver, ImageOrganization, ImageProduct, ImageUser, ImageVendor, Membership, Order, PrismaClient, Product, ProductVariant, Purchase, Schedule, SiteSetting, SubDomain, User, Vendor } from "@prisma/client";
// const { createId } = require('@paralleldrive/cuid2')
// const { PrismaClient } = require('@prisma/client')
// const { createDriver } = require('../driver')


// COORDINATE
const coordinates = [
  {
    latitude: 40.046,
    longitude: -76.302,
    addressId: '1'
  },
  {
    latitude: 20.046,
    longitude: -36.302,
    addressId: '2'
  },
  {
    latitude: 50.046,
    longitude: -16.302,
    addressId: '3'
  },
  {
    latitude: 5.046,
    longitude: -36.302,
    addressId: '4'
  }
]

// PURCHASE
const purchases: Purchase[] = [
  {
    id: "1",
    paymentStatus: "Pending",
    gateway: "stripe",
    type: "card",
    amount: 12399,
    token: '12345',
    customerId: "1",
    orderId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    paymentStatus: "Paid",
    gateway: "stripe",
    type: "card",
    amount: 23444,
    token: '12345',
    customerId: "2",
    orderId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

const prisma = new PrismaClient();

async function main() {

  // USERS
  const users: User[] = [
    {
      id: 'bfhk6k4u7xq030hr6wvgiwao',
      firstName: "Bob",
      lastName: "Roberts",
      username: "BigChiefa22",
      email: "bob@gmail.com",
      phone: "1232343453",
      emailVerified: false,
      isLegalAge: false,
      idVerified: false,
      isSignUpComplete: false,
      passwordHash: "",
      passwordResetToken: null,
      dialCode: "1",
      idFrontImage: null,
      idBackImage: null,
      termsAccepted: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'bf346k4u7xq030hr6wvgiwao',
      firstName: "Sam",
      lastName: "Samuels",
      username: "Sammy223",
      email: "sam@gmail.com",
      phone: "1232343452",
      emailVerified: true,
      isLegalAge: false,
      idVerified: false,
      isSignUpComplete: false,
      passwordHash: "",
      passwordResetToken: null,
      dialCode: "1",
      idFrontImage: null,
      idBackImage: null,
      termsAccepted: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });


  // ADDRESS
  const addresses:Address[] = [
    {
      id: "1",
      street1: "123 King St",
      street2: "Suite 200",
      city: "Lancaster",
      state: "PA",
      zipcode: 17602,
      country: "United States",
      countryCode: "US",
      coordinateId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      id: "2",
      street1: "345 Marietta St",
      street2: "Suite 200",
      city: "Lancaster",
      state: "PA",
      zipcode: 17602,
      country: "United States",
      countryCode: "US",
      coordinateId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      street1: "45 King St",
      street2: "Suite 99",
      city: "Lancaster",
      state: "PA",
      zipcode: 17602,
      country: "United States",
      countryCode: "US",
      coordinateId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      street1: "999 Golden St.",
      street2: "Suite A",
      city: "Lancaster",
      state: "PA",
      zipcode: 17602,
      country: "United States",
      countryCode: "US",
      coordinateId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5",
      street1: "119 McDade Blvd",
      street2: "Apt 4",
      city: "Glenolden",
      state: "PA",
      zipcode: 17602,
      country: "United States",
      countryCode: "US",
      coordinateId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await prisma.address.createMany({
    data: addresses,
    skipDuplicates: true,
  });


  // VENDOR
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
    {
      id: "3",
      name: "SunnySide",
      publicName: "SunnySide",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await prisma.vendor.createMany({
    data: vendors,
    skipDuplicates: true,
  });


  // SITE SETTINGS
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

  await prisma.siteSetting.createMany({
    data: siteSettings,
    skipDuplicates: true,
  });
  

  // SCHEDULES
  const schedules:Schedule[] = [
    {
      id: "1",
      days: 6543210,
      openAt: 800,
      closeAt: 2000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      days: 54321,
      openAt: 800,
      closeAt: 2000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      days: 54321,
      openAt: 1100,
      closeAt: 2400,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      days: 54321,
      openAt: 1100,
      closeAt: 2400,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]

  await prisma.schedule.createMany({
    data: schedules,
    skipDuplicates: true,
  });


  // ORGANIZATION
  const orgs: any[]
//   [OrganizationCreateType & {
//     address: AddressCreateType
//     schedule: Prisma.ScheduleCreateInput
//     images: Prisma.ImageOrganizationCreateManyOrganizationInput[]
//     products: Prisma.ProductCreateInput[]
//     categoryList: Prisma.CategoryListCreateInput
// }] 
= [
    {
      "name":"Curaleaf",
      "stripeAccountId":null,
      "stripeOnboardingComplete":false,
      "dialCode":"1",
      "phone":"1232356456",
      "subdomain": {
        "connectOrCreate": {
          "where": {
            "id": "curaleaf"
          },
          "create": {
            "id": "curaleaf",
            "isValid": true,
            "createdAt": new Date(),
            "updatedAt": new Date()
          }
        }
      },
      "vendor": {
        "connectOrCreate": {
          "where": {
            "id": "2"
          },
          "create": {
            "id": "2",
            "name": "Curaleaf",
            "publicName": "Curaleaf",
            "createdAt": new Date(),
            "updatedAt": new Date()
          }
        }
      },
      "termsAccepted":false,
      "address":{
        "create": {
          "street1":"407 W Chestnut St",
          "street2":"",
          "city":"Lancaster",
          "state":"Pennsylvania",
          "zipcode":17603,
          "country":"United States",
          "countryCode":"US",
          "coordinates": {
            "create": {
              "radius": 10000,
              "latitude": 40.0411,
              "longitude": -76.3133,
              "createdAt": new Date(),
              "updatedAt": new Date()
            }
          },
        }
      },
      "images": {
        "create" : [
         {
             "location": "https://mgmagazine.com/wp-content/uploads/2021/05/CURALEAF_logo_mg_Magazine_mgretailler-e1675120877801.jpg",
            "blurhash":""
         }
        ]
      },
      "schedule": {
        "create": {
          "days":1234,
          "openAt":10,
          "closeAt":18
        }
      }
   },
    {
      "name":"SunnySide",
      "stripeAccountId":null,
      "stripeOnboardingComplete":false,
      "dialCode":"1",
      "phone":"1232343456",
      "vendor": {
        "connectOrCreate": {
          "where": {
            "id": "3"
          },
          "create": {
            "id": "3",
            "name": "SunnySide",
            "publicName": "SunnySide",
            "createdAt": new Date(),
            "updatedAt": new Date()
          }
        }
      },
      "subdomain": {
        "connectOrCreate": {
          "where": {
            "id": "sunnyside"
          },
          "create": {
            "id": "sunnyside",
            "isValid": true,
            "createdAt": new Date(),
            "updatedAt": new Date()
          }
        }
      },
      "termsAccepted":false,
      "address":{
        "create": {
         "street1":"1618 E Oliver St",
         "street2":"",
         "city":"Baltimore",
         "state":"Maryland",
         "zipcode":21213,
         "country":"United States",
         "countryCode":"US",
         "coordinates": {
            "create": {
              "radius": 10000,
              "latitude": 39.3077, 
              "longitude": -76.5958,
              "createdAt": new Date(),
              "updatedAt": new Date()
            }
          }
        }
      },
      "images":{
        "create": [
          {
              "location": "https://images.prismic.io/sunnyside/87e74ff1-f496-4705-a5a5-0aca361a82cc_SS_FB_OpenGraph_2x.jpg?auto=compress,format",
              "blurhash":""
          }
        ],
      },
      "schedule": {
        "create": {
         "days":1234560,
         "openAt":9,
         "closeAt":24
        }
      }
    },
    {
      "name":"McNuggs",
      "stripeAccountId":"acct_1JX2Zz2eZvKYlo2C",
      "stripeOnboardingComplete":true,
      "dialCode":"1",
      "phone":"2475895745",
      "termsAccepted":false,
      "subdomain": {
        "connectOrCreate": {
          "where": {
            "id": "mcnuggs"
          },
          "create": {
            "id": "mcnuggs",
            "isValid": true,
            "createdAt": new Date(),
            "updatedAt": new Date()
          }
        }
      },
      "vendor": {
        "connectOrCreate": {
          "where": {
            "id": "4"
          },
          "create": {
            "id": "4",
            "name": "McNuggs",
            "publicName": "McNuggs",
            "createdAt": new Date(),
            "updatedAt": new Date()
          }
        }
      },
      "address":{
        "create": {
         "street1":"2667 Solomons Island Rd",
         "street2":"",
         "city":"Annapolis",
         "state":"Maryland",
         "zipcode":21037,
         "country":"United States",
         "countryCode":"US",
         "coordinates": {
            "create": {
              "radius": 10000,
              "latitude": 39.2904,
              "longitude": -76.6122,
              "createdAt": new Date,
              "updatedAt": new Date,
            }
          }
        }
      },
      "images": {
        "create": [
           {
             "location": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxzNuI7e1ZEcBvNPke7da5pcvomN-21e2-zERnn0Z6p2ed4AvkOFXPoSEqtIK1V6tl8wY&usqp=CAU",
            "blurhash":""
           }
        ],
      },
      "schedule":{
        "create": {
         "days":1234560,
         "openAt":9,
         "closeAt":24
        }
      }
    }
  ];

  orgs.forEach(async(org) => await prisma.organization.create({
    data: org
  }));


  // SUBDOMAIN
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
    {
      id: "sunnyside",
      isValid: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await prisma.subDomain.createMany({
    data: subdomains,
    skipDuplicates: true,
  });


  // CATEGORY
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

  await prisma.category.createMany({
    data: Categories,
    skipDuplicates: true,
  });


  // CATEGORYLIST
  const categoryLists: CategoryList[] = [
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

  await prisma.categoryList.createMany({
  data: categoryLists,
  skipDuplicates: true,
  });

  
  // DRIVERS
  const drivers: Driver[] = [
    {
      id: 'bf346k4u7x2b2hhr6wvgiwao',
      email: "bmejiadeveloper2@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },      
  ];

  drivers.forEach(async (driver) => await prisma.driver.upsert({
    where: { id: driver.id },
    create: {
      user: {
        connectOrCreate: {
          where: {
            id: driver.id,
          },
          create: {
            id: driver.id,
            firstName: "Bryant",
            lastName: "Mejia",
            username: "BigChiefa",
            email: "bmejiadeveloper2@gmail.com",
            phone: "1232343456",
            emailVerified: false,
            isLegalAge: null,
            idVerified: false,
            isSignUpComplete: false,
            passwordHash: "",
            passwordResetToken: "null",
            dialCode: "1",
            idFrontImage: "",
            idBackImage: "",
            termsAccepted: false,
            address: {
              connectOrCreate: {
                where: {
                  id: "4"
                },
                create: {
                  id: "4",
                  street1: "999 Golden St.",
                  street2: "Suite A",
                  city: "Lancaster",
                  state: "PA",
                  zipcode: 17602,
                  country: "United States",
                  countryCode: "US",
                  coordinateId: '1',
                },
              }
            },
            imageUser: {
              connectOrCreate: {
                where: {
                  id: "1"
                },
                create: {
                  id: "1",
                  location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
                  blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
                  // userId: "1",
                  createdAt: new Date(),
                  updatedAt: new Date(),
                }
              }
            }
          }
        }
      }
    },
    update: {
      user: {
        connectOrCreate: {
          where: {
            id: driver.id,
          },
          create: {
            id: driver.id,
            firstName: "Bryant",
            lastName: "Mejia",
            username: "BigChiefa",
            email: "bmejiadeveloper2@gmail.com",
            phone: "1232343456",
            emailVerified: false,
            isLegalAge: null,
            idVerified: false,
            isSignUpComplete: false,
            passwordHash: "",
            passwordResetToken: "null",
            dialCode: "1",
            idFrontImage: "",
            idBackImage: "",
            termsAccepted: false,
            address: {
              connectOrCreate: {
                where: {
                  id: "4"
                },
                create: {
                  id: "4",
                  street1: "999 Golden St.",
                  street2: "Suite A",
                  city: "Lancaster",
                  state: "PA",
                  zipcode: 17602,
                  country: "United States",
                  countryCode: "US",
                  coordinateId: '1',
                },
              }
            },
            imageUser: {
              connectOrCreate: {
                where: {
                  id: "1"
                },
                create: {
                  id: "1",
                  location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
                  blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
                  // userId: "1",
                  createdAt: new Date(),
                  updatedAt: new Date(),
                }
              }
            }
          }
        }
      }
    },
  }));


  // ORDER
  const orders: Order[] = [
    {
      id: "1",
      subtotal: 12000,
      total: 12399,
      taxFactor: 0.6,
      taxAmount: 1239,
      orderStatus: "Pending",
      customerId: "1",
      addressId: '5',
      driverId: "2",
      organizationId: "2",
      purchaseId: '1',
      routeId: null,
      isDeliveredOrder: false,
      isCustomerReceivedOrder: false, 
      isCompleted: false, 
      createdAt: new Date(),
      updatedAt: new Date(),
      deliveredAt: new Date(),
    },
    {
      id: "2",
      subtotal: 12000,
      total: 23444,
      taxFactor: 0.6,
      taxAmount: 1239,
      orderStatus: "Processing",
      customerId: "1",
      addressId: '5',
      driverId: "2",
      organizationId: "2",
      purchaseId: '2',
      routeId: null,
      isDeliveredOrder: false,
      isCustomerReceivedOrder: false, 
      isCompleted: false, 
      createdAt: new Date(),
      updatedAt: new Date(),
      deliveredAt: new Date(),
    },
    {
      id: "3",
      subtotal: 12000,
      total: 1244,
      taxFactor: 0.6,
      taxAmount: 1239,
      orderStatus: "Delivered",
      customerId: "2",
      addressId: '3',
      driverId: "1",
      organizationId: "2",
      isDeliveredOrder: false,
      isCustomerReceivedOrder: false, 
      isCompleted: false, 
      purchaseId: null,
      routeId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deliveredAt: new Date(),
    },
    {
      id: "4",
      subtotal: 12000,
      total: 6999,
      taxFactor: 0.6,
      taxAmount: 1239,
      orderStatus: "Delivered",
      customerId: "1",
      addressId: '5',
      driverId: "2",
      organizationId: "2",
      purchaseId: null,
      routeId: null,
      isDeliveredOrder: false,
      isCustomerReceivedOrder: false, 
      isCompleted: false, 
      createdAt: new Date(),
      updatedAt: new Date(),
      deliveredAt: new Date(),
    },
    {
      id: "5",
      subtotal: 12000,
      total: 12999,
      taxFactor: 0.6,
      taxAmount: 1239,
      orderStatus: "Cancelled",
      customerId: "2",
      addressId: '3',
      driverId: "1",
      purchaseId: null,
      routeId: null,
      organizationId: "2",
      isDeliveredOrder: false,
      isCustomerReceivedOrder: false, 
      isCompleted: false, 
      createdAt: new Date(),
      updatedAt: new Date(),
      deliveredAt: new Date(),
    },
    {
      id: "6",
      subtotal: 12000,
      total: 14599,
      taxFactor: 0.6,
      taxAmount: 1239,
      orderStatus: "Pending",
      customerId: "1",
      addressId: '4',
      driverId: "2",
      organizationId: "2",
      isDeliveredOrder: false,
      isCustomerReceivedOrder: false, 
      isCompleted: false, 
      purchaseId: null,
      routeId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deliveredAt: new Date(),
    },
  ];

  await prisma.order.createMany({
    data: orders,
    skipDuplicates: true,
  });  


  // MEMBERSHIP
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

  await prisma.membership.createMany({
    data: memberships,
    skipDuplicates: true,
  });


  // PRODUCTVARIANT
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
      organizationId: '2',
      organizationName: 'Curaleaf',
      quantity: 3,
      isDiscount: true,
      salePrice: 6499,
      sku: 1234567,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "King OG",
      unit: "g",
      size: 9,
      currency: "USD",
      basePrice: 17999,
      discount: 5,
      stock: 9,
      productId: '1',
          organizationId: '2',
      organizationName: 'Curaleaf',
      quantity: 3,
      isDiscount: true,
      salePrice: 6499,
      sku: 1234567,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "Blackberry Kush",
      unit: "g",
      size: 3.5,
      currency: "USD",
      basePrice: 6999,
      discount: 5,
      stock: 5,
      productId: '2',
      organizationId: '2',
      organizationName: 'Curaleaf',
      quantity: 3,
      isDiscount: true,
      salePrice: 6499,
      sku: 1234567,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      name: "Blackberry Nuggs",
      unit: "g",
      size: 3.5,
      currency: "USD",
      basePrice: 6999,
      discount: 5,
      stock: 5,
      productId: '3',
      organizationId: '2',
      organizationName: 'Curaleaf',
      quantity: 3,
      isDiscount: true,
      salePrice: 6499,
      sku: 1234567,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5",
      name: "Red Taffy Firetruck",
      unit: "g",
      size: 3.5,
      currency: "USD",
      basePrice: 6999,
      discount: 5,
      stock: 5,
      productId: '4',
      organizationId: '2',
      organizationName: 'Curaleaf',
      quantity: 3,
      isDiscount: true,
      salePrice: 6499,
      sku: 1234567,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6",
      name: "Eagle cbd oil",
      unit: "g",
      size: 3.5,
      currency: "USD",
      basePrice: 6999,
      discount: 5,
      stock: 5,
      productId: '5',
      organizationId: '2',
      quantity: 3,
      isDiscount: true,
      salePrice: 6499,
      organizationName: 'Curaleaf',
      sku: 1234567,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "7",
      name: "Magic Mountain Bush",
      unit: "g",
      size: 3.5,
      currency: "USD",
      basePrice: 6999,
      discount: 5,
      stock: 5,
      productId: '6',
      organizationId: '2',
      organizationName: 'Curaleaf',
      quantity: 3,
      isDiscount: true,
      salePrice: 6499,
      sku: 1234567,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "8",
      name: "Razmatazz",
      unit: "g",
      size: 3.5,
      currency: "USD",
      basePrice: 6999,
      discount: 5,
      stock: 5,
      productId: '7',
      organizationId: '2',
      organizationName: 'Curaleaf',
      quantity: 3,
      isDiscount: true,
      salePrice: 6499,
      sku: 1234567,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  await prisma.productVariant.createMany({
    data: variants,
    skipDuplicates: true,
  })


  // PRODUCT
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
    {
      id: "8",
      name: "Eagle cbd oil",
      description: "Satisfying Liquid Goochy",
      features: "fresh, relaxing",
      tags: "cbd, og",
      organizationId: "3",
      rating: 2.5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "9",
      name: "Magic Mountain Bush",
      description: "helpful for your heart",
      features: "fresh, relaxing",
      tags: "flower, og",
      organizationId: "3",
      rating: 5.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "10",
      name: "Razmatazz",
      description: "sweet and sour",
      features: "fresh, relaxing",
      tags: "flower, og",
      organizationId: "3",
      rating: 4.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "11",
      name: "Razmatazz",
      description: "sweet and sour",
      features: "fresh, relaxing",
      tags: "flower, og",
      organizationId: "4",
      rating: 4.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  products.map(async (product) => {
  await prisma.product.create({
    data: {
      ...product,
      categories: {
        connect: [
          { id: '9' }
        ]
      },
      // variants: {
      //   connect: variants.filter(variant => variant.productId === product.id).map(variant => ({ id: variant.id }))
      // }
    }
  })
  });
  

  // IMAGEVENDOR
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

  await prisma.imageVendor.createMany({
    data: ImageVendors,
    skipDuplicates: true,
  });


  // IMAGEORGANIZATION
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

  await prisma.imageOrganization.createMany({
    data: ImageOrganizations,
    skipDuplicates: true,
  });

  
  // IMAGEPRODUCT
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

  await prisma.imageProduct.createMany({
    data: ImageProducts,
    skipDuplicates: true,
  });


  // IMAGEUSER
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

  await prisma.imageUser.createMany({
    data: ImageUsers,
    skipDuplicates: true,
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
