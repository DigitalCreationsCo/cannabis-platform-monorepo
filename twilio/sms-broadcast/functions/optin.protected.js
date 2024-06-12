/* global module, exports, require, process, console */
const helpMessage = 'Text "join" to receive.';
const optInSuccessMessage = `You're a member! You'll receive the hottest events and offers in the city. 🌆`;
const optInFailMessage = "We couldn't subscribe you - try again later?";

class Command {
	// Create a new instance with necessary arguments from the incoming SMS
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

/* Subclasses for supported commands */

class HelpCommand extends Command {
	run(callback) {
		callback(null, helpMessage());
	}
}

class OptinCommand extends Command {
	run(callback) {
		// Create a new SMS Notify binding for this user's phone number
		this.notify.bindings
			.create({
				identity: this.fromNumber,
				bindingType: 'sms',
				address: this.fromNumber,
			})
			.then(() => {
				callback(null, optInSuccessMessage);
			})
			.catch((err) => {
				console.error(err);
				callback(err, optInFailMessage);
			});
	}
}

exports.handler = (context, event, callback) => {
	let cmd = event.Body || '';
	cmd = cmd.trim().split(' ')[0].toLowerCase();

	const CommandClasses = {
		join: OptinCommand,
	};
	const CommandClass = CommandClasses[cmd] || HelpCommand;
	const cmdInstance = new CommandClass(event, context);

	cmdInstance.run((_err, message) => {
		const twiml = new Twilio.twiml.MessagingResponse();
		twiml.message(message);
		callback(null, twiml);
	});
};
