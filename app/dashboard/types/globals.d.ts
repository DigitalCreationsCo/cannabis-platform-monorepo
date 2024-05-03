/* eslint-disable @typescript-eslint/naming-convention */
interface Window {
	// mapbox
	mapboxgl: any;

	// GTM
	dataLayer: any;

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

// eslint-disable-next-line no-var, @typescript-eslint/no-unused-vars
var clientPromise: Promise<MongoClient>;
