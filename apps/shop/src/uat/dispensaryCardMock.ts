
const DispensaryCardMockData = [
    {
        "id:" : "1",
        "name": `${`Your Dispensary Thrives Here`}`,
        "stripeAccountId":null,
        "stripeOnboardingComplete":false,
        "dialCode":"1",
        "phone":"3785793633",
        "subdomain": {
                "id": "your-dispensary",
                "isValid": true,
            },
        "vendor": {
                "id": "2",
                "name": "Your Dispensary",
                "publicName": "Your Dispensary",
            },
        "termsAccepted":true,
        "address":{
            "street1":"1000 East Fayette St",
            "street2":"",
            "city":"Baltimore",
            "state":"Maryland",
            "zipcode":21202,
            "country":"United States",
            "countryCode":"US",
            "coordinates": {
                "radius": 10000,
                "latitude": 39.2919,
                "longitude": -76.6023,
            }
        },
        "images": [
                {
                "location": "https://greenstocknews.com/images/placeholder/cannabis/medicinal/md1.jpg",
                "blurhash":""
                }
            ],
        "schedule": {
            "days":123450,
            "openAt":12,
            "closeAt":18
        }
    },
    {
        "id:" : "2",
        "name":"Need Delivery Service",
        "stripeAccountId":null,
        "stripeOnboardingComplete":true,
        "dialCode":"1",
        "phone":"8882458648",
        "subdomain": {
            "id": "delivery-service",
            "isValid": true,
        },
        "vendor": {
            "id": "2",
            "name": "Need Delivery Service",
            "publicName": "Need Delivery Service",
            },
        "termsAccepted":true,
        "address":{
            "street1":"400 Howard St",
            "street2":"",
            "city":"Baltimore",
            "state":"Maryland",
            "zipcode":21201,
            "country":"United States",
            "countryCode":"US",
            "coordinates": {
                "radius": 10000,
                "latitude": 39.2948,
                "longitude": -76.6199,
        }
        },
        "images": [
            {
                "location": "https://img.freepik.com/premium-photo/delivery-person-holding-parcel-with-food-delivery-against-yellow-surface_93675-111653.jpg",
                "blurhash":"LTMrO.]mvO11}9FZNer_M#odXRnj"
            }
        ],
        "schedule": {
        "days":123450,
        "openAt":9,
        "closeAt":18
        }
    },
    {
        "id:" : "3",
        "name":"Gras Is Here",
        "stripeAccountId":null,
        "stripeOnboardingComplete":true,
        "dialCode":"1",
        "phone":"1232356456",
        "subdomain": {
              "id": "gras-is-here",
              "isValid": true,
          },
        "vendor": {
              "id": "2",
              "name": "Gras Is Here",
              "publicName": "Gras Is Here",
            },
        "termsAccepted":true,
        "address":{
            "street1":"",
            "street2":"",
            "city":"Baltimore",
            "state":"Maryland",
            "zipcode":21202,
            "country":"United States",
            "countryCode":"US",
            "coordinates": {
                "radius": 10000,
                "latitude": 39.2921,
                "longitude": -76.6119,
          }
        },
        "images": [
              {
                "location": "https://gras-organization-images.us-southeast-1.linodeobjects.com/loveweed.png",
                "blurhash":"LTMrO.]mvO11}9FZNer_M#odXRnj"
              }
          ],
        "schedule": {
            "days":123450,
            "openAt":10,
            "closeAt":18
        }
    },
];

  export default DispensaryCardMockData;