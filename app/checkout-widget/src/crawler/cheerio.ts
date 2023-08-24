import * as cheerio from 'cheerio';
import { type DOMSelector } from '../types';
import { getDOMElementsFromConfig } from './crawler-helpers';

export default async function cheerioCrawler(config: DOMSelector) {
	try {
		if (typeof window === 'undefined')
			throw new Error('window is not available');
		const _url = window.location.href;
		console.info('crawling url, ', _url);
		const response = await fetch(_url);
		const html = await response.text();
		const $ = cheerio.load(html);
		return await getDOMElementsFromConfig(config, $);
	} catch (error) {
		console.error('error in cheerio crawler: ', error);
		return null;
	}
}
