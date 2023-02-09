import { useQuery } from 'hooks';
import Page404 from '../../pages/404';

export default function Query({ url, children }: { url: string; children: Function }) {
    const { data, statusCode } = useQuery({ url });

    if (statusCode === 404) {
        return <Page404 code={statusCode} />;
    }

    return children({ data });
}
