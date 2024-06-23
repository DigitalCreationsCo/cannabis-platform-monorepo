import { type Event } from '@cd/data-access';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import { fetcher } from '../lib';
import type { ApiResponse } from '../types';
import { isValidZipcode } from '../utils/geo.util';

const useEvents = ({ zipcode, token, radius = 10000 }: { zipcode?: string; token: string; radius:any }) => {
	const { query, isReady } = useRouter();

	const localZip = zipcode || (isReady ? query.zipcode : null) as string;

	const { data, error, isLoading } = useSWR<ApiResponse<Event[]>>(
		[
			isValidZipcode(localZip) ? `/api/events?zipcode=${localZip}&radius=${radius}` : null,
			token,
		],
		fetcher
	);

	// async function fetchEvents(eventIds) {
	// 	const eventPromises = eventIds.map(eventId =>
	// 		fetch(`https://www.eventbriteapi.com/v3/events/${eventId}`, {
	// 			headers: {
	// 				'Authorization': 'Bearer YOUR_EVENTBRITE_API_KEY'
	// 			}
	// 		})
	// 		.then(response => {
	// 			if (!response.ok) {
	// 				throw new Error(`Failed to fetch event ${eventId}: ${response.status}`);
	// 			}
	// 			return response.json();
	// 		})
	// 		.catch(error => {
	// 			console.error(`Error fetching event ${eventId}:`, error);
	// 			return null; // Returning null for failed requests
	// 		})
	// 	);
	// 	try {
	// 		const events = await Promise.all(eventPromises);
	// 		return events.filter(event => event !== null); // Filtering out null responses
	// 	} catch (error) {
	// 		console.error('Error fetching events:', error);
	// 		return []; // Returning an empty array in case of error
	// 	}
	// }

	return {
		isLoading,
		isError: error,
		events: data?.data as unknown as Event[] || [],
		mutate,
	};
};

export default useEvents;
