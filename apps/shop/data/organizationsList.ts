import { OrganizationWithShopDetails } from "@cd/data-access";

const organizationsListDummy: OrganizationWithShopDetails[] = [
    {   name: 'Curaleaf', 
        subdomainId: 'curaleaf', 
        id: '234', 
        address: {
            id: '1',
            street1: '1239 2nd st',
            street2: '',
            city: 'Baltimore',
            state: 'Maryland',
            zipcode: 23456,
            country: 'United States',
            countryCode: 'US',
            coordinateId: '1',
            createdAt: new Date,
            updatedAt: new Date,
        }
    },
    { 
        name: 'Sunnyside', 
        subdomainId: 'sunnyside', 
        id: '345' ,
        address: {
            id: '23',
            street1: '1239 2nd st',
            street2: '',
            city: 'Baltimore',
            state: 'Maryland',
            zipcode: 23457,
            country: 'United States',
            countryCode: 'US',
            coordinateId: '2',
            createdAt: new Date,
            updatedAt: new Date,
        }
    },
    { 
        id: '456',
        name: 'McNuggz', 
        subdomainId: 'mcnuggz', 
        stripeAccountId: 'acct_1JX2Zz2eZvKYlo2C',
        stripeOnboardingComplete: true,
        dialCode: '1', 
        phone: '1232343456', 
        addressId: '2', 
        termsAccepted: true,
        createdAt: new Date,
        updatedAt: new Date,
        products: [],
        address: {
            id: '2',
            street1: '1239 2nd st',
            street2: '',
            city: 'Baltimore',
            state: 'Maryland',
            zipcode: 23456,
            country: 'United States',
            countryCode: 'US',
            coordinateId: '3',
            createdAt: new Date,
            updatedAt: new Date,
            coordinates: {
                id: '3',
                radius: 10000,
                latitude: 39.2904,
                longitude: 76.6122,
                createdAt: new Date,
                updatedAt: new Date,
            }
        },
        vendorId: '3', 
        images: [
            {
                id: '2345',
                location: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxzNuI7e1ZEcBvNPke7da5pcvomN-21e2-zERnn0Z6p2ed4AvkOFXPoSEqtIK1V6tl8wY&usqp=CAU',
                blurhash: '',
                organizationId: '456',
                createdAt: new Date,
                updatedAt: new Date,
            }
        ], 
        categoryList: {
            id: '36',
            organizationId: '456',
            // categories: ['Flower', 'Edibles', 'Concentrates', 'Vape Pens', 'Topicals', 'Tinctures', 'Accessories', 'Pre-Rolls', 'CBD', 'Pets', 'Apparel', 'Other'],
            createdAt: new Date,
            updatedAt: new Date,
        },
        
        schedule: {
            id: '3',
            organizationId: '456',
            days: 123456,
            openAt: 9,
            closeAt: 21,
            createdAt: new Date,
            updatedAt: new Date,
        }
    }
];

export { organizationsListDummy };
