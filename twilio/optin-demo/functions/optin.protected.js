// sync documents are fetched in real time, dont require rebuild
// env vars are fetched in real time, dont require rebuild
// app code change requires rebuild

/* global module, exports, require, process, console */
const documentUtils = require(Runtime.getAssets()['/document-utils.ts'].path);
const listUtils = require(Runtime.getAssets()['/list-utils.ts'].path);
const utils = {
	...documentUtils, ...listUtils
};

const helpMessage = (name) => name ? `Text "join" to join ${name}.` : 'Text "join" to join.';
const unknownCommandMessage = () => "Sorry, I didn't understand that. " + helpMessage();
const optInSuccessMessage = (name) => name? `You're a member! You'll receive the hottest events and offers from ${name}.` : `You're a member! You'll receive the hottest events and offers in the city. 🌆`;
const optInFailMessage = () => "We couldn't subscribe you - try again later?";
const optOutSuccessMessage = () => "You've been unsubscribed. We're sorry to see you go!";
const optOutFailMessage = () => "We couldn't unsubscribe you - please try again later.";

class Command {
	// Create a new instance with necessary arguments from the incoming SMS
	constructor(event, context, accountData) { 
		this.fromNumber = event.From;
		this.body = event.Body || '';
		this.event = event;
		this.context = context;
        this.accountData = accountData;

		const client = this.context.getTwilioClient();
		this.notify = client.notify.v1.services(
			process.env.BROADCAST_NOTIFY_SERVICE_SID
		);

		/*
		 * Occassionally, US numbers will be passed without the preceding
		 * country code - check for this eventuality and fix it
		 */
		if (this.fromNumber.indexOf('+') !== 0) {
			this.fromNumber = `+1${this.fromNumber}`;
		}

		this.logger = context.logger || console;
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
		this.logger.warn('Command not implemented.');
		callback(null, 'Command not implemented.');
	}

	handleError(err, failMessage, callback) {
        this.logger.error(`Error: ${err.message}`);
        callback(err, failMessage);
    }
}

class HelpCommand extends Command {
	run(callback) {
		this.logger.info('Help command executed');
		let message = helpMessage();
        if (this.accountData && this.accountData.name) {
            message = helpMessage(this.accountData.name);
        }
		callback(null, message);
	}
}

class OptinCommand extends Command {
	async run(callback) {
        try {
			this.logger.info(`Attempting to opt in user: ${this.fromNumber}`);

			let endpoint =`${process.env.NEXT_PUBLIC_DASHBOARD_APP_URL}/api/dispensaries/${this.accountData.slug}/customers/add_sms_subscribe`;

			const customer = await utils.retrieveCustomerData(this.context, this.fromNumber);
			let didUpdateCustomerCRM = false;
			if (!customer) {
				// can't assume. tohave any customer info here, so just create contact and add segment with phonenumber only
				this.logger.info(`Adding user to segment: ${this.accountData.slug}`);
				this.logger.info(`POST to url: ${endpoint}`);
				const response = await fetch(`${endpoint}`, {
					method: "POST", 
					body: JSON.stringify({ fromNumber: this.fromNumber, segment: this.accountData.segment }),
					headers: { 'authorization': `Bearer ${process.env.NEXTAUTH_SECRET}`, 'content-type': 'application/json' } });

				if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData?.errors?.message[0] || 'Request failed');
                }

				const data = await response.json();
                customer = data.data.customer;
				// this.logger.info(`response data: `, customer);
				didUpdateCustomerCRM = true;

				const { id } = customer;
				await utils.storeCustomerData(this.context, this.fromNumber, { ...customer, contactId: id });
				await utils.storeCustomerSegment(this.context, this.fromNumber, this.accountData.segment);
			}

			await utils.retrieveCustomerSegmentList(this.context, this.fromNumber)
			.then(async(customerSegments) => {
				if (!customerSegments.includes(this.accountData.segment)) {
					if (!didUpdateCustomerCRM) {
						this.logger.info(`Adding user to segment: ${this.accountData.slug}`);
						this.logger.info(`POST to url: ${endpoint}`);
						fetch(`${endpoint}`, { 
							method: "POST", 
							body: JSON.stringify({ fromNumber: this.fromNumber, segment: this.accountData.segment }),
							headers: { 'authorization': `Bearer ${process.env.NEXTAUTH_SECRET}`, 'content-type': 'application/json' } });
					}
					
					return await utils.storeCustomerSegment(this.context, this.fromNumber, this.accountData.segment)
						.then(() => {
							console.log(`Stored new segment ${this.accountData.segment} for ${this.fromNumber}`);
							return true; // Indicates a new segment was added
						});
				} else { 
					console.log(`Segment ${this.accountData.segment} already exists for ${this.fromNumber}`);
					return false; // Indicates no new segment was added
				}
			})
			.catch(error => {
				console.error('Error in check and store segment operation:', error);
				throw error;
			});
			
			this.logger.info(`Successfully opted in user: ${this.fromNumber}`);
			this.logger.info(`The user was added to list: ${this.accountData.slug}. Contact id: ${customer.id}`);

			const message = this.accountData && this.accountData.name 
                ? optInSuccessMessage(this.accountData.name)
                : optInSuccessMessage();
                
            callback(null, message);
        } catch (err) {
            this.handleError(err, optInFailMessage(), callback);
        }
	}
}

class OptoutCommand extends Command {
    async run(callback) {
		try {
            this.logger.info(`Attempting to opt out user: ${this.fromNumber}`);
            const customerData = await utils.retrieveCustomerData(this.context, this.fromNumber, this.accountData);

            if (!customerData || !customerData.contactId) {
                this.logger.warn(`No customer data found for user: ${this.fromNumber}`);
                callback(null, optOutSuccessMessage());
                return;
            }

            const contactId = customerData.contactId;
			this.logger.info(`Contact id: ${contactId}`);

			const unsubscribe_endpoint = `${process.env.NEXT_PUBLIC_DASHBOARD_APP_URL}/api/dispensaries/${this.accountData.slug}/customers/remove_sms_subscribe`;

			this.logger.info(`Unsubscribing at url: ${unsubscribe_endpoint}`);
			const response = await fetch(unsubscribe_endpoint, { 
				method: "POST", 
				body: JSON.stringify({ contactId, segment: this.accountData.segment, fromNumber: this.fromNumber }),
				headers: { 'authorization': `Bearer ${process.env.NEXTAUTH_SECRET}`, 'content-type': 'application/json' } });
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData?.errors?.message[0] || 'Unsubscribe request failed');
            }

            // No need to remove the sync document, for now
            // await utils.removeCustomerData(this.context, this.fromNumber);

			// Remove segment from segmentsList
			await utils.removeCustomerSegment (this.context, this.fromNumber, this.accountData.segment)

            this.logger.info(`Successfully opted out user: ${this.fromNumber}`);
            callback(null, optOutSuccessMessage());
		} catch (err) {
            this.handleError(err, optOutFailMessage(), callback);
        }
	}
}

exports.handler = async (context, event, callback) => {
	const logger = context.logger || console;
    logger.info('OPTIN::Received event:', event);

	let cmd = event.Body || '';
    cmd = cmd.trim().toLowerCase();

	const CommandClasses = {
        join: OptinCommand,
        optin: OptinCommand,
        'opt in': OptinCommand,
        leave: OptoutCommand,
        optout: OptoutCommand,
        'opt out': OptoutCommand,
        help: HelpCommand
    };

	await utils.retrieveAccountData(context, event.To)
		.then(account => {
			const CommandClass = CommandClasses[cmd] || HelpCommand;
			const cmdInstance = new CommandClass(event, context, account);

			cmdInstance.run((err, message) => {
				if (err) {
					logger.error('Command execution failed:', err);
				} else {
					logger.info('Command executed successfully');
				}

				const twiml = new Twilio.twiml.MessagingResponse();
				twiml.message(message || unknownCommandMessage);
				callback(null, twiml);
			});
		})
		.catch(err => {
			logger.error('Error retrieving account data:', err);
			callback(err);
		});
};
