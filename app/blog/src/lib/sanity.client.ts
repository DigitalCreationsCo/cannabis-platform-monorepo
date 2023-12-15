import { createClient, type SanityClient } from 'next-sanity';
import { type Settings } from 'sanity';
import {
	apiVersion,
	dataset,
	projectId,
	studioUrl,
	useCdn,
} from './sanity.api';
import {
	type Post,
	postsQuery,
	postSlugsQuery,
	postBySlugQuery,
	categoryStringsQuery,
	settingsQuery,
	postAndMoreStoriesQuery,
} from './sanity.queries';

export function getClient(preview?: { token: string }): SanityClient {
	const client = createClient({
		projectId,
		dataset,
		apiVersion,
		useCdn,
		perspective: 'published',
		encodeSourceMap: preview?.token ? true : false,
		studioUrl,
	});
	if (preview) {
		if (!preview.token) {
			throw new Error('You must provide a token to preview drafts');
		}
		return client.withConfig({
			token: preview.token,
			useCdn: false,
			ignoreBrowserTokenWarning: true,
			perspective: 'previewDrafts',
		});
	}
	return client;
}

export const getSanityImageConfig = () => getClient();

export async function getSettings(client: SanityClient): Promise<Settings> {
	return (await client.fetch(settingsQuery)) || {};
}

export async function getPosts(client: SanityClient): Promise<Post[]> {
	return await client.fetch(postsQuery);
}

export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
	const client = getClient();
	const slugs = (await client.fetch<string[]>(postSlugsQuery)) || [];
	return slugs.map((slug) => ({ slug }));
}

export async function getPostBySlug(
	client: SanityClient,
	slug: string,
): Promise<Post> {
	return await client.fetch(postBySlugQuery, {
		slug,
	});
}

export async function getPostAndMoreStories(
	client: SanityClient,
	slug: string,
): Promise<{ post: Post; morePosts: Post[] }> {
	return await client.fetch(postAndMoreStoriesQuery, { slug });
}

export async function getCategories(client: SanityClient): Promise<string[]> {
	return await client.fetch(categoryStringsQuery);
}
