import axios from 'axios';
import { useEffect, useState } from 'react';

// adapt to work client side and ssr, throw errors for failed requests,
// test all cases for api calls

export default function useQuery({ url }) {
    const [responseData, setResponseData] = useState();
    const [statusCode, setStatusCode] = useState();
    console.log('use query');
    useEffect(() => {
        axios(url)
            .then((response) => response.data)
            .then((data) => {
                // console.log('useQuery response code: ', code);
                // console.log('useQuery response status: ', status);
                console.log('useQuery data: ', data);
                // if (code > 399) setErrorStatusCode(code);
                setResponseData(data);
            })
            .catch((error) => {
                console.log(' useQuery error: ', error.message);
                throw new Error(error.message);
            });
    }, [url]);

    return { data: responseData, statusCode };
}
