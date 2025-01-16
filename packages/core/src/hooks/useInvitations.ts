import useSWR, { mutate } from 'swr';

import fetcher from '../lib/fetcher';
import type { ApiResponse } from '../types';

interface Props {
	slug: string;
	sentViaEmail: boolean;
}

const useInvitations = ({ slug, sentViaEmail }: Props) => {
	const url = `/api/dispensaries/${slug}/invitations?sentViaEmail=${sentViaEmail}`;

	const { data, error, isLoading } = useSWR<ApiResponse<any[]>>(url, fetcher);

	const mutateInvitation = async () => {
		mutate(url);
	};

	return {
		isLoading,
		isError: error,
		invitations: data?.data,
		mutateInvitation,
	};
};

export default useInvitations;
