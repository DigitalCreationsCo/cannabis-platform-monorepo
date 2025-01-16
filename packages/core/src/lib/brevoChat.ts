export const loadBrevoChat = () =>
	typeof window !== 'undefined' &&
	(function (d, w, c: 'BrevoConversations') {
		w.BrevoConversationsID = process.env.NEXT_PUBLIC_BREVO_CONVERSATIONS_ID;
		w[c] =
			w[c] ||
			function (...args: any[]) {
				(w[c].q = w[c].q || []).push(...args);
			};
		const s = d.createElement('script');
		s.async = true;
		s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
		if (d.head) d.head.appendChild(s);
	})(document, window, 'BrevoConversations');
