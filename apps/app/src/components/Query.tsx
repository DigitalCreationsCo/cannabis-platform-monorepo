import { useQuery } from '@cd/core-lib';
import { AxiosResponse } from 'axios';

export default function Query({
    url,
    children
}: {
    url: string;
    children: ({ data }: { data: AxiosResponse['data'] }) => JSX.Element;
}) {
    const { data, statusCode } = useQuery({ url });
    if (statusCode) return null;
    return children({ data });
}
