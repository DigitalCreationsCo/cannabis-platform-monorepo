import * as cheerio from 'cheerio';
import { type DOMDataSet, type DOMKey, type DOMQueryResult } from '../types';
import { getDOMElementsFromConfig } from './crawler-helpers';

export default async function cheerioCrawler(
	config: DOMDataSet[typeof key],
	key: DOMKey,
) {
	try {
		if (typeof window === 'undefined')
			throw new Error('window is not available');
		const _url = window.location.href;
		console.info('crawling url, ', _url);
		const response = await fetch(_url);
		const html = await response.text();
		const $ = cheerio.load(html);
		const data: DOMQueryResult[typeof key] = await getDOMElementsFromConfig(
			config,
			$,
		);
		if (!data) throw new Error('no data found');
		console.log('crawler data: ', data);
		return data;
	} catch (error: any) {
		console.error('error in cheerio crawler: ', error);
		throw new Error(error.message);
	}
}
