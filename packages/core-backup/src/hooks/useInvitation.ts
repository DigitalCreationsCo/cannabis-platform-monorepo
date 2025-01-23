import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import type { ApiResponse } from '../types';

type Response = ApiResponse<any & { team: any }>;

const useInvitation = (token?: string) => {
	const params = useSearchParams();

	const { data, error, isLoading } = useSWR<Response>(() => {
		const inviteToken = token || (params.get("token") || null);
		return inviteToken ? `/api/invitations/${inviteToken}` : null;
	}, fetcher);

	return {
		isLoading,
		error,
		invitation: data?.data,
	};
};

export default useInvitation;
