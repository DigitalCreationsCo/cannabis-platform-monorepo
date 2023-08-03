import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

// adapt to work client side and ssr, throw errors for failed requests,
// test all cases for api calls
// not working correctly, prefer to use ssr for query calls
export default function useQuery({ url }: { url: string }) {
	const [responseData, setResponseData] = useState<unknown>();
	const [statusCode, setStatusCode] = useState<number>();
	const [statusText, setStatusText] = useState<string>();
	useEffect(() => {
		axios(url)
			.then((response) => response.data)
			.then(({ status, statusText, ...data }: AxiosResponse) => {
				// if (status > 399) throw new Error(data);
				setResponseData(data);
				setStatusCode(status);
				setStatusText(statusText);
			})
			.catch((error) => {
				console.info(' useQuery error: ', error);
				// setStatusText();
				// setStatusCode();
			});
	}, [url]);

	return { data: responseData, statusCode };
}
