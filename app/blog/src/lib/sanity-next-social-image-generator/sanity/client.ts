import sanityClient from '@sanity/client';

export const getClient = (
	dataset: string,
	projectId: string,
	apiVersion: string,
	token: string,
	useCdn = false,
) =>
	sanityClient({
		dataset,
		projectId,
		apiVersion,
		token,
		useCdn,
	});
