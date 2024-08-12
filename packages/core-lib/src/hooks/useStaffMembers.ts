import { type StaffMember } from '@cd/data-access/src';
import useSWR, { mutate } from 'swr';
import fetcher from '../lib/fetcher';
import type { ApiResponse } from '../types';

const useStaffMembers = (slug: string) => {
	const url = `/api/dispensaries/${slug}/members`;

	const { data, error, isLoading } = useSWR<ApiResponse<StaffMember[]>>(
		url,
		fetcher
	);

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

export default useStaffMembers;
