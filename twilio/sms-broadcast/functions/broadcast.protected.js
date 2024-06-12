/* global module, exports, require, process, console */
const broadcastNotAuthorizedMessage =
	'Your phone number is not authorized to broadcast in this application';
const broadcastSuccessMessage = 'Boom! Message broadcast to all subscribers.';
const broadcastFailMessage =
	'Well this is awkward. Your message failed to send, try again later.';

class Command {
	constructor(event, context) {
		this.fromNumber = event.From;
		this.body = event.Body || '';
		this.event = event;
		this.context = context;

		const client = this.context.getTwilioClient();
		this.notify = client.notify.services(
			process.env.BROADCAST_NOTIFY_SERVICE_SID
		);

		/*
		 * Occassionally, US numbers will be passed without the preceding
		 * country code - check for this eventuality and fix it
		 */
		if (this.fromNumber.indexOf('+') !== 0) {
			this.fromNumber = `+1${this.fromNumber}`;
		}
	}

	// Get an array of arguments after the first word for a command
	get commandArguments() {
		return this.body.trim().split(' ').slice(1);
	}

	// Get the full text after the command with spaces reinserted
	get commandText() {
		return this.commandArguments.join(' ');
	}

	// Execute command async (to be overridden by subclasses)
	run(callback) {
		callback(null, 'Command not implemented.');
	}
}

class BroadcastCommand extends Command {
	constructor(event, context) {
		super(event, context);
		this.adminNumbers = context.BROADCAST_ADMIN_NUMBERS;
	}

	run(callback) {
		/*
		 * Check if sender is in list of admins, stored in the system environment
		 * as a comma-separated string
		 */
		if (this.adminNumbers.indexOf(this.fromNumber) < 0) {
			return callback(null, broadcastNotAuthorizedMessage);
		}

		// Create a new Notification for all bindings with the text of the message
		this.notify.notifications
			.create({
				tag: 'all',
				body: this.commandText,
			})
			.then(() => {
				callback(null, broadcastSuccessMessage);
			})
			.catch((err) => {
				console.error(err);
				callback(err, broadcastFailMessage);
			});
	}
}

exports.handler = (context, event, callback) => {
	let cmd = event.Body || '';
	cmd = cmd.trim().split(' ')[0].toLowerCase();

	const CommandClasses = {
		broadcast: BroadcastCommand,
	};
	const CommandClass = CommandClasses[cmd] || null;
	const cmdInstance = new CommandClass(event, context);

	cmdInstance.run((_err, message) => {
		const twiml = new Twilio.twiml.MessagingResponse();
		twiml.message(message);
		callback(null, twiml);
	});
};
