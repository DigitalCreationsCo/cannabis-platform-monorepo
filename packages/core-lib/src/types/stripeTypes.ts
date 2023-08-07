import { type Organization, type UserDispensaryAdmin } from '@cd/data-access';

export type DispensaryCreateStripeAccountPayload = {
	organization: Organization;
	ownerAccount: UserDispensaryAdmin;
};
