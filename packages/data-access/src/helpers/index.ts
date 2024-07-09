export const eventTypes = [
	'member.created',
	'member.removed',
	'invitation.created',
	'invitation.removed',
];

export const maxLengthPolicies = {
	name: 104,
	nameShortDisplay: 20,
	email: 254,
	password: 128,
	team: 50,
	slug: 50,
	domain: 253,
	domains: 1024,
	apiKeyName: 64,
	webhookDescription: 100,
	webhookEndpoint: 2083,
	memberId: 64,
	eventType: 50,
	eventTypes: eventTypes.length,
	endpointId: 64,
	inviteToken: 64,
	expiredToken: 64,
	invitationId: 64,
	sendViaEmail: 10,
};

export const normalizeUser = (user: any) => {
	if (user?.name) {
		user.name = user.name.substring(0, maxLengthPolicies.name);
	}

	if (!user.image) {
		user.image = '';
	}

	return user;
};
