import axios from 'axios';
import { useEffect, useState } from 'react';
import { useErrorStatus } from '../context/ErrorHandler';

export default function useQuery({ url }) {
    const { setErrorStatusCode } = useErrorStatus();
    const [apiData, setApiData] = useState();

    useEffect(() => {
        axios(url)
            .then((response) => response.data)
            .then(({ code, status, ...apiData }) => {
                if (code > 400) {
                    setErrorStatusCode(400);
                } else {
                    setApiData(apiData);
                }
            });
    }, [url]);

    return { data: apiData };
}
