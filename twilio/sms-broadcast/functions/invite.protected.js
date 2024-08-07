/* global module, exports, require, process, console */
const inviteMessage = 'Text "join" to receive events and promotions.';

class Command {
	// Create a new instance with necessary arguments from the incoming SMS
	constructor(event, context) {
		this.fromNumber = event.From;
		this.toNumber = event.To;
		this.body = event.Body || '';
		this.event = event;
		this.context = context;

		/*
		 * Occassionally, US numbers will be passed without the preceding
		 * country code - check for this eventuality and fix it
		 */
		if (this.fromNumber.indexOf('+') !== 0) {
			this.fromNumber = `+1${this.fromNumber}`;
		}

		/*
		 * Occassionally, US numbers will be passed without the preceding
		 * country code - check for this eventuality and fix it
		 */
		if (this.toNumber.indexOf('+') !== 0) {
			this.toNumber = `+1${this.toNumber}`;
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

class InviteCommand extends Command {
	run(callback) {
		/*
		 * Check if sender is in list of admins, stored in the system environment
		 * as a comma-separated string
		 */
		if (this.context.BROADCAST_ADMIN_NUMBERS.indexOf(this.fromNumber) < 0) {
			return callback(
				null,
				'You are not authorized to use the invite channel.'
			);
		}

		if (this.commandArguments.length === 0) {
			return callback(
				null,
				'Please provide a valid phone number and optional message. Format: invite [phone_number] [message]'
			);
		}

		// invite command example:
		// invite +15707901185 Join our SMS list for daily deals and events!
		const recipient = this.commandArguments[0];
		const message = this.commandArguments.slice(1).join(' ');

		// Send an invite message to the user
		const client = this.context.getTwilioClient();
		client.messages
			.create({
				from: this.toNumber, // send from the Twilio phone number
				to: recipient, // recipient argument
				body: message || inviteMessage,
			})
			.then((msg) => {
				return { success: true, sid: msg.sid };
			})
			.then((result) => {
				return callback(null, { result });
			})
			.catch((err) => {
				console.error(err);
				callback(err, err.message);
			});
	}
}

exports.handler = (context, event, callback) => {
	const logger = context.logger || console;
	logger.info('INVITE::Received event:', event);

	let cmd = event.Body || '';
	cmd = cmd.trim().split(' ')[0].toLowerCase();

	const CommandClasses = {
		invite: InviteCommand,
	};
	const CommandClass = CommandClasses[cmd] || null;
	const cmdInstance = new CommandClass(event, context);

	cmdInstance.run((_err, message) => {
		const twiml = new Twilio.twiml.MessagingResponse();
		twiml.message(message);
		callback(null, twiml);
	});
};
