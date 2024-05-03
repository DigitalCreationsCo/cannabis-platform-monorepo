/* eslint-disable @typescript-eslint/naming-convention */
type OrganizationCreateType = any;

export type DispensaryCreateStripeAccountPayload = {
	organization: OrganizationCreateType;
	email: string;
};

export type DispensaryConnectStripeAccountPayload = {
	organization: OrganizationCreateType;
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
