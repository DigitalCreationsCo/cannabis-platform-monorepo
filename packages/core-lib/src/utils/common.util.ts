const domainRegex =
	/(?:[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?\.)+[a-z\d][a-z\d-]{0,61}[a-z\d]/;

export const isValidDomain = (domain: string) => {
	return domainRegex.test(domain);
};

export const copyToClipboard = (text: string) => {
	navigator.clipboard.writeText(text);
};

export const defaultHeaders = {
	'Content-Type': 'application/json',
};

export const passwordPolicies = {
	minLength: 8,
};

// List of events used to create webhook endpoint
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

import { randomBytes } from 'crypto';
import type { NextApiRequest } from 'next';

// Function to force consume the response body to avoid memory leaks
export const forceConsume = async (response: any) => {
	try {
		await response.text();
	} catch (error) {
		// Do nothing
	}
};

// Create token
export function generateToken(length = 64) {
	const tokenBytes = randomBytes(Math.ceil(length / 2)); // Convert length from bytes to hex

	return tokenBytes.toString('hex').slice(0, length);
}

// Fetch the auth token from the request headers
export const extractAuthToken = (req: NextApiRequest): string | null => {
	const authHeader = req.headers.authorization || null;

	return authHeader ? authHeader.split(' ')[1] : null;
};

export const validateEmail = (email: string): boolean => {
	const re = /\S[^\s@]*@\S+\.\S+/;
	return re.test(email);
};

export const slugify = (text: string) => {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w-]+/g, '') // Remove all non-word chars
		.replace(/-{2,}/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text
};
