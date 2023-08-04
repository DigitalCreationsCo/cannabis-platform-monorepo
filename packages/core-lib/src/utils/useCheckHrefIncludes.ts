function useCheckHrefIncludes(href: string) {
	if (typeof window !== 'undefined') return window.location.href.includes(href);
	else return false;
}

export { useCheckHrefIncludes };
