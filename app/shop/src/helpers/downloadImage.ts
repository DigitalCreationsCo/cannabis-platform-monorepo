import { axios } from '@cd/core-lib';

export async function downloadImage(url: string) {
	const response = await axios({
		url,
		method: 'GET',
		responseType: 'arraybuffer',
	});
	console.info('download iamge response ', response.data);
	return new Promise((resolve, reject) => {
		console.info('download iamge response.data ', response.data);
		resolve(response.data);
	});
}
