import {
	createClient,
	type SanityClient,
	type SanityDocument,
} from 'next-sanity';
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
	type Settings,
	nonPublishedPostsQuery,
	postByIdQuery,
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
	slug: string
): Promise<Post> {
	return await client.fetch(postBySlugQuery, {
		slug,
	});
}

export async function getPostById(
	client: SanityClient,
	_id: string
): Promise<Post> {
	return await client.fetch(postByIdQuery, {
		_id,
	});
}

export async function getPostAndMoreStories(
	client: SanityClient,
	slug: string
): Promise<{ post: Post; morePosts: Post[] }> {
	return await client.fetch(postAndMoreStoriesQuery, { slug });
}

export async function getCategories(client: SanityClient): Promise<string[]> {
	return await client.fetch(categoryStringsQuery);
}

export async function getNonPublishedPosts(
	client: SanityClient,
	count: number
): Promise<Post[]> {
	return await client.fetch(nonPublishedPostsQuery, { count });
}

export async function setPostPublishedInNewsletter(
	client: SanityClient,
	postId: string
): Promise<Post> {
	return await client
		.patch(postId)
		.set({ isPublishedInNewsLetter: true })
		.commit<Post>();
}

export async function setPostPublishedToSocialMedia(
	client: SanityClient,
	postId: string
): Promise<Post> {
	return await client
		.patch(postId)
		.set({ isPublishedToSocialMedia: true })
		.commit<Post>();
}

export async function setContentUrl(
	client: SanityClient,
	document: SanityDocument
): Promise<Post> {
	const contentUrl = `https://grascannabis.org/blog/posts/${document.slug.current}`;
	const patched = await client
		.patch(document._id)
		.set({ contentUrl })
		.commit<Post>();
	return patched;
}
