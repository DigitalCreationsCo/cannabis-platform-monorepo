/* eslint-disable @typescript-eslint/naming-convention */
declare module 'json-immutable';
declare module 'redux-mock-store';
declare module 'shell-source';
declare module 'next-connect';
declare module 'boarding.js';
declare module '*.mp4' {
	export default string;
}

// export namespace google {}

interface Window {
	// google: any;

	// brevo
	BrevoConversationsID?: string;
	BrevoConversations?: any;
	BrevoConversationsSetup: any;

	// hotjar
	hj: any;
	_hjSettings: any;

	// dailystory
	_dsSettings: any;
}
