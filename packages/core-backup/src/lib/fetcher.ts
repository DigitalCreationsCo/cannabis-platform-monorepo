const fetcher = async (params: string | string[]) => {
	const [url, token] = (
		typeof params === 'string' ? [params] : params
	) as string[];
	const response = await fetch(url as string, {
		headers: { Authorization: `Bearer ${token as string}` },
	});
	const json = await response.json();

	if (!response.ok) {
		throw new Error(
			json.error.message || 'An error occurred while fetching the data'
		);
	}

	return json;
};

export default fetcher;
