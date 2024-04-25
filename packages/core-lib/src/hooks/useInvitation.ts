import { useRouter } from 'next/router';
import useSWR from 'swr';
import type { ApiResponse } from 'types';
import fetcher from '../lib/fetcher';

type Response = ApiResponse<any & { team: any }>;

const useInvitation = (token?: string) => {
	const { query, isReady } = useRouter();

	const { data, error, isLoading } = useSWR<Response>(() => {
		const inviteToken = token || (isReady ? query.token : null);
		return inviteToken ? `/api/invitations/${inviteToken}` : null;
	}, fetcher);

	return {
		isLoading,
		error,
		invitation: data?.data,
	};
};

export default useInvitation;
