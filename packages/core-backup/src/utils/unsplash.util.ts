/* eslint-disable @typescript-eslint/naming-convention */
import { axios } from '../axiosInstance';

async function searchUnsplashPhotoByKeyword(
	searchTerms: string
): Promise<any[]> {
	try {
		const response = await axios(
			`${process.env.UNSPLASH_URL}/search/photos?query=${searchTerms}&orientation=squarish&per_page=1`,
			{
				headers: {
					Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
					'Accept-Encoding': 'gzip,deflate,compress',
				},
			}
		);

		console.info('results: ', response.data.results);
		return response.data.results;
	} catch (error) {
		console.error('searchUnsplashPhotoByKeyword: ', error.message);
		throw new Error(error.message);
	}
}

async function triggerUnsplashDownload(
	downloadLocationEndpoint: string
) {
	try {
		const response = await axios(downloadLocationEndpoint, {
			headers: {
				Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
				'Accept-Encoding': 'gzip,deflate,compress',
			},
		});
		console.info('triggerUnsplashDownload: ', response.data);
		return response.data;
	} catch (error) {
		console.error('triggerUnsplashDownload: ', error.message);
		throw new Error(error.message);
	}
}

export {
	searchUnsplashPhotoByKeyword,
	triggerUnsplashDownload
}