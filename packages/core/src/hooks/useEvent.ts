import { type Event } from '@gras/data-access';
import useSWR from 'swr';
import { fetcher } from '../lib';
import type { ApiResponse } from '../types';

const useEvent = (id: string, token: string) => {
	const { data, error, isLoading, mutate } = useSWR<ApiResponse<Event>>(
		[`/api/events/${id}`, token],
		fetcher,
		{ keepPreviousData: true }
	);

	return {
		isLoading,
		isError: error,
		events: (data?.data as Event) || [],
		mutateEvent: mutate,
	};
};

export default useEvent;
