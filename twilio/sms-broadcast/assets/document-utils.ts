exports.retrieveAccountData = (context, twilioNumber) => {
	const client = context.getTwilioClient();

	return client.sync.v1
		.services(process.env.SYNC_SERVICE_ID_ACCOUNT)
		.documents(twilioNumber)
		.fetch()
		.then((document) => {
			console.log(
				'Retrieved client data for Twilio number:',
				twilioNumber,
				document.data
			);
			return document.data;
		})
		.catch((err) => {
			if (err.code === 20404) {
				console.log('No data found for this Twilio number:', twilioNumber);
				return null;
			} else {
				console.error('Error retrieving client data:', err);
				throw err;
			}
		});
};

exports.retrieveCustomerData = (context, fromNumber) => {
	const client = context.getTwilioClient();
	// Construct the document name using fromNumber and accountData.segment
	const documentName = `${fromNumber}`;
	return client.sync.v1
		.services(process.env.SYNC_SERVICE_ID_CUSTOMER)
		.documents(documentName)
		.fetch()
		.then((document) => {
			console.log('Retrieved client data for:', documentName, document.data);
			return document.data;
		})
		.catch((err) => {
			if (err.code === 20404) {
				console.log('No data found for:', documentName);
				return null;
			} else {
				console.error('Error retrieving client data:', err);
				throw err;
			}
		});
};

exports.storeCustomerData = (context, fromNumber, customerData) => {
	const client = context.getTwilioClient();

	// Construct the document name using fromNumber and accountData.segment
	const documentName = `${fromNumber}`;

	return client.sync.v1
		.services(process.env.SYNC_SERVICE_ID_CUSTOMER)
		.documents.create({
			uniqueName: documentName,
			data: customerData,
		})
		.then((document) => {
			console.log('Stored client data for:', documentName, document.data);
			return document.data;
		})
		.catch((err) => {
			if (err.code === 54301) {
				// Document already exists, update it instead
				return client.sync.v1
					.services(process.env.SYNC_SERVICE_ID_CUSTOMER)
					.documents(documentName)
					.update({
						data: customerData,
					})
					.then((document) => {
						console.log(
							'Updated client data for:',
							documentName,
							document.data
						);
						return document.data;
					});
			} else {
				console.error('Error storing client data:', err);
				throw err;
			}
		});
};

exports.removeCustomerData = (context, fromNumber) => {
	const client = context.getTwilioClient();
	const documentName = `${fromNumber}`;

	return client.sync.v1
		.services(process.env.SYNC_SERVICE_ID_CUSTOMER)
		.documents(documentName)
		.remove()
		.then(() => {
			console.log(`Removed customer data for: ${documentName}`);
		})
		.catch((err) => {
			if (err.code === 20404) {
				console.log(`No data found to remove for: ${documentName}`);
			} else {
				console.error('Error removing customer data:', err);
				throw err;
			}
		});
};
