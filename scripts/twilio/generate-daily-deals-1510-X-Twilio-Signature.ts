const { argv } = require('process');
const { getExpectedTwilioSignature } = require('twilio/lib/webhooks/webhooks');

// Retrieve your auth token from the environment instead of hardcoding
const authToken = argv[2];

console.info('authToken: ', authToken);
// Use the Twilio helper to generate your valid signature!
// The 1st argument is your Twilio auth token.
// The 2nd is the full URL of your Function.
// The 3rd is any application/x-www-form-urlencoded data being sent, which is none!
const xTwilioSignature = getExpectedTwilioSignature(
	authToken,
	'https://daily-deals-1510.twil.io/sms/send',
	{}, // <- Leave this empty if sending request data via JSON
);

// Print the signature to the console for use with your
// preferred HTTP client
console.log('xTwilioSignature: ', xTwilioSignature);

// For example, the output will look like this:
// xTwilioSignature: coGTEaFEMv8ejgNGtgtUsbL8r7c=
