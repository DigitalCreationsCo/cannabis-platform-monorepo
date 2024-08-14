exports.retrieveCustomerSegmentList = (context, fromNumber) => {
	const client = context.getTwilioClient();
	const listUniqueName = `segments_${fromNumber}`;

	return client.sync.v1
		.services(process.env.SYNC_SERVICE_ID_CUSTOMER)
		.syncLists(listUniqueName)
		.syncListItems.list({ limit: 20 })
		.then((items) => {
			return items.map((item) => item.data.segment);
		})
		.catch((err) => {
			if (err.code === 20404) {
				console.log(`No segment list found for: ${fromNumber}`);
				return [];
			}
			console.error('Error retrieving customer segments:', err);
			throw err;
		});
};

exports.storeCustomerSegment = (context, fromNumber, segment) => {
	const client = context.getTwilioClient();
	const listUniqueName = `segments_${fromNumber}`;
	console.log(
		`Attempting to store segment "${segment}" for number: ${fromNumber}`
	);

	return client.sync.v1
		.services(process.env.SYNC_SERVICE_ID_CUSTOMER)
		.syncLists(listUniqueName)
		.syncListItems.create({ data: { segment: segment } })
		.then((item) => {
			console.log(`Successfully added segment "${segment}" for: ${fromNumber}`);
			return item;
		})
		.catch((err) => {
			if (err.code === 20404) {
				console.log(
					`List "${listUniqueName}" does not exist. Creating new list.`
				);
				// List doesn't exist, create it first
				return client.sync.v1
					.services(process.env.SYNC_SERVICE_ID_CUSTOMER)
					.syncLists.create({ uniqueName: listUniqueName })
					.then(() => {
						console.log(
							`List "${listUniqueName}" created successfully. Retrying to store the segment.`
						);
						// List created successfully, now store the segment
						return client.sync.v1
							.services(process.env.SYNC_SERVICE_ID_CUSTOMER)
							.syncLists(listUniqueName)
							.syncListItems.create({ data: { segment: segment } });
					})
					.then((item) => {
						console.log(
							`Successfully added segment "${segment}" after creating the list for: ${fromNumber}`
						);
						return item;
					});
			}
			console.error('Error storing customer segment:', err);
			throw err;
		});
};

exports.removeCustomerSegment = (context, fromNumber, segment) => {
	const client = context.getTwilioClient();
	const listUniqueName = `segments_${fromNumber}`;

	return client.sync.v1
		.services(process.env.SYNC_SERVICE_ID_CUSTOMER)
		.syncLists(listUniqueName)
		.syncListItems.list({ limit: 20 })
		.then((items) => {
			const itemToRemove = items.find((item) => item.data.segment === segment);
			if (itemToRemove) {
				return client.sync.v1
					.services(process.env.SYNC_SERVICE_ID_CUSTOMER)
					.syncLists(listUniqueName)
					.syncListItems(itemToRemove.index)
					.remove();
			} else {
				console.log(`Segment ${segment} not found for: ${fromNumber}`);
			}
		})
		.then(() => {
			console.log(`Removed segment ${segment} for: ${fromNumber}`);
		})
		.catch((err) => {
			if (err.code === 20404) {
				console.log(`No segment list found for: ${fromNumber}`);
			} else {
				console.error('Error removing customer segment:', err);
				throw err;
			}
		});
};
