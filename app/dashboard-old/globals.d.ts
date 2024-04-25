/* eslint-disable @typescript-eslint/naming-convention */
declare module 'next-connect';
declare module 'boarding.js';

interface Window {
	// brevo
	BrevoConversationsID?: string;
	BrevoConversations?: any;
	BrevoConversationsSetup: any;

	// hotjar
	hj: any;
	_hjSettings: any;

	// dailystory
	_dsSettings: any;

	// delivery widget
	GrasDeliveryWidget: any;
}
