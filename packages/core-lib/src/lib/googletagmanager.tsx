export const loadGoogleTagManager = () => {
	return (
		typeof window !== 'undefined' &&
		(function (w, d, s: 'script', l: 'dataLayer', i: string) {
			w[l] = w[l] || [];
			// eslint-disable-next-line @typescript-eslint/naming-convention
			w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
			const f = d.getElementsByTagName(s)[0],
				j = d.createElement(s),
				dl = l != 'dataLayer' ? '&l=' + l : '';
			j.async = true;
			j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
			f.parentNode?.insertBefore(j, f);
		})(window, document, 'script', 'dataLayer', 'GTM-WC46C5C2')
	);
};

export const GTMTag = () => {
	return (
		<noscript>
			<iframe
				title="google-tag-manager-noscript"
				src="https://www.googletagmanager.com/ns.html?id=GTM-WC46C5C2"
				height="0"
				width="0"
				style={{
					display: 'none',
					visibility: 'hidden',
				}}
			></iframe>
		</noscript>
	);
};
