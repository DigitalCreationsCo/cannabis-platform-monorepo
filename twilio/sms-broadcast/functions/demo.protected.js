exports.handler = function (context, event, callback) {
	const logger = context.logger || console;
	logger.info('DEMO::Received event:', event);

	const client = context.getTwilioClient();
	const twiml = new Twilio.twiml.MessagingResponse();

	/*
	 * Check if sender is in list of admins, stored in the system environment
	 * as a comma-separated string
	 */
	if (context.BROADCAST_ADMIN_NUMBERS.indexOf(event.From) < 0) {
		twiml.message('You are not authorized to use the demo channel.');
		return callback(null, twiml);
	}

	// Check if the message starts with 'demo'
	if (event.Body.toLowerCase().startsWith('demo ')) {
		const parts = event.Body.split(' ');
		if (parts.length < 3) {
			twiml.message(
				'Please provide a valid phone number and name after "demo". Format: demo [phone_number] [name]'
			);
			return callback(null, twiml);
		}

		const twilioPhoneNumber = event.To;
		const recipient = parts[1];
		const name = parts.slice(2).join(' '); // Combine all parts after phone number as the name

		if (!recipient || !name) {
			twiml.message(
				'Please provide both a valid phone number and name after "demo".'
			);
			return callback(null, twiml);
		}

		const messages = [
			{ body: `Welcome to our demo, ${name}!`, mediaUrl: null },
			{
				body: `${name}, here's an image of our product:`,
				mediaUrl:
					'https://www.gras.live/_next/static/media/dispensary.ecabbda7.png',
			},
			{
				body: `Check out our latest features, ${name}:`,
				mediaUrl:
					'https://www.gras.live/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmessage-1.2b9c0e17.png&w=640&q=75',
			},
			{ body: `Thanks for checking out our demo, ${name}!`, mediaUrl: null },
		];

		sendMessages(client, twilioPhoneNumber, recipient, messages, 0);

		twiml.message(`Demo messages are being sent to ${name} at ${recipient}`);
		return callback(null, twiml);
	} else {
		twiml.message(
			'Invalid command. Please start your message with "demo" followed by a phone number and name.'
		);
		return callback(null, twiml);
	}
};

function sendMessages(client, from, to, messages, index) {
	if (index >= messages.length) return;

	const message = messages[index];
	const messageOptions = {
		body: message.body,
		from: from,
		to: to,
	};

	if (message.mediaUrl) {
		messageOptions.mediaUrl = message.mediaUrl;
	}

	client.messages
		.create(messageOptions)
		.then((message) => {
			console.log(`Message ${index + 1} sent: ${message.sid}`);
			// Schedule next message with a random delay between 1 to 2 seconds
			setTimeout(
				() => {
					sendMessages(client, from, to, messages, index + 1);
				},
				Math.floor(Math.random() * 1000) + 1000
			);
		})
		.catch((err) => {
			console.error(`Error sending message ${index + 1}:`, err);
		});
}
