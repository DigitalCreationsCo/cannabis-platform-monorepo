export const loadHotJar = () =>
	typeof window !== 'undefined' &&
	(function (
		h,
		o,
		t,
		j,
		a: HTMLHeadElement | undefined,
		r: HTMLScriptElement | undefined,
	) {
		h.hj =
			h.hj ||
			function (...args: any[]) {
				(h.hj.q = h.hj.q || []).push(...args);
			};
		h._hjSettings = { hjid: 3708421, hjsv: 6 };
		a = o.getElementsByTagName('head')[0];
		r = o.createElement('script');
		r.async = Boolean(1);
		r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
		a.appendChild(r);
	})(
		window,
		document,
		'https://static.hotjar.com/c/hotjar-',
		'.js?sv=',
		undefined,
		undefined,
	);
