export const useCdn = false;

/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

export const dataset = assertValue(
	process.env.NEXT_PUBLIC_SANITY_DATASET,
	'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId = assertValue(
	process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
);

export const readToken = process.env.SANITY_API_DRAFT_TOKEN || '';

export const apiVersion =
	process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-21';

export const DRAFT_MODE_ROUTE = '/api/blog/draft-mode/enable';
export const studioUrl = '/blog/studio';

function assertValue<T>(v: T | undefined, errorMessage: string): T {
	if (v === undefined) {
		throw new Error(errorMessage);
	}

	return v;
}
