import axios from 'axios';

console.info(
	`Get incoming phone numbers for SMS: TextGrid API in
${process.env.NODE_ENV} environment.
`,
);

try {
	axios(
		`${process.env.TEXTGRID_BASE_URL}/Accounts/${process.env.TEXTGRID_ACCOUNT_SID}/IncomingPhoneNumbers.json`,
		{
			headers: {
				// eslint-disable-next-line prettier/prettier
							'Authorization':
								`Bearer ${Buffer.from(
					`${process.env.TEXTGRID_ACCOUNT_SID}:${process.env.TEXTGRID_AUTHTOKEN}`,
				).toString('base64')}`,
			},
		},
	).then((response) => console.info(response.data));
} catch (error) {
	console.error('Error getting available phone numbers: ', error);
}
