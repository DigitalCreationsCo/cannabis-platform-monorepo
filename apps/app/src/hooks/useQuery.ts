import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

// adapt to work client side and ssr, throw errors for failed requests,
// test all cases for api calls
// not working correctly, prefer to use ssr for query calls
export default function useQuery({ url }) {
    const [responseData, setResponseData] = useState();
    const [statusCode, setStatusCode] = useState();
    const [statusText, setStatusText] = useState();
    useEffect(() => {
        axios(url)
            .then((response) => response.data)
            .then(({ status, statusText, ...data }): AxiosResponse => {
                if (status > 399) throw new Error(data);
                setResponseData(data);
            })
            .catch((error) => {
                console.log(' useQuery error: ', error);
                setStatusText(data);
                setStatusCode();
            });
    }, [url]);

    return { data: responseData, statusCode };
}
