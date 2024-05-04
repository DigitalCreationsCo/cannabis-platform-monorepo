import { DefaultSession } from 'next-auth';

/* eslint-disable @typescript-eslint/naming-convention */
declare module 'json-immutable';
declare module 'redux-mock-store';
declare module 'shell-source';
declare module 'next-connect';
declare module 'boarding.js';
declare module '*.mp4' {
  export default string;
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

declare const FB: any;

declare global {
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
}
