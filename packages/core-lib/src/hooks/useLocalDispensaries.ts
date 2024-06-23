import { type Dispensary } from '@cd/data-access';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import fetcher from '../lib/fetcher';
import type { ApiResponse } from '../types';
import { isValidZipcode } from '../utils/geo.util';

const useDispensaries = ({
	zipcode,
	radius = 11000,
	token,
}: {
	zipcode?: string;
	radius: number;
	token: string;
}) => {
	const { query, isReady } = useRouter();
	const localZip = (zipcode || (isReady ? query.zipcode : null)) as string;

	const { error, isLoading, data } = useSWR<ApiResponse>(
		[
			isValidZipcode(localZip)
				? `/api/dispensaries?zipcode=${localZip}&limit=${16}&radius=${radius}`
				: null,
			token,
		],
		fetcher
	);

	const mutateDispensaries = async () => {
		mutate<Required<Dispensary>>([localZip, radius]);
	};

	return {
		isLoading,
		isError: error,
		dispensaries: data?.data as Required<Dispensary>[] || [],
		mutateDispensaries,
	};
};

export default useDispensaries;
