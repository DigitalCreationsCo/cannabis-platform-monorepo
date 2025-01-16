import { Alert } from '@/components/shared';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const RedirectPage = () => {
	const router = useRouter();

	useEffect(() => {
		if (!router.isReady) return;

		const { destination, ref, ...otherParams } = router.query as Record<
			string,
			string
		>;

		if (destination) {
			let redirectUrl = destination;
			const params = new URLSearchParams();

			// Add ref parameter if present
			if (ref) params.append('ref', ref);

			// Add UTM parameters
			[
				'utm_source',
				'utm_medium',
				'utm_campaign',
				'utm_term',
				'utm_content',
			].forEach((utm) => {
				if (otherParams[utm]) params.append(utm, otherParams[utm]);
			});

			// Add timestamp
			params.append('timestamp', new Date().toISOString());

			// Add any other custom parameters
			Object.entries(otherParams).forEach(([key, value]) => {
				if (!key.startsWith('utm_')) params.append(key, value);
			});

			// Append parameters to the redirect URL
			redirectUrl +=
				(redirectUrl.includes('?') ? '&' : '?') + params.toString();

			// Log the redirect for server-side tracking (you'd implement this)
			logRedirect(redirectUrl);

			// Redirect after a short delay
			const timer = setTimeout(() => {
				window.location.href = redirectUrl;
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [router.isReady, router.query]);

	// Placeholder function for server-side logging
	const logRedirect = (url) => {
		// In a real implementation, you'd send this data to your server or analytics service
		console.log('Redirect logged:', url);
	};

	if (!router.query.destination) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<Alert
					// variant="destructive"
					className="w-96"
				>
					{/* <AlertTitle>Error</AlertTitle> */}
					Error
					{/* <AlertDescription> */}
					No destination specified. Please include a 'destination' parameter in
					the URL.
					{/* </AlertDescription> */}
				</Alert>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Alert className="w-96">
				{/* <AlertTitle>Redirecting</AlertTitle> */}
				Redirecting
				{/* <AlertDescription> */}
				You are being redirected. If you are not redirected automatically,
				please click{' '}
				<a
					href={router.query.destination as string}
					className="font-medium underline"
				>
					here
				</a>
				.{/* </AlertDescription> */}
			</Alert>
		</div>
	);
};

export default RedirectPage;
