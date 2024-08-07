import { type Dispensary } from '@cd/data-access';

/* eslint-disable @typescript-eslint/naming-convention */
interface ApiError {
	code: number;
	message: string;
	values: Record<string, string>;
}

export type ApiResponse<T = unknown> =
	| {
			data: T;
			error: never;
	  }
	| {
			data: never;
			error: ApiError;
	  };

export type TeamWithMemberCount = Dispensary & {
	_count: {
		members: number;
	};
};

export interface WebookFormSchema {
	name: string;
	url: string;
	eventTypes: string[];
}

export type AppEvent =
	| 'invitation.created'
	| 'invitation.removed'
	| 'invitation.fetched'
	| 'member.created'
	| 'member.removed'
	| 'member.left'
	| 'member.fetched'
	| 'member.role.updated'
	| 'user.password.updated'
	| 'user.password.request'
	| 'user.updated'
	| 'user.signup'
	| 'user.password.reset'
	| 'team.fetched'
	| 'team.created'
	| 'team.updated'
	| 'team.removed'
	| 'apikey.created'
	| 'apikey.removed'
	| 'apikey.fetched'
	| 'apikey.removed'
	| 'webhook.created'
	| 'webhook.removed'
	| 'webhook.fetched'
	| 'webhook.updated'
	| 'event.fetched'
	| 'event.comment.created'
	| 'event.rsvp.created'
	| 'dispensaries.fetched'
	| 'dispensary.dailyDeal.fetched'
	| 'dispensary.dailyDeal.created'
	| 'dispensary.dailyDeal.updated'
	| 'dispensary.dailyDeal.sent'
	| 'dispensary.dailyDeal.removed'
	| 'dispensary.customers.fetched'
	| 'dispensary.customers.removed'
	| 'dispensary.customer.fetched'
	| 'dispensary.customer.created'
	| 'dispensary.customer.updated'
	| 'dispensary.customer.removed'
	| 'dispensary.customer.invited'
	| 'dispensary.customer.sms_subscribed'
	| 'dispensary.customer.sms_unsubscribed'
	| 'dispensary.event.fetched'
	| 'dispensary.event.created'
	| 'dispensary.event.updated'
	| 'dispensary.event.removed';

export type AUTH_PROVIDER =
	| 'github'
	| 'google'
	| 'saml'
	| 'email'
	| 'credentials'
	| 'idp-initiated';

export interface TeamFeature {
	sso: boolean;
	dsync: boolean;
	auditLog: boolean;
	webhook: boolean;
	apiKey: boolean;
	payments: boolean;
	deleteTeam: boolean;
}
