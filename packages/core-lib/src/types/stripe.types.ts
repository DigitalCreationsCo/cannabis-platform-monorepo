/* eslint-disable @typescript-eslint/naming-convention */
type Dispensary = any;

export interface DispensaryCreateStripeAccountPayload {
	organization: Dispensary;
	email: string;
}

export interface DispensaryConnectStripeAccountPayload {
	organization: Dispensary;
	stripeAccountId: string;
}

export interface CheckoutSessionMetaData {
	organizationId: string;
	addressId: string;
	id: string;
	customerId: string;
}

export interface OrganizationStripeDetail {
	id: string;
	stripeAccountId: string;
}

export interface CustomerCreateStripeAccountPayload {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
}

export interface CustomerCreateStripeAccountResponse {
	success: 'true' | 'false';
	message: string;
	payload: { client_secret: string };
}
// | {
// 		success: 'false';
// 		message: string;
// 		error: string;
//   };
