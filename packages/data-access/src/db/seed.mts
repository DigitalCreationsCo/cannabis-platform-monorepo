import { Address, Category, Coordinates, ImageArticle, ImageOrganization, ImageProduct, ImageUser, ImageVendor, Membership, Prisma, PrismaClient, ProductVariant, Schedule, SubDomain, Vendor } from "@prisma/client";
import axios from "axios";
import { ReviewWithUserDetails } from "product";

const prisma = new PrismaClient();

// const createPurchases = async () => {
//   const purchases: Prisma.PurchaseCreateWithoutOrderInput[] = [
//     {
//       'id': '1',
//       paymentStatus: "Pending",
//       gateway: "stripe",
//       type: "card",
//       amount: 12399,
//       token: '12345',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }, {
//       'id': '2',
//       paymentStatus: "Paid",
//       gateway: "stripe",
//       type: "card",
//       amount: 23444,
//       token: '12345',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }, {
//       'id': '3',
//       paymentStatus: "Paid",
//       gateway: "stripe",
//       type: "card",
//       amount: 23444,
//       token: '12345',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   ];
//   purchases.forEach(async (purchase) => await prisma.purchase.create({
//     data: purchase
//   }));
//   console.info('create prisma.purchase records');
// };

const createCoordinates = async () => {
  const coordinates: Coordinates[] = [
    {
      id: '1',
      radius: 10000,
      latitude: 40.046,
      longitude: -76.302,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      radius: 10000,
      latitude: 20.046,
      longitude: -36.302,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      radius: 10000,
      latitude: 50.046,
      longitude: -16.302,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      radius: 10000,
      latitude: 5.046,
      longitude: -36.302,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
  await prisma.coordinates.createMany({
    data: coordinates,
    skipDuplicates: true,
  });
  console.info('create prisma.coordinates records');
}


/**
 * insert dispensary records into pg db, and POST geolocate records to mongo db
 */
const createOrganizations = async () => {
  // ORGANIZATION
  const orgs:
    (Prisma.OrganizationCreateInput & {
      address: Prisma.AddressCreateNestedOneWithoutOrganizationInput;
      schedule: Prisma.ScheduleCreateNestedOneWithoutOrganizationInput;
      images: Prisma.ImageOrganizationCreateNestedManyWithoutOrganizationInput;
      // products: Prisma.ProductCreateInput[];
      // categoryList: Prisma.CategoryListCreateInput;
    })[]
    = [
      {
        "id": "bf346k4u7x2b2hhr6wvgippp",
        "name": "Curaleaf MD Reisterstown",
        "stripeAccountId": null,
        "stripeOnboardingComplete": false,
        "dialCode": "1",
        "phone": "",
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
              name: 'curaleaf'
            },
            "create": {
              "name": "curaleaf",
              "publicName": "Curaleaf",
              "createdAt": new Date(),
              "updatedAt": new Date()
            }
          }
        },
        "termsAccepted": false,
        "address": {
          "create": {
            "street1": "11722 Reisterstown Rd",
            "street2": "",
            "city": "Reisterstown",
            "state": "Maryland",
            "zipcode": 21136,
            "country": "United States",
            "countryCode": "US",
            "coordinates": {
              "create": {
                "radius": 10000,
                "latitude": 39.445438,
                "longitude": -76.809394,
                "createdAt": new Date(),
                "updatedAt": new Date()
              }
            },
            "createdAt": new Date(),
            "updatedAt": new Date()
          }
        },
        "images": {
          "createMany": {
            "data": [
              {
                "location": "https://storage.cloud.google.com/image-dispensary/curaleaf/logo-1200.jpg?authuser=2",
                "blurhash": "",
                "createdAt": new Date(),
                "updatedAt": new Date()
              }
            ]
          }
        },
        products: {
          create: {
            id: "1",
            name: "King OG",
            description: "turpentines all day baby",
            features: "fresh, without formaline",
            tags: "mini, flower, og",
            rating: 4.5,
            variants: {
              create: {
                id: "1",
                name: "King OG",
                unit: "g",
                size: 3.5,
                currency: "USD",
                basePrice: 6999,
                discount: 10,
                stock: 5,
                organizationId: 'bf346k4u7x2b2hhr6wvgippp',
                rating: 4.5,
                organizationName: 'Curaleaf',
                quantity: 3,
                isDiscount: true,
                salePrice: 6499,
                sku: 1234567,
                images: {
                  create: {
                    id: "2",
                    location:
                      "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
                    blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                },
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            },
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        orders: {
          create: {
            id: "1",
            subtotal: 12000,
            total: 12399,
            taxFactor: 0.6,
            taxAmount: 1239,
            orderStatus: "Pending",
            customerId: "bfhk6k4u7xq030hr6wvgiwao",
            addressId: "5",
            driverId: "bf346k4u7x2b2hhr6wvgiwao",
            purchaseId: '1',
            purchase: {
              create: {
                id: '1',
                paymentStatus: "Pending",
                gateway: "stripe",
                type: "card",
                amount: 12399,
                token: '12345',
                createdAt: new Date(),
                updatedAt: new Date(),
              }
            },
            routeId: null,
            isDeliveredOrder: false,
            isCustomerReceivedOrder: false,
            isCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            isDriverAssigned: false,
            driverAssignedAt: new Date(),
            isProductPickedUp: false,
            productPickedUpAt: new Date(),
            customerReceivedOrderAt: new Date(),
            completedAt: new Date(),
            deliveredAt: new Date(),
          }
        },
        "schedule": {
          "create": {
            "days": 1234560,
            "openAt": 9,
            "closeAt": 21,
            "createdAt": new Date(),
            "updatedAt": new Date()
          }
        },
        siteSetting: {
          create: {
            title: "Curaleaf MD Reisterstown",
            description: "CuraLeaf MD Description text",
            bannerText: "Curaleaf MD Banner Text",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        categoryList: {
          create: {} as any,
        },
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "id": "bf346k4u7x2b2hhr6wvgdddp",
        "name": "SunnySide",
        "stripeAccountId": null,
        "stripeOnboardingComplete": false,
        "dialCode": "1",
        "phone": "",
        "vendor": {
          "connectOrCreate": {
            "where": {
              "name": "sunnyside",
            },
            "create": {
              "name": "sunnyside",
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
        "termsAccepted": false,
        "address": {
          "create": {
            "street1": "1866 Fruitville Pike",
            "street2": "",
            "city": "Lancaster",
            "state": "Pennsylvania",
            "zipcode": 17601,
            "country": "United States",
            "countryCode": "US",
            "coordinates": {
              "create": {
                "radius": 10000,
                "latitude": 39.3077,
                "longitude": -76.5958,
                "createdAt": new Date(),
                "updatedAt": new Date()
              }
            },
            "createdAt": new Date(),
            "updatedAt": new Date()
          }
        },
        "images": {
          "create": [
            {
              "location": "https://storage.cloud.google.com/image-dispensary/sunnyside/logo-1200.jpeg?authuser=2",
              "blurhash": "",
              "createdAt": new Date(),
              "updatedAt": new Date()
            }
          ],
        },
        products: {
          create: {
            id: "5",
            name: "Eagle cbd oil",
            description: "Satisfying Liquid Goochy",
            features: "fresh, relaxing",
            tags: "cbd, og",
            rating: 2.5,
            variants: {
              create: {
                id: "6",
                name: "Eagle cbd oil",
                unit: "g",
                size: 3.5,
                currency: "USD",
                basePrice: 6999,
                discount: 5,
                stock: 5,
                organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
                quantity: 3,
                rating: 4.5,
                isDiscount: true,
                salePrice: 6499,
                organizationName: 'Curaleaf',
                sku: 1234567,
                images: {
                  create: {
                    id: "1",
                    location:
                      "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
                    blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                },
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            },
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        },
        orders: {
          create: {
            id: "2",
            subtotal: 12000,
            total: 23444,
            taxFactor: 0.6,
            taxAmount: 1239,
            orderStatus: "Processing",
            customer: {
              connect: {
                id: "bfhk6k4u7xq030hr6wvgiwao",
              },
            },
            destinationAddress: {
              connect: {
                id: "5",
              },
            },
            driver: {
              connect: {
                id: "bf346k4u7x2b2hhr6wvgiwao",
              },
            },
            purchase: {
              create: {
                id: '2',
                paymentStatus: "Paid",
                gateway: "stripe",
                type: "card",
                amount: 23444,
                token: '12345',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            },
            routeId: null,
            isDeliveredOrder: false,
            isCustomerReceivedOrder: false,
            isCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            isDriverAssigned: false,
            driverAssignedAt: new Date(),
            isProductPickedUp: false,
            productPickedUpAt: new Date(),
            customerReceivedOrderAt: new Date(),
            completedAt: new Date(),
            deliveredAt: new Date(),
          },
        },
        "schedule": {
          "create": {
            "days": 1234560,
            "openAt": 9,
            "closeAt": 19,
            "createdAt": new Date(),
            "updatedAt": new Date()
          }
        },
        "siteSetting": {
          create: {
            title: "Sunnyside",
            description: "Sunnyside Description text",
            bannerText: "Sunnyside Banner Text",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        categoryList: {
          create: {} as any,
        },
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "id": "bf346k4u7x2b2hhr6wvgaaap",
        "name": "Remedy Baltimore",
        "stripeAccountId": null,
        "stripeOnboardingComplete": false,
        "dialCode": "1",
        "phone": "",
        "termsAccepted": false,
        "subdomain": {
          "connectOrCreate": {
            "where": {
              "id": "remedy"
            },
            "create": {
              "id": "remedy",
              "isValid": true,
              "createdAt": new Date(),
              "updatedAt": new Date()
            }
          }
        },
        "vendor": {
          "connectOrCreate": {
            "where": {
              "name": "remedy"
            },
            "create": {
              "name": "remedy",
              "publicName": "Remedy",
              "createdAt": new Date(),
              "updatedAt": new Date()
            }
          }
        },
        "address": {
          "create": {
            "street1": "7165 Security Blvd Suite C",
            "street2": "",
            "city": "Windsor Mill",
            "state": "Maryland",
            "zipcode": 21244,
            "country": "United States",
            "countryCode": "US",
            "coordinates": {
              "create": {
                "radius": 10000,
                "latitude": 39.313284,
                "longitude": -76.757832,
                "createdAt": new Date,
                "updatedAt": new Date,
              }
            },
            "createdAt": new Date(),
            "updatedAt": new Date()
          }
        },
        "images": {
          "create": [
            {
              "location": "https://storage.cloud.google.com/image-dispensary/remedy/logo-1000.jpeg?authuser=2",
              "blurhash": "",
              "createdAt": new Date(),
              "updatedAt": new Date()
            }
          ],
        },
        products: {
          create: {
            id: "10",
            name: "Razmatazz",
            description: "sweet and sour",
            features: "fresh, relaxing",
            tags: "flower, og",
            rating: 4.0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        orders: {
          create: {
            id: "3",
            subtotal: 12000,
            total: 1244,
            taxFactor: 0.6,
            taxAmount: 1239,
            orderStatus: "Delivered",
            customer: {
              connect: {
                id: "bfhk6k4u7xq030hr6wvgiwao",
              },
            },
            destinationAddress: {
              connect: {
                id: "3",
              },
            },
            driver: {
              connect: {
                id: "bf346k4u7x2b2hhr6wvgiwao",
              },
            },
            purchase: {
              create: {
                id: '3',
                paymentStatus: "Paid",
                gateway: "stripe",
                type: "card",
                amount: 12399,
                token: '12345',
                createdAt: new Date(),
                updatedAt: new Date(),
              }
            },
            isDeliveredOrder: false,
            isCustomerReceivedOrder: false,
            isCompleted: false,
            routeId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            isDriverAssigned: false,
            driverAssignedAt: new Date(),
            isProductPickedUp: false,
            productPickedUpAt: new Date(),
            customerReceivedOrderAt: new Date(),
            completedAt: new Date(),
            deliveredAt: new Date(),
          },
        },
        "schedule": {
          "create": {
            "days": 1234560,
            "openAt": 10,
            "closeAt": 21,
            "createdAt": new Date(),
            "updatedAt": new Date()
          }
        },
        siteSetting: {
          create: {
            title: "Remedy Baltimore",
            description: "Remedy Description text",
            bannerText: "Remedy Banner Text",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        categoryList: {
          create: {} as any,
        },
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ];

  orgs.forEach(async (org) => {
    try {
      const
        organization = await prisma.organization.create({
          data: {
            "name": org.name,
            "stripeAccountId": org.stripeAccountId,
            "stripeOnboardingComplete": org.stripeOnboardingComplete,
            "dialCode": org.dialCode,
            "phone": org.phone,
            "vendor": org.vendor,
            "subdomain": org.subdomain,
            "termsAccepted": org.termsAccepted,
            "address": org.address,
            "images": org.images,
            "schedule": org.schedule,
            "createdAt": new Date(),
            "updatedAt": new Date()
          },
        }).catch(error => { throw new Error(error) });

      console.info('create prisma.organization record: ' + organization.name + ': ' + organization.id);

      axios.post<Prisma.OrganizationCreateInput & {
        address: Prisma.AddressCreateNestedOneWithoutOrganizationInput;
        schedule: Prisma.ScheduleCreateNestedOneWithoutOrganizationInput;
        images: Prisma.ImageOrganizationCreateNestedManyWithoutOrganizationInput;
      }>(process?.env?.SERVER_LOCATION_URL + '/api/v1/serve-local/organizations/record' as string, {
        id: organization.id,
        name: organization.name,
        dialCode: organization.dialCode,
        phone: organization.phone,
        address: {
          street1: org.address.create?.street1,
          street2: org.address.create?.street2,
          city: org.address.create?.city,
          state: org.address.create?.state,
          zipcode: org.address.create?.zipcode,
          country: org.address.create?.country,
          countryCode: org.address.create?.countryCode,
          coordinates: {
            latitude: org.address.create?.coordinates?.create?.latitude,
            longitude: org.address.create?.coordinates?.create?.longitude,
          }
        },
        vendorId: organization.vendorId,
        subdomain: organization.subdomainId,
      },
        { validateStatus: status => (status >= 200 && status <= 302) || status == 404 }
      ).catch(error => { throw new Error(error) });

      console.info('create mongo.organization_geolocate record: ' + organization.name + ': ' + organization.id);
    } catch (error) {
      throw new Error(
        `${org.name} was not created. ${error.message}`
      );
    }
  });
  console.info('create prisma.organization records');
};

const createUsers = async () => {
  // USERS
  const users: Prisma.UserCreateInput[] = [
    {
      id: 'bfhk6k4u7xq030hr6wvgiwao',
      firstName: "Bob",
      lastName: "Roberts",
      username: "BigChiefa22",
      email: "bob@gmail.com",
      phone: "1232343453",
      emailVerified: false,
      scannedDOB: new Date(),
      isLegalAge: false,
      idVerified: false,
      isSignUpComplete: false,
      dialCode: "1",
      idFrontImage: null,
      idBackImage: null,
      termsAccepted: true,
      memberships: {
        create: {
          id: '1',
          role: "MEMBER",
          organizationId: 'bf346k4u7x2b2hhr6wvgippp',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      },
      profilePicture: {
        create: {
          id: "1",
          location:
            "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
          blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'pf346k4u7xq030hr6wvgiwap',
      firstName: "Sam",
      lastName: "Samuels",
      username: "Sammy223",
      email: "sam@gmail.com",
      phone: "1232343452",
      emailVerified: true,
      isLegalAge: false,
      idVerified: false,
      scannedDOB: new Date(),
      isSignUpComplete: false,
      dialCode: "1",
      idFrontImage: null,
      idBackImage: null,
      termsAccepted: true,
      memberships: {
        create: {
          id: '2',
          role: "ADMIN",
          organizationId: 'bf346k4u7x2b2hhr6wvgippp',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      },
      profilePicture: {
        create: {
          id: "2",
          location:
            "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
          blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  users.forEach(async (user) => await prisma.user.create({ data: user }));
  console.info('create prisma.user records');
};

const createAddresses = async () => {
  // ADDRESS
  const addresses: Address[] = [
    {
      id: "1",
      street1: "123 King St",
      street2: "Suite 200",
      city: "Lancaster",
      state: "PA",
      zipcode: 17602,
      country: "United States",
      countryCode: "US",
      coordinateId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: "2",
      street1: "345 Marietta St",
      street2: "Suite 200",
      city: "Lancaster",
      state: "PA",
      zipcode: 17602,
      country: "United States",
      countryCode: "US",
      coordinateId: null,
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
      coordinateId: null,
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
      coordinateId: null,
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
      coordinateId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await prisma.address.createMany({
    data: addresses,
    skipDuplicates: true,
  });
  console.info('create prisma.address records');
};

const createVendors = async () => {
  // VENDOR
  const vendors: Vendor[] = [
    {
      id: "1",
      name: "gras",
      publicName: "Gras",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "curaleaf",
      publicName: "Curaleaf",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "sunnyside",
      publicName: "SunnySide",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await prisma.vendor.createMany({
    data: vendors,
    skipDuplicates: true,
  });
  console.info('create prisma.vendor records');
};

const createSchedules = async () => {

  // SCHEDULES
  const schedules: Schedule[] = [
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
  console.info('create prisma.schedule records');
};

const createSubdomains = async () => {

  // SUBDOMAIN
  const subdomains: SubDomain[] = [
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
  console.info('create prisma.subDomain records');
};

const createCategories = async () => {
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
  console.info('create prisma.category records');
};

const createDrivers = async () => {
  // DRIVERS
  const driver = await prisma.driver.upsert({
    where: {
      email: "bmejiadeveloper2@gmail.com",
    },
    create: {
      email: "bmejiadeveloper2@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        create: {
          createdAt: new Date(),
          updatedAt: new Date(),
          id: 'bf346k4u7x2b2hhr6wvgiwao',
          firstName: "Bryant",
          lastName: "Mejia",
          username: "BigChiefa",
          email: "bmejiadeveloper2@gmail.com",
          phone: "1232343456",
          emailVerified: false,
          isLegalAge: null,
          idVerified: false,
          isSignUpComplete: false,
          dialCode: "1",
          idFrontImage: "",
          idBackImage: "",
          termsAccepted: false,
          address: {
            create: {
              street1: "1234 Main St",
              city: "Baltimore",
              state: "MD",
              zipcode: 21202,
              country: "USA",
              countryCode: "US",
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          },
          profilePicture: {
            create: {
              id: '3',
              location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
              blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          },
        }
      }
    },
    update: {
      email: "bmejiadeveloper2@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        connect: {
          email: "bmejiadeveloper2@gmail.com",
        }
      }
    },
  });
  console.info('create prisma.driver records');
};

const createOrders = async () => {
  // ORDER
  const orders: Prisma.OrderCreateInput[] = [
    {
      id: "1",
      subtotal: 12000,
      total: 12399,
      taxFactor: 0.6,
      taxAmount: 1239,
      orderStatus: "Pending",
      customer: {
        connect: {
          id: "bfhk6k4u7xq030hr6wvgiwao",
        },
      },
      destinationAddress: {
        connect: {
          id: "5",
        },
      },
      driver: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgiwao",
        },
      },
      organization: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgippp",
        },
      },
      purchase: {
        create: {
          paymentStatus: "Pending",
          gateway: "stripe",
          type: "card",
          amount: 12399,
          token: '12345',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      routeId: null,
      isDeliveredOrder: false,
      isCustomerReceivedOrder: false,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDriverAssigned: false,
      driverAssignedAt: new Date(),
      isProductPickedUp: false,
      productPickedUpAt: new Date(),
      customerReceivedOrderAt: new Date(),
      completedAt: new Date(),
      deliveredAt: new Date(),
    },
    {
      id: "2",
      subtotal: 12000,
      total: 23444,
      taxFactor: 0.6,
      taxAmount: 1239,
      orderStatus: "Processing",
      customer: {
        connect: {
          id: "bfhk6k4u7xq030hr6wvgiwao",
        },
      },
      destinationAddress: {
        connect: {
          id: "5",
        },
      },
      driver: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgiwao",
        },
      },
      organization: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgippp",
        },
      },
      purchase: {
        create: {
          paymentStatus: "Paid",
          gateway: "stripe",
          type: "card",
          amount: 23444,
          token: '12345',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      routeId: null,
      isDeliveredOrder: false,
      isCustomerReceivedOrder: false,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDriverAssigned: false,
      driverAssignedAt: new Date(),
      isProductPickedUp: false,
      productPickedUpAt: new Date(),
      customerReceivedOrderAt: new Date(),
      completedAt: new Date(),
      deliveredAt: new Date(),
    },
    {
      id: "3",
      subtotal: 12000,
      total: 1244,
      taxFactor: 0.6,
      taxAmount: 1239,
      orderStatus: "Delivered",
      customer: {
        connect: {
          id: "bfhk6k4u7xq030hr6wvgiwao",
        },
      },
      destinationAddress: {
        connect: {
          id: "3",
        },
      },
      driver: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgiwao",
        },
      },
      organization: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgippp",
        },
      },
      isDeliveredOrder: false,
      isCustomerReceivedOrder: false,
      isCompleted: false,
      routeId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDriverAssigned: false,
      driverAssignedAt: new Date(),
      isProductPickedUp: false,
      productPickedUpAt: new Date(),
      customerReceivedOrderAt: new Date(),
      completedAt: new Date(),
      deliveredAt: new Date(),
    },
    {
      id: "4",
      subtotal: 12000,
      total: 6999,
      taxFactor: 0.6,
      taxAmount: 1239,
      orderStatus: "Delivered",
      customer: {
        connect: {
          id: "bfhk6k4u7xq030hr6wvgiwao",
        },
      },
      destinationAddress: {
        connect: {
          id: "5",
        },
      },
      driver: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgiwao",
        },
      },
      organization: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgippp",
        },
      },
      routeId: null,
      isDeliveredOrder: false,
      isCustomerReceivedOrder: false,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDriverAssigned: false,
      driverAssignedAt: new Date(),
      isProductPickedUp: false,
      productPickedUpAt: new Date(),
      customerReceivedOrderAt: new Date(),
      completedAt: new Date(),
      deliveredAt: new Date(),
    },
    {
      id: "5",
      subtotal: 12000,
      total: 12999,
      taxFactor: 0.6,
      taxAmount: 1239,
      orderStatus: "Cancelled",
      customer: {
        connect: {
          id: "bfhk6k4u7xq030hr6wvgiwao",
        },
      },
      destinationAddress: {
        connect: {
          id: "3",
        },
      },
      driver: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgiwao",
        },
      },
      organization: {
        connect: {
          "id": "bf346k4u7x2b2hhr6wvgdddp",
        },
      },
      routeId: null,
      isDeliveredOrder: false,
      isCustomerReceivedOrder: false,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDriverAssigned: false,
      driverAssignedAt: new Date(),
      isProductPickedUp: false,
      productPickedUpAt: new Date(),
      customerReceivedOrderAt: new Date(),
      completedAt: new Date(),
      deliveredAt: new Date(),
    },
    {
      id: "6",
      subtotal: 12000,
      total: 14599,
      taxFactor: 0.6,
      taxAmount: 1239,
      orderStatus: "Pending",
      customer: {
        connect: {
          id: "bfhk6k4u7xq030hr6wvgiwao",
        },
      },
      destinationAddress: {
        connect: {
          id: "4",
        },
      },
      driver: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgiwao",
        },
      },
      organization: {
        connect: {
          "id": "bf346k4u7x2b2hhr6wvgaaap",
        },
      },
      isDeliveredOrder: false,
      isCustomerReceivedOrder: false,
      isCompleted: false,
      routeId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDriverAssigned: false,
      driverAssignedAt: new Date(),
      isProductPickedUp: false,
      productPickedUpAt: new Date(),
      customerReceivedOrderAt: new Date(),
      completedAt: new Date(),
      deliveredAt: new Date(),
    },
  ];

  orders.map(async (order) =>
    await prisma.order.create({
      data: order,
    })
  );
  console.info('create prisma.order records');
};

async function createMemberships() {
  // MEMBERSHIP
  const memberships: Membership[] = [
    {
      id: '1',
      role: "MEMBER",
      organizationId: '2',
      userId: 'bfhk6k4u7xq030hr6wvgiwao',
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
  console.info('create prisma.membership records');
};

async function createVariants() {
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
      rating: 4.5,
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
      rating: 4.5,
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
      rating: 4.5,
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
      rating: 4.5,
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
      rating: 4.5,
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
      rating: 4.5,
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
      rating: 4.5,
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
      rating: 4.5,
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
  console.info('create prisma.productVariant records');
};
const createProducts = async () => {
  // PRODUCT
  const products: Prisma.ProductCreateInput[] = [
    {
      id: "1",
      name: "King OG",
      description: "turpentines all day baby",
      features: "fresh, without formaline",
      tags: "mini, flower, og",
      organization: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgippp",
        },
      },
      rating: 4.5,
      reviews: {
        create: {
          id: '1',
          rating: 5,
          comment: 'Great thing!',
          user: {
            connect: {
              id: 'bf346k4u7xq030hr6wvgiwao',
            },
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      variants: {
        create: {
          id: "1",
          name: "King OG",
          unit: "g",
          size: 3.5,
          currency: "USD",
          basePrice: 6999,
          discount: 10,
          stock: 5,
          organizationId: 'bf346k4u7x2b2hhr6wvgippp',
          rating: 4.5,
          organizationName: 'Curaleaf',
          quantity: 3,
          isDiscount: true,
          salePrice: 6499,
          sku: 1234567,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "Blackberry Kush",
      description: "Satisfying Liquid Goochy",
      features: "fresh, relaxing",
      tags: "flower, og",
      organization: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgippp",
        },
      },
      rating: 4.5,
      variants: {
        create: {
          id: "3",
          name: "Blackberry Kush",
          unit: "g",
          size: 3.5,
          currency: "USD",
          basePrice: 6999,
          discount: 5,
          stock: 5,
          organizationId: 'bf346k4u7x2b2hhr6wvgippp',
          rating: 4.5,
          organizationName: 'Curaleaf',
          quantity: 3,
          isDiscount: true,
          salePrice: 6499,
          sku: 1234567,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "Blackberry Nuggs",
      description: "check out these nuggs",
      features: "fresh, relaxing",
      tags: "flower, og",
      organization: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgippp",
        },
      },
      rating: 3.3,
      variants: {
        create: {
          id: "4",
          name: "Blackberry Nuggs",
          unit: "g",
          size: 3.5,
          currency: "USD",
          basePrice: 6999,
          discount: 5,
          stock: 5,
          organizationId: 'bf346k4u7x2b2hhr6wvgippp',
          organizationName: 'Curaleaf',
          quantity: 3,
          isDiscount: true,
          rating: 4.5,
          salePrice: 6499,
          sku: 1234567,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      name: "Red Taffy Firetruck",
      description: "Wonderfuly for you",
      features: "fresh, relaxing",
      tags: "flower, og",
      organization: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgippp",
        },
      },
      rating: 4.0,
      variants: {
        create: {
          id: "5",
          name: "Red Taffy Firetruck",
          unit: "g",
          size: 3.5,
          currency: "USD",
          basePrice: 6999,
          discount: 5,
          rating: 4.5,
          stock: 5,
          organizationId: 'bf346k4u7x2b2hhr6wvgippp',
          organizationName: 'Curaleaf',
          quantity: 3,
          isDiscount: true,
          salePrice: 6499,
          sku: 1234567,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5",
      name: "Eagle cbd oil",
      description: "Satisfying Liquid Goochy",
      features: "fresh, relaxing",
      tags: "cbd, og",
      organization: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgdddp",
        },
      },
      rating: 2.5,
      variants: {
        create: {
          id: "6",
          name: "Eagle cbd oil",
          unit: "g",
          size: 3.5,
          currency: "USD",
          basePrice: 6999,
          discount: 5,
          stock: 5,
          organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
          quantity: 3,
          rating: 4.5,
          isDiscount: true,
          salePrice: 6499,
          organizationName: 'Curaleaf',
          sku: 1234567,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6",
      name: "Magic Mountain Bush",
      description: "helpful for your heart",
      features: "fresh, relaxing",
      tags: "flower, og",
      organization: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgdddp",
        },
      },
      rating: 5.0,
      variants: {
        create: {
          id: "7",
          name: "Magic Mountain Bush",
          unit: "g",
          size: 3.5,
          currency: "USD",
          basePrice: 6999,
          rating: 4.5,
          discount: 5,
          stock: 5,
          organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
          organizationName: 'Curaleaf',
          quantity: 3,
          isDiscount: true,
          salePrice: 6499,
          sku: 1234567,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "7",
      name: "Razmatazz",
      description: "sweet and sour",
      features: "fresh, relaxing",
      tags: "flower, og",
      organization: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgdddp",
        },
      },
      rating: 4.0,
      variants: {
        create: {
          id: "8",
          name: "Razmatazz",
          unit: "g",
          size: 3.5,
          currency: "USD",
          basePrice: 6999,
          discount: 5,
          stock: 5,
          rating: 4.5,
          organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
          organizationName: 'Curaleaf',
          quantity: 3,
          isDiscount: true,
          salePrice: 6499,
          sku: 1234567,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "8",
      name: "Eagle cbd oil",
      description: "Satisfying Liquid Goochy",
      features: "fresh, relaxing",
      tags: "cbd, og",
      organization: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgaaap",
        },
      },
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
      organization: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgaaap",
        },
      },
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
      organization: {
        connect: {
          id: "bf346k4u7x2b2hhr6wvgaaap",
        },
      },
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
  console.info('create prisma.product records');
};

const createVendorImages = async () => {// IMAGEVENDOR
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
};

const createOrganizationImages = async () => {
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
  console.info('create prisma.imageOrganization records');
};

const createProductImages = async () => {
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
  console.info('create prisma.imageProduct records');
};

const createUserImages = async () => {
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
  console.info('create prisma.imageUser records');
};

const createArticles = async () => {

  // ARTICLES
  const articles: Prisma.ArticleCreateInput[] = [
    {
      id: '1',
      name: 'we-support-your-dispensary',
      title: `Your Dispensary Thrives With Gras`,
      description: 'Connect with customers who love what you do.',
      href: '12345',
      content: "",
      author: "",
      image: {
        create: {
          id: '1',
          location:
            'https://greenstocknews.com/images/placeholder/cannabis/medicinal/md1.jpg',
          blurhash: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'offering-delivery-service',
      title: 'Fast and Safe Delivery',
      description: 'Delivery By Our Trained Delivery Team',
      href: '123457',
      content: "",
      author: "",
      image: {
        create: {
          id: '2',
          location:
            'https://img.freepik.com/premium-photo/delivery-person-holding-parcel-with-food-delivery-against-yellow-surface_93675-111653.jpg',
          blurhash: 'LTMrO.]mvO11}9FZNer_M#odXRnj',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: 'Gras Is Here To Serve',
      name: 'gras-is-here',
      description: 'Sign Up Your Dispensary for Home Delivery',
      href: '12377456',
      content: "",
      author: "",
      image: {
        create: {
          id: '3',
          location:
            'https://gras-dispensary-images.us-southeast-1.linodeobjects.com/loveweed.png',
          blurhash: 'LTMrO.]mvO11}9FZNer_M#odXRnj',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  articles.forEach(async (article) => await prisma.article.create({
    data: {
      id: article.id,
      title: article.title,
      name: article.name,
      description: article.description,
      href: article.href,
      content: article.content,
      author: article.author,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    }
  }));
  console.info('create prisma.article records');
};

const createArticleImages = async () => {
  // IMAGEARTICLE
  const ImageArticles: ImageArticle[] = [
    {
      id: '1',
      location:
        'https://greenstocknews.com/images/placeholder/cannabis/medicinal/md1.jpg',
      blurhash: '',
      articleId: '1',

      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      location:
        'https://img.freepik.com/premium-photo/delivery-person-holding-parcel-with-food-delivery-against-yellow-surface_93675-111653.jpg',
      blurhash: 'LTMrO.]mvO11}9FZNer_M#odXRnj',
      articleId: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      location:
        'https://gras-dispensary-images.us-southeast-1.linodeobjects.com/loveweed.png',
      blurhash: 'LTMrO.]mvO11}9FZNer_M#odXRnj',
      articleId: '3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  await prisma.imageArticle.createMany({
    data: ImageArticles,
    skipDuplicates: true,
  });
  console.info('create prisma.imageArticle records');
}

const createReviews = async () => {
  // REVIEWS
  // need to update this seed for user information, will fail seed as it is now - 06182023
  const reviews: ReviewWithUserDetails[] = [
    {
      id: '1',
      rating: 5,
      comment: 'Great thing!',
      productId: '1',
      userId: 'bf346k4u7xq030hr6wvgiwao',
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        id: 'bf346k4u7xq030hr6wvgiwao',
        username: "Sammy223",
        profilePicture: {
          id: "2",
          userId: "bf346k4u7xq030hr6wvgiwao",
          location: "https://www.baltimoremagazine.com/wp-content/uploads/2019/12/baltimore-oriole-s52-11-018-l-0.jpg",
          blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }
    }
  ];
  reviews.forEach(async (review) => await prisma.review.create({
    data: {
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      user: {
        connect: {
          id: review.userId
        }
      },
      product: {
        connect: {
          id: review.productId
        }
      },
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    }
  }));
  console.info('create prisma.review records');
};

async function main() {
  console.info(`\nPerforming seed in ${process.env.DATABASE_ENV} environment.`)

  await createDrivers();

  await createVendors();
  await createCoordinates();
  await createOrganizations();
  await createUsers();

  await createAddresses();
  await createSchedules();
  await createSubdomains();
  await createCategories();

  // await createOrders(); // appended to organization seed
  // await createMemberships(); // appended to user seed

  // await createProducts(); // appended to organization seed
  // await createVariants(); // appended to product seed
  // await createReviews(); // appended to product seed

  await createVendorImages();
  // await createOrganizationImages();
  // await createProductImages();
  // await createUserImages(); // appended to user seed

  await createArticles();
  // await createArticleImages(); // appended to article seed
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
