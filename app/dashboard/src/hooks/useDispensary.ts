import useSWR from 'swr';
// import type { ApiResponse } from 'types';
import fetcher from '@/lib/fetcher';

const useDispensary = (slug: string | undefined) => {
	const url = `/api/teams/${slug}`;

	const { data, error, isLoading } = useSWR(slug ? url : null, fetcher);

	return {
		isLoading,
		isError: error,
		team: data?.data,
	};
};

export default useDispensary;
