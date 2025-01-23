import { type Dispensary } from '@gras/data-access';
import { useSearchParams } from 'next/navigation';
import useSWR, { mutate } from 'swr';
import fetcher from '../lib/fetcher';
import type { ApiResponse } from '../types';
import { isValidZipcode } from '../utils/geo.util';

const useDispensaries = ({
	zipcode,
	radius = 15000,
	token,
}: {
	zipcode?: string;
	radius: number;
	token: string;
}) => {
	const params = useSearchParams()

	const localZip = (zipcode || params.get("zipcode") || "");

	const { error, isLoading, data } = useSWR<ApiResponse>(
		[
			isValidZipcode(localZip)
				? `/api/dispensaries?zipcode=${localZip}&limit=${16}&radius=${radius}`
				: null,
			token,
		],
		fetcher,
		{ keepPreviousData: true }
	);

	const mutateDispensaries = async () => {
		mutate<Required<Dispensary>>([localZip, radius]);
	};

	return {
		isLoading,
		isError: error,
		dispensaries: (data?.data as Required<Dispensary>[]) || [],
		mutateDispensaries,
	};
};

export default useDispensaries;
