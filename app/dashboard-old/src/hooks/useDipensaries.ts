import useSWR, { mutate } from 'swr';
// import type { ApiResponse, TeamWithMemberCount } from 'types';
import fetcher from '@/lib/fetcher';

const useDispensaries = () => {
	const url = `/api/teams`;

	const { data, error, isLoading } = useSWR(url, fetcher);

	const mutateTeams = async () => {
		mutate(url);
	};

	return {
		isLoading,
		isError: error,
		teams: data?.data,
		mutateTeams,
	};
};

export default useDispensaries;
