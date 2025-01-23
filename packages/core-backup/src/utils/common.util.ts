import { randomBytes } from 'crypto';
import type { NextApiRequest } from 'next'

const domainRegex =
	/(?:[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?\.)+[a-z\d][a-z\d-]{0,61}[a-z\d]/;

const isValidDomain = (domain: string) => {
	return domainRegex.test(domain);
};

const copyToClipboard = (text: string) => {
	navigator.clipboard.writeText(text);
};

const passwordPolicies = {
	minLength: 8,
};

// List of events used to create webhook endpoint
const eventTypes = [
	'member.created',
	'member.removed',
	'invitation.created',
	'invitation.removed',
];

const maxLengthPolicies = {
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


// Function to force consume the response body to avoid memory leaks
const forceConsume = async (response: any) => {
	try {
		await response.text();
	} catch (error) {
		// Do nothing
	}
};

// Create token
function generateToken(length = 64) {
	const tokenBytes = randomBytes(Math.ceil(length / 2)); // Convert length from bytes to hex

	return tokenBytes.toString('hex').slice(0, length);
}

// Fetch the auth token from the request headers
const extractAuthToken = (req: NextApiRequest): string | null => {
	return req.headers.authorization?.split(' ')[1] ?? null;
};

const validateEmail = (email: string): boolean => {
	const re = /\S[^\s@]*@\S+\.\S+/;
	return re.test(email);
};

const slugify = (text: string) => {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w-]+/g, '') // Remove all non-word chars
		.replace(/-{2,}/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text
};

function getFirstErrorOrNull(errors: Record<string, any>) {
	const listErrors = Object.values(errors);
	return listErrors.length > 0 ? listErrors[0].toString() : null;
}

export { 
	isValidDomain,
	copyToClipboard,
	passwordPolicies,
	eventTypes,
	maxLengthPolicies,
	forceConsume,
	generateToken,
	extractAuthToken,
	validateEmail,
	slugify,
	getFirstErrorOrNull
}