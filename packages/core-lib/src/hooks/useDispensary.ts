import { type Dispensary } from '@cd/data-access/src';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import type { ApiResponse } from 'types';
import fetcher from '../lib/fetcher';

const useDispensary = (slug?: string) => {
	const { query, isReady } = useRouter();

	const dispensarySlug = slug || (isReady ? query.slug : null);

	const { data, error, isLoading } = useSWR<ApiResponse<Dispensary>>(
		dispensarySlug ? `/api/dispensary/${dispensarySlug}` : null,
		fetcher,
	);

	return {
		isLoading,
		isError: error,
		team: data?.data,
	};
};

export default useDispensary;
