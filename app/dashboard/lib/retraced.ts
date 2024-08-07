import type { Dispensary } from '@cd/data-access';
import { Client } from '@retracedhq/retraced';
import type { CRUD, Event } from '@retracedhq/retraced';
import type { User } from 'next-auth';

import env from './env';

type EventType =
	| 'member.invitation.create'
	| 'member.invitation.delete'
	| 'member.remove'
	| 'member.update'
	| 'sso.connection.create'
	| 'sso.connection.patch'
	| 'sso.connection.delete'
	| 'dsync.connection.create'
	| 'dsync.connection.delete'
	| 'webhook.create'
	| 'webhook.delete'
	| 'webhook.update'
	| 'team.create'
	| 'team.update'
	| 'team.delete'
	| 'team.daily_deals.create'
	| 'team.daily_deals.delete'
	| 'team.daily_deals.update'
	| 'team.events.create'
	| 'team.events.read'
	| 'team.events.delete'
	| 'team.events.update'
	| 'team.customers.create'
	| 'team.customers.read'
	| 'team.customers.delete'
	| 'team.customers.update'
	| 'team.customers.import'
	| 'team.customers.export'
	| 'team.customers.sms_subscribe'
	| 'team.customers.sms_unsubscribe';

interface Request {
	action: EventType;
	user: User;
	team: Dispensary;
	crud: CRUD;
}

let retracedClient: Client;

const getRetracedClient = () => {
	if (!env.retraced.apiKey || !env.retraced.projectId || !env.retraced.url) {
		return;
	}

	if (!retracedClient) {
		retracedClient = new Client({
			endpoint: env.retraced.url,
			apiKey: env.retraced.apiKey,
			projectId: env.retraced.projectId,
		});
	}

	return retracedClient;
};

export const sendAudit = async (request: Request) => {
	const retracedClient = getRetracedClient();

	if (!retracedClient) {
		return;
	}

	const { action, user, team, crud } = request;

	const event: Event = {
		action,
		crud,
		group: {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			id: team.id!.toString(),
			name: team.name,
		},
		actor: {
			id: user.id,
			name: user.name!,
		},
		created: new Date(),
	};

	return await retracedClient.reportEvent(event);
};

export const getViewerToken = async (groupId: string, actorId: string) => {
	const retracedClient = getRetracedClient();

	if (!retracedClient) {
		return;
	}

	try {
		return await retracedClient.getViewerToken(groupId, actorId, true);
	} catch (_error) {
		throw new Error(
			'Unable to get viewer token from Retraced. Please check Retraced configuration.'
		);
	}
};
