import axios from 'axios';
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
            .then(({ status, statusText, ...data }) => {
            // if (status > 399) throw new Error(data);
            setResponseData(data);
            setStatusCode(status);
            setStatusText(statusText);
        })
            .catch((error) => {
            console.log(' useQuery error: ', error);
            // setStatusText();
            // setStatusCode();
        });
    }, [url]);
    return { data: responseData, statusCode };
}
//# sourceMappingURL=useQuery.js.map