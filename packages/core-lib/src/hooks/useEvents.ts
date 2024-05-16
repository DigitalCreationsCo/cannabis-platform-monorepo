import { type Event } from '@cd/data-access';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../lib';
import type { ApiResponse } from '../types';

const useEvents = (zipcode?: string) => {
	const { query, isReady } = useRouter();

	const localZip = zipcode || (isReady ? query.zipcode : null);

	// const { data, error, isLoading } = useSWR<ApiResponse<Event>>(
	// 	localZip ? `/api/events?zipcode=${localZip}` : null,
	// 	fetcher,
	// 	{ keepPreviousData: true },
	// );

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

	// fetch events from the eventbrite platform
	// const { data, error, isLoading } = useSWR<ApiResponse<Event>>(
	// 	localZip ? `/api/events?zipcode=${localZip}` : null,
	// 	fetcher,
	// 	{ keepPreviousData: true },
	// );

	const events = [
		{
			name: 'event 1',
		},
		{
			name: 'event 2',
		},
	];

	return {
		// isLoading,
		// isError: error,
		// events: data?.data,
		events,
	};
};

export default useEvents;
