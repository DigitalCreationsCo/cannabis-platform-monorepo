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
		// invite command example:
		// invite Join our SMS list for daily deals and events!
		const message = this.body.trim().split(' ').slice(1).join(' ');

		// Send an invite message to the user
		const client = this.context.getTwilioClient();
		client.messages
			.create({
				from: this.fromNumber,
				to: this.toNumber,
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
