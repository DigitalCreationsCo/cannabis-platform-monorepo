export function resolveHref(
	documentType?: 'home' | 'page' | 'post' | 'project',
	slug?: string,
): string | undefined {
	switch (documentType) {
		case 'home':
			return '/';
		case 'post':
			return slug ? `/post/${slug}` : undefined;
		case 'page':
			return slug ? `/${slug}` : undefined;
		case 'project':
			return slug ? `/projects/${slug}` : undefined;
		default:
			console.warn('Invalid document type:', documentType);
			return undefined;
	}
}
