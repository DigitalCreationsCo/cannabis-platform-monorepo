/* eslint-disable @typescript-eslint/naming-convention */
declare module 'next-connect';
declare module 'boarding.js';

interface Window {
	BrevoConversationsID?: string;
	BrevoConversations?: any;
	hj: any;
	_hjSettings: any;
}

declare global {
	// eslint-disable-next-line no-var
	declare var clientPromise: Promise<MongoClient>;
}
