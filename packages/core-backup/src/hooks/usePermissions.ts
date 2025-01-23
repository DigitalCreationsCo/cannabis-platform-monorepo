import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import type { Permission } from '../lib/permissions';
import type { ApiResponse } from '../types';

const usePermissions = () => {
	const params = useSearchParams();
	const [teamSlug, setTeamSlug] = useState<string | null>(null);
	const slug = params.get("slug")

	useEffect(() => {
		if (slug) {
			setTeamSlug(slug);
		}
	}, [params, slug]);

	const { data, error, isLoading } = useSWR<ApiResponse<Permission[]>>(
		teamSlug ? `/api/dispensaries/${teamSlug}/permissions` : null,
		fetcher
	);

	return {
		isLoading,
		isError: error,
		permissions: data?.data,
	};
};

export default usePermissions;
