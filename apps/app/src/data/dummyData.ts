import { OrderWithDashboardDetails, OrganizationWithDashboardDetails, ProductWithDashboardDetails, UserDispensaryAdmin, UserWithProfilePicture } from "@cd/data-access";

const userDispensaryAdmin: UserDispensaryAdmin = {
    id: 'bf346k4u7xq030hr6wvgiwao',
    firstName: "Doug",
    lastName: "Doogie",
    username: "Doogie123",
    email: "doug@mcnuggsdispensary.com",
    dialCode: "1",
    phone: "6665555555",
    emailVerified: true,
    isLegalAge: true,
    idVerified: true,
    scannedDOB: new Date(),
    isSignUpComplete: true,
    idFrontImage: null,
    idBackImage: null,
    termsAccepted: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    profilePicture: {
        id: "1",
        location: "https://cdn-cashy-static-assets.lucidchart.com/marketing/blog/2017Q1/7-types-organizational-structure/types-organizational-structures.png",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    memberships: [
        {
            role: "ADMIN",
            organizationId: "2",
            userId: "1",
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ],
};

const notAdminUser: UserWithProfilePicture = {
    id: 'bf346k4u7xq030hr6wvgiwao',
    firstName: "Sam",
    lastName: "Samuels",
    username: "Sammy223",
    email: "sam@gmail.com",
    phone: "1232343452",
    emailVerified: true,
    isLegalAge: true,
    idVerified: true,
    scannedDOB: new Date(),
    isSignUpComplete: true,
    dialCode: "1",
    idFrontImage: null,
    idBackImage: null,
    termsAccepted: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    profilePicture: {
        id: "2",
        location: "https://www.baltimoremagazine.com/wp-content/uploads/2019/12/baltimore-oriole-s52-11-018-l-0.jpg",
        blurhash: "dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
}

const organization: OrganizationWithDashboardDetails = {
    id: '1234',
    "name": "McNuggs",
    "stripeAccountId": "acct_1JX2Zz2eZvKYlo2C",
    "stripeOnboardingComplete": true,
    "dialCode": "1",
    "phone": "2475895745",
    "termsAccepted": true,
    addressId: '1234',
    "address": {
        id: '1234',
        createdAt: new Date(),
        updatedAt: new Date(),
        "street1": "2667 Solomons Island Rd",
        "street2": "",
        "city": "Annapolis",
        "state": "Maryland",
        "zipcode": 21037,
        "country": "United States",
        "countryCode": "US",
        "coordinateId": '12345678',
        "coordinates": {
            "id": '12345678',
            "radius": 10000,
            "latitude": 39.2904,
            "longitude": -76.6122,
            "createdAt": new Date,
            "updatedAt": new Date,
        }
    },
    "images": [
        {
            id: '1',
            organizationId: '1234',
            createdAt: new Date(),
            updatedAt: new Date(),
            "location": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxzNuI7e1ZEcBvNPke7da5pcvomN-21e2-zERnn0Z6p2ed4AvkOFXPoSEqtIK1V6tl8wY&usqp=CAU",
            "blurhash": ""
        }
    ],
    "scheduleId": '1234',
    "schedule": {
        "id": '1234',
        "days": 1234560,
        "openAt": 9,
        "closeAt": 24,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    "subdomainId": 'mcnuggs',
    "subdomain": {
        "id": "mcnuggs",
        "isValid": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    "vendorId": '4',
    "vendor": {
        "id": "4",
        "name": "McNuggs",
        "publicName": "McNuggs",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date()
};

const products: ProductWithDashboardDetails[] = [
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
        variants: [
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
        ],
        categories: [
            {
                id: "9",
                name: "Flower",
                slug: "flower",
                icon: "Breakfast",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        reviews: [
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
        ]
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
        variants: [
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
        ],
        categories: [
            {
                id: "9",
                name: "Flower",
                slug: "flower",
                icon: "Breakfast",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        reviews: []
    },
];

const orders: OrderWithDashboardDetails[] = [
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
        items: [
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
        ],
        customer: {
            id: 'bf346k4u7xq030hr6wvgiwao',
            firstName: "Sam",
            lastName: "Samuels",
            username: "Sammy223",
            email: "sam@gmail.com",
            phone: "1232343452",
            emailVerified: true,
            isLegalAge: true,
            idVerified: true,
            scannedDOB: new Date(),
            isSignUpComplete: true,
            dialCode: "1",
            idFrontImage: null,
            idBackImage: null,
            termsAccepted: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        driver: {
            id: 'bf346k4u7x2b2hhr6wvgiwao',
            email: "bmejiadeveloper2@gmail.com",
            createdAt: new Date(),
            updatedAt: new Date(),
            user: {
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
                scannedDOB: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
        },
        route: {
            driverId: 'bf346k4u7x2b2hhr6wvgiwao',
            orderId: '1',
            coordinates: [
                [35, 75],
                [37, 78],
                [37, 79],
                [37, 80],
                [36, 80],
                [34, 81],
                [33, 81],
            ]
        },
        destinationAddress: {
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
            coordinates: {
                id: '1',
                latitude: 33,
                longitude: 81,
                radius: 1000000,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        },
        purchase: {
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
    },
];

export {
    userDispensaryAdmin,
    notAdminUser,
    organization,
    products,
    orders,
};
