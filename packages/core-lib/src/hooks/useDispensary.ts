import { type Dispensary } from '@cd/data-access/src';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../lib';
import type { ApiResponse } from '../types';

const useDispensary = (slug?: string) => {
	const { query, isReady } = useRouter();

	const dispensarySlug = slug || (isReady ? query.slug : null);

	const { data, error, isLoading } = useSWR<ApiResponse<Dispensary>>(
		dispensarySlug ? `/api/dispensaries/${dispensarySlug}` : null,
		fetcher
	);

	return {
		isLoading,
		isError: error,
		team: data?.data,
	};
};

export default useDispensary;
