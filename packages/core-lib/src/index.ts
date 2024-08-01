// const auth = import('./auth').then((module) => module);
// const axiosInstance = import('./axiosInstance').then((module) => module);
// const constants = import('./constants').then;
// const hooks = import('./hooks').then((module) => module);
// const middleware = import('./middleware').then((module) => module);
// const reducer = import('./reducer').then((module) => module);
// const types = import('./types').then((module) => module);
// const utils = import('./utils').then((module) => module);
// const dummyData = import('./dummyData').then((module) => module);

// export {
// 	auth,
// 	axiosInstance,
// 	constants,
// 	hooks,
// 	middleware,
// 	reducer,
// 	types,
// 	utils,
// 	dummyData,
// };

// export { default as SMSModule } from './sms/sms.module';
export * from './auth';
export * from './axiosInstance';
export * from './constants';
export * from './crm';
export * from './cron-job';
export * from './hooks';
export * from './middleware';
export { default as keywords } from './seo/keywords';
export * from './reducer';
export * from './types';
export * from './utils';
export { default } from './locales';
export * from './lib';
export * from './dummyData';
// export * from './point-of-sale/IntegrationService';
// export * from './point-of-sale/blazePOS';
// export * from './point-of-sale/dutchiePOS';
// export * from './point-of-sale/integration.types';
// export * from './point-of-sale/metrcInventory';
// export * from './point-of-sale/weedmapsPOS';
export * from './errors';
// export * from './lib'; // import lib files directly from the lib folder
// eslint-disable-next-line import/no-cycle

// async function loadAsyncModules(module: Promise<any>) {
//     return await module;
// }

// loadAsyncModules(auth)
