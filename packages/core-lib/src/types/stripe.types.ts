import { type OrganizationCreateType } from '@cd/data-access';

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
};
