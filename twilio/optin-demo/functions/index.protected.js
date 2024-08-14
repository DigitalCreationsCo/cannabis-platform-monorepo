exports.handler = function (context, event, callback) {
	const twiml = new Twilio.twiml.MessagingResponse();
	const messageBody = event.Body.toLowerCase().trim();

	// Extract the first word to use as the command
	const command = messageBody.split(' ')[0];

	// Route the message based on its content
	switch (command) {
		case 'demo':
			const demo = require(Runtime.getFunctions()['demo'].path);
			return demo.handler(context, event, callback);
		case 'invite':
			const invite = require(Runtime.getFunctions()['invite'].path);
			return invite.handler(context, event, callback);
		case 'broadcast':
			const broadcast = require(Runtime.getFunctions()['broadcast'].path);
			return broadcast.handler(context, event, callback);
		// case 'status':
		// 	return Runtime.getFunction('status')(context, event, callback);
		default:
			return handleDefault(twiml, context, event, callback);
	}
};

function handleDefault(twiml, context, event, callback) {
	const optin = require(Runtime.getFunctions()['optin'].path);
	return optin.handler(context, event, callback);
}
