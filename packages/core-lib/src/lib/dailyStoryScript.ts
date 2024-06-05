/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const loadBrevoChat = () =>
	typeof window !== 'undefined' &&
	(function (
		d,
		a,
		i,
		l,
		ye,
		s,
		t,
		o?: HTMLScriptElement | undefined,
		r?: HTMLScriptElement | undefined,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		y,
	) {
		d._dsSettings = i;
		r = a.createElement('script');
		o = a.getElementsByTagName('script')[0];
		r.src = '//us-1.dailystory.com/ds/ds' + i + '.js';
		r.async = true;
		r.id = 'ds-sitescript';
		o.parentNode!.insertBefore(r, o);
	})(window, document, 'driilnbagyzhfydo');
