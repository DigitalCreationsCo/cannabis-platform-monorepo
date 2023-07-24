var create_organization_payload = {
    "name": inputData.name,
    "dialCode": "1",
    "phone": inputData.phone,
    "address": {
        "street1": inputData.street1,
        "street2": "",
        "city": inputData.city,
        "state": inputData.state,
        "zipcode": inputData.zipcode,
        "country": inputData.country,
        "countryCode": inputData.countryCode
    },
    "schedule": {
        "days": inputData.days,
        "openAt": inputData.openAt,
        "closeAt": inputData.closeAt
    }
}

let output;

await fetch('https://backend.grascannabis.org/main/api/v1/organization',
    {
        method: 'POST', body: create_organization_payload,
        headers: { 'Content-Type': 'application/json' }
    }).then(function (res) {
        return res.json()
    }).then(function (json) {
        output = json
    }).catch(function (error) {
        return;
    })

