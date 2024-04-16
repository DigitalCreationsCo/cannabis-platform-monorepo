import useSWR, { mutate } from 'swr';
// import type { ApiResponse } from 'types';
import fetcher from '@/lib/fetcher';

// type TeamMemberWithUser = TeamMember & { user: User };

const useDispensaryStaff = (slug: string) => {
	const url = `/api/dispensary/${slug}/members`;

	const { data, error, isLoading } = useSWR(url, fetcher);

	const mutateTeamMembers = async () => {
		mutate(url);
	};

	return {
		isLoading,
		isError: error,
		members: data?.data,
		mutateTeamMembers,
	};
};

export default useDispensaryStaff;
