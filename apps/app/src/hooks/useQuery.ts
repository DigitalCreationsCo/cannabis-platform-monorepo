import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useErrorStatus } from '../context/ErrorHandler';

// adapt to work client side and ssr, throw errors for failed requests,
// test all cases for api calls

export default function useQuery({ url }) {
    // const { setErrorStatusCode } = useErrorStatus();
    const [responseData, setResponseData] = useState();

    console.log('use query');
    useEffect(() => {
        try {
            axios(url)
                .then((response) => response.data)
                .then(({ code, status, ...data }) => {
                    console.log('useQuery response code: ', code);
                    console.log('useQuery response status: ', status);
                    console.log('useQuery message: ', data);
                    if (code > 399) {
                        // setErrorStatusCode(code);
                    } else {
                        setResponseData(data);
                    }
                });
        } catch (error) {
            // setErrorStatusCode(500);
            console.log(' useQuery error: ', error.message);
        }
    }, [url]);

    return { data: responseData };
}
