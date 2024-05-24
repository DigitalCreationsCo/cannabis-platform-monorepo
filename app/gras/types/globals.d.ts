/* eslint-disable @typescript-eslint/naming-convention */
declare const FB: any;

interface Window {
  // FB
  fbAsyncInit: any;
  FB: any;

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
