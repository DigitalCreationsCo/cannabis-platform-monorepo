export function resolveHref(
	documentType?: 'home' | 'page' | 'post' | 'project',
	slug?: string,
): string | undefined {
	switch (documentType) {
		case 'home':
			return '/';
		case 'post':
			return slug ? `/blog/posts/${slug}` : undefined;
		case 'page':
			return slug ? `/blog/${slug}` : undefined;
		case 'project':
			return slug ? `/blog/projects/${slug}` : undefined;
		default:
			console.warn('Invalid document type:', documentType);
			return undefined;
	}
}
