async function sendMessages(client, from, to, messages) {
	for (let index = 0; index < messages.length; index++) {
	  const message = messages[index];
	  let messageBody = message.body || '';
  
	  const messageOptions = {
		from: from,
		to: to,
	  };
  
	  if (message.mediaUrl) {
		// If there's media, add it to the message body
		messageBody += '\n' + message.mediaUrl;
	  }
  
	  // Set the final message body
	  messageOptions.body = messageBody;
  
	  try {
		// Random pause between 2 to 4 seconds
		await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 2000) + 2000));
  
		const sentMessage = await client.messages.create(messageOptions);
		console.log(`Message ${index + 1} sent: ${sentMessage.sid}`);
	  } catch (err) {
		console.error(`Error sending message ${index + 1}:`, err);
	  }
	}
  }

  
exports.handler = function async (context, event, callback) {
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
		if (parts.length < 4) {
			twiml.message(
				'Please provide a valid phone number, name and dispensary after "demo". Format: "demo" [phone_number] [name] [dispensary]'
			);
			return callback(null, twiml);
		}

		const twilioPhoneNumber = event.To

		const [recipient, name, ...rest] = parts.slice(1);
		const dispensary = rest.join(' ');

		if (!recipient || !name || !dispensary) {
			twiml.message(
				'Please provide a valid phone number and name after "demo". Format: demo [phone_number] [name]'
			);
			return callback(null, twiml);
		}

		const messages = [
			{
				body: `🌸 Bloom Alert, ${name}!  🌸
Exclusive offer for our VIP:
Legacy Flower is back!
Limited stock - only 20 available!`,
				mediaUrl: null,
			},
			{
				body: `25% off Bloom Legacy!
Limited stock - only 20 available!

Ready to dazzle? `,
				mediaUrl:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT03FSVs8NVKTYybsReEr8gAwkZFeG337LQZQ&s',
			},
			{
				body: `Don't miss out! Order now:
📲 Text ${dispensary} to ${twilioPhoneNumber}
// 🌐 modernbloom.com/neon-offer
Enjoy yours before it's gone! 🏃‍♀️💨`,
				mediaUrl:
					'https://i.etsystatic.com/22561107/r/il/8adcc9/2826621144/il_300x300.2826621144_cb97.jpg',
			},
		];

		await sendMessages(client, twilioPhoneNumber, recipient, messages);

		twiml.message(`Demo messages are being sent to ${name} at ${recipient}`);
		return callback(null, twiml);
	} else {
		twiml.message(
			'Invalid command. Please start your message with "demo" followed by a phone number and name.'
		);
		return callback(null, twiml);
	}
};

