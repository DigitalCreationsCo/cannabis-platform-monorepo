import { createClient } from 'next-sanity';
import { QueryParams, type SanityClient } from 'sanity';
import {
	apiVersion,
	dataset,
	studioUrl,
	projectId,
	useCdn,
	readToken as token
} from './sanity.api';
import {
	type Post,
	postsQuery,
	postSlugsQuery,
	postBySlugQuery,
	categoryStringsQuery,
	settingsQuery,
	postAndMoreStoriesQuery,
	type Settings,
	nonPublishedPostsQuery,
	postByIdQuery,
	businessPostsQuery,
	businessPostSlugsQuery,
	businessPostAndMoreStoriesQuery,
} from './sanity.queries';

export function getClient(preview?: { token: string }): SanityClient {
	const client = createClient({
		projectId,
		dataset,
		apiVersion,
		useCdn,
		perspective: 'published',
		resultSourceMap: preview?.token ? true : false,
		stega: {
			enabled: true,
			studioUrl,
		},
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

export async function getSettings(): Promise<Settings> {
	return (await getClient({ token }).fetch(settingsQuery)) || {};
}

export async function getPosts(): Promise<Post[]> {
	return await getClient({ token }).fetch(postsQuery);
}

export async function getBusinessPosts(): Promise<Post[]> {
	return await getClient({ token }).fetch(businessPostsQuery);
}

export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
	const slugs = (await getClient({ token }).fetch<string[]>(postSlugsQuery)) || [];
	return slugs.map((slug) => ({ slug }));
}

export async function getBusinessPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
	const slugs = (await getClient({ token }).fetch<string[]>(businessPostSlugsQuery)) || [];
	return slugs.map((slug) => ({ slug }));
}

export async function getPostBySlug(
	params: QueryParams
): Promise<Post> {
	return await getClient({ token }).fetch(postBySlugQuery, params);
}

export async function getPostById(
	_id: string
): Promise<Post> {
	return await getClient({ token }).fetch(postByIdQuery, {
		_id,
	});
}

export async function getPostAndMoreStories(
	params: QueryParams
): Promise<{ post: Post; morePosts: Post[] }> {
	return await getClient({ token }).fetch(postAndMoreStoriesQuery, params);
}

export async function getBusinessPostAndMoreStories(
	slug: string
): Promise<{ post: Post; morePosts: Post[] }> {
	return await getClient({ token }).fetch(businessPostAndMoreStoriesQuery, { slug });
}

export async function getCategories(): Promise<string[]> {
	return await getClient({ token }).fetch(categoryStringsQuery);
}

export async function getNonPublishedPosts(
	count: number
): Promise<Post[]> {
	return await getClient({ token }).fetch(nonPublishedPostsQuery, { count });
}

export async function setPostPublishedInNewsletter(
	postId: string
): Promise<Post> {
	return await getClient({ token })
		.patch(postId)
		.set({ isPublishedInNewsLetter: true })
		.commit<Post>();
}

export async function setPostPublishedToSocialMedia(
	postId: string
): Promise<Post> {
	return await getClient({ token })
		.patch(postId)
		.set({ isPublishedToSocialMedia: true })
		.commit<Post>();
}

export async function setContentUrl(
	document: any,
	postsPath = 'posts'
): Promise<Post> {
	const contentUrl = `https://gras.live/blog/${postsPath}/${document?.slug.current}`;
	return await getClient({ token }).patch(document._id).set({ contentUrl }).commit<Post>();
}
