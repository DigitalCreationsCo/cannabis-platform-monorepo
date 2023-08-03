import { useQuery } from '@cd/core-lib';
import { type AxiosResponse } from 'axios';
import Page404 from '../pages/404';

export default function Query({
	url,
	children,
}: {
	url: string;
	children: AxiosResponse['data'];
}) {
	const { data, statusCode } = useQuery({ url });
	if (statusCode) return <Page404 code={statusCode} />;

	return children({ data });
}
