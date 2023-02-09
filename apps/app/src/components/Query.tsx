import { AxiosResponse } from 'axios';
import { useQuery } from 'hooks';
import Page404 from '../../pages/404';

export default function Query({
    url,
    children,
}: {
    url: string;
    children: ({ data }: { data: AxiosResponse['data'] }) => JSX.Element;
}) {
    const { data, statusCode } = useQuery({ url });
    if (statusCode) return <Page404 code={statusCode} />;

    return children({ data });
}
