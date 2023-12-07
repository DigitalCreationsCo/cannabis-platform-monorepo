import { Page } from '@cd/ui-lib';
import router from 'next/router';

function Fleet() {
	const API_KEY = '';
	return (
		<Page>
			Fleet Tracking
			<>
				{typeof window !== 'undefined' &&
					router.isReady &&
					(() => {
						const script = document.createElement('script');
						script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initializeJourneySharing&v=beta&libraries=journeySharing`;
						script.defer = true;
						document.head.appendChild(script);
					})()}
			</>
		</Page>
	);
}

export default Fleet;
