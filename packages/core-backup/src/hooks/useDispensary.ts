import { type Dispensary } from '@gras/data-access/src';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '../lib';
import type { ApiResponse } from '../types';

const useDispensary = (slug?: string) => {
	const r = useRouter();
	const params = useSearchParams()

	const dispensarySlug = slug || params.get('slug') || null;

	const { data, error, isLoading } = useSWR<ApiResponse<Dispensary>>(
		dispensarySlug ? `/api/dispensaries/${dispensarySlug}` : null,
		fetcher
	);

	return {
		isLoading,
		isError: error,
		team: data?.data as Dispensary,
	};
};

export default useDispensary;
