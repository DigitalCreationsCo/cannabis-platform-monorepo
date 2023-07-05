import { OrganizationWithShopDetails } from '@cd/data-access';

const _dispensaryCardMockData: OrganizationWithShopDetails[] = [
  {
    id: '1234',
    name: 'McNuggs',
    stripeAccountId: 'acct_1JX2Zz2eZvKYlo2C',
    stripeOnboardingComplete: true,
    dialCode: '1',
    phone: '2475895745',
    termsAccepted: true,
    addressId: '3',
    vendorId: '2',
    categoryList: {
      id: '1234',
      organizationId: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    scheduleId: '1',
    address: {
      id: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
      street1: '2667 Solomons Island Rd',
      street2: '',
      city: 'Annapolis',
      state: 'Maryland',
      zipcode: 21037,
      country: 'United States',
      countryCode: 'US',
      coordinateId: '12345678',
      coordinates: {
        id: '12345678',
        radius: 10000,
        latitude: 39.2904,
        longitude: -76.6122,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
    images: [
      {
        id: '1',
        organizationId: '1234',
        createdAt: new Date(),
        updatedAt: new Date(),
        location:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxzNuI7e1ZEcBvNPke7da5pcvomN-21e2-zERnn0Z6p2ed4AvkOFXPoSEqtIK1V6tl8wY&usqp=CAU',
        blurhash: '',
      },
    ],
    schedule: {
      id: '1234',
      days: 1234560,
      openAt: 9,
      closeAt: 24,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    subdomainId: 'mcnuggs',
    products: [
      {
        id: '1',
        name: 'King OG',
        description: 'turpentines all day baby',
        features: 'fresh, without formaline',
        tags: 'mini, flower, og',
        organizationId: '2',
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
        organization: undefined,
        variants: [
          {
            id: '1',
            name: 'King OG',
            unit: 'g',
            size: 3.5,
            currency: 'USD',
            basePrice: 6999,
            discount: 10,
            stock: 5,
            productId: '1',
            organizationId: '2',
            organizationName: 'Curaleaf',
            quantity: 3,
            rating: 4.5,
            isDiscount: true,
            salePrice: 6499,
            sku: 1234567,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '2',
            name: 'King OG',
            unit: 'g',
            size: 9,
            currency: 'USD',
            basePrice: 17999,
            discount: 5,
            stock: 9,
            productId: '1',
            organizationId: '2',
            organizationName: 'Curaleaf',
            quantity: 3,
            rating: 4.5,
            isDiscount: true,
            salePrice: 6499,
            sku: 1234567,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        categories: [
          {
            id: '9',
            name: 'Flower',
            slug: 'flower',
            icon: 'Breakfast',
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
              username: 'Sammy223',
              profilePicture: {
                id: '2',
                userId: 'bf346k4u7xq030hr6wvgiwao',
                location:
                  'https://www.baltimoremagazine.com/wp-content/uploads/2019/12/baltimore-oriole-s52-11-018-l-0.jpg',
                blurhash: 'dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            },
          },
        ],
      },
      {
        id: '2',
        name: 'Blackberry Kush',
        description: 'Satisfying Liquid Goochy',
        features: 'fresh, relaxing',
        tags: 'flower, og',
        organization: undefined,
        organizationId: '2',
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
        variants: [
          {
            id: '3',
            name: 'Blackberry Kush',
            unit: 'g',
            size: 3.5,
            currency: 'USD',
            basePrice: 6999,
            discount: 5,
            stock: 5,
            productId: '2',
            organizationId: '2',
            organizationName: 'Curaleaf',
            quantity: 3,
            rating: 4.5,
            isDiscount: true,
            salePrice: 6499,
            sku: 1234567,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '4',
            name: 'Blackberry Nuggs',
            unit: 'g',
            size: 3.5,
            currency: 'USD',
            basePrice: 6999,
            discount: 5,
            stock: 5,
            productId: '3',
            organizationId: '2',
            organizationName: 'Curaleaf',
            quantity: 3,
            rating: 4.5,
            isDiscount: true,
            salePrice: 6499,
            sku: 1234567,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        categories: [
          {
            id: '9',
            name: 'Flower',
            slug: 'flower',
            icon: 'Breakfast',
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
              username: 'Sammy223',
              profilePicture: {
                id: '2',
                userId: 'bf346k4u7xq030hr6wvgiwao',
                location:
                  'https://www.baltimoremagazine.com/wp-content/uploads/2019/12/baltimore-oriole-s52-11-018-l-0.jpg',
                blurhash: 'dEHLh[WB2yk8pyoJadR*.7kCMdnjS#M|%1%2Sis.slNH',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            },
          },
        ],
      },
    ],
    vendor: {
      id: '4',
      name: 'McNuggs',
      publicName: 'McNuggs',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export { _dispensaryCardMockData };
