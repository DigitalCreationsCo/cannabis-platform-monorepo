const fetcher = async (params: string | string[]) => {
	const [url, token] = typeof params === 'string' ? [params] : params;
	const response = await fetch(url, {
		headers: { Authorization: `Bearer ${token}` },
	});
	const json = await response.json();

	if (!response.ok) {
		throw new Error(
			json.error.message || 'An error occurred while fetching the data',
		);
	}

	return json;
};

export default fetcher;
