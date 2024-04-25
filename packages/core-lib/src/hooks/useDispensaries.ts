import useSWR, { mutate } from 'swr';
import fetcher from '../lib/fetcher';
import type { ApiResponse, TeamWithMemberCount } from '../types';

const useDispensaries = () => {
	const url = `/api/dispensary`;

	const { data, error, isLoading } = useSWR<ApiResponse<TeamWithMemberCount[]>>(
		url,
		fetcher,
	);

	const mutateDispensaries = async () => {
		mutate(url);
	};

	return {
		isLoading,
		isError: error,
		dispensaries: data?.data,
		mutateDispensaries,
	};
};

export default useDispensaries;
