import axios from 'axios';
import inquirer from 'inquirer';

console.info('Activate incoming phone number for SMS: TextGrid API');

// parameters
const region = 'MD';
const countryCode = 'US';
try {
	await axios(
		`${process.env.TEXTGRID_BASE_URL}/Accounts/${process.env.TEXTGRID_ACCOUNT_SID}/AvailablePhoneNumbers/${countryCode}/Local.json?inRegion=${region}`,
		{
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization':
					`Bearer S2h0eVFIdDVqcVE5MVFBN1V6c2tqQT09OjhjN2RlOTY3OWZmMzQzNjI5NGNiZTljZWYxMDliYjQx`,
			},
		},
	).then((response) => {
		inquirer
			.prompt([
				{
					name: 'select-phone-number',
					type: 'rawlist',
					message: 'Select an available phone number for sms activation:',
					choices: response.data['available_phone_numbers'].map(
						(phoneNumber) => phoneNumber.phone_number,
					),
				},
			])
			.then(async (answers) => {
				console.info(
					'activating phone number for sms module',
					answers['select-phone-number'],
				);
				await axios.post(
					`${process.env.TEXTGRID_BASE_URL}/Accounts/${process.env.TEXTGRID_ACCOUNT_SID}/IncomingPhoneNumbers.json`,
					{
						phoneNumber: answers['select-phone-number'],
						smsUrl: `${process.env.NEXT_PUBLIC_SERVER_DISPATCH_URL}/sms/driver-accept-order`,
						// smsFallbackUrl = “{The URL that TextGrid will request if an error occurs requesting or executing the TwiML defined by SmsUrl}” - optional
						// smsFallbackMethod = “{The HTTP method that should be used to request the SmsFallbackUrl. GET/POST. Defaults to POST.}” - optional
						// statusCallback = "{The URL that TextGrid will request to pass status parameters (such as call ended or SMS status updated) to your application}" - optional
						// statusCallbackMethod = “{The HTTP method TextGrid will use to make requests to the StatusCallback URL. GET/POST Defaults to POST.}” - optional
					},
					{
						headers: {
							// eslint-disable-next-line prettier/prettier
							'Authorization':
								`Bearer S2h0eVFIdDVqcVE5MVFBN1V6c2tqQT09OjhjN2RlOTY3OWZmMzQzNjI5NGNiZTljZWYxMDliYjQx`,
						},
					},
				);
			});
	});
} catch (error) {
	console.error('Error getting available phone numbers: ', error);
}
