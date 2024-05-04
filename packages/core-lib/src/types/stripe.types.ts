/* eslint-disable @typescript-eslint/naming-convention */
type Dispensary = any;

export type DispensaryCreateStripeAccountPayload = {
	organization: Dispensary;
	email: string;
};

export type DispensaryConnectStripeAccountPayload = {
	organization: Dispensary;
	stripeAccountId: string;
};

export type CheckoutSessionMetaData = {
	organizationId: string;
	addressId: string;
	id: string;
	customerId: string;
};

export type OrganizationStripeDetail = {
	id: string;
	stripeAccountId: string;
};

export type CustomerCreateStripeAccountPayload = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
};

export type CustomerCreateStripeAccountResponse = {
	success: 'true' | 'false';
	message: string;
	payload: { client_secret: string };
};
// | {
// 		success: 'false';
// 		message: string;
// 		error: string;
//   };
