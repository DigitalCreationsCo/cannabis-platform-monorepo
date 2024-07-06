import { CronJobApi, axios } from '@cd/core-lib';
import { type Event, getEvents, updateManyEvents } from '@cd/data-access';
import * as cheerio from 'cheerio';
import type { NextApiRequest, NextApiResponse } from 'next';
import { clientPromise } from '@/lib/db';
import env from '@/lib/env';
import { recordMetric } from '@/lib/metrics';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;
	try {
		switch (method) {
			case 'GET':
				await handleGET(req, res);
				break;
			case 'PUT':
				await handlePUT(req, res);
				break;
			// case 'PATCH':
			// 	await handlePATCH(req, res);
			// 	break;
			default:
				// res.setHeader('Allow', 'GET, PUT, PATCH');
				res.setHeader('Allow', 'GET, PUT');
				res.status(405).json({
					error: { message: `Method ${method} Not Allowed` },
				});
		}
	} catch (error: any) {
		const message = error.message || 'Something went wrong';
		const status = error.status || 500;
		console.error('api/events: ', message);
		res.status(status).json({ error: { message } });
	}
}

// Get cannabis events
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = await clientPromise;
	const { zipcode, radius } = req.query as { zipcode: string; radius: string };
	// const { location = 'ny--new-york', query = 'cannabis' } = req.query;
	const clientToken = req.headers.authorization?.split(' ')[1];
	const token = env.nextAuth.secret;
	if (clientToken !== token) {
		throw new Error('Unauthorized');
	}
	const events = await getEvents({ client, zipcode, radius: Number(radius) });
	recordMetric('event.fetched');
	res.status(200).json({ data: events });
};

// save events from eventbrite search
const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = await clientPromise;
	const {
		location = 'ny--new-york',
		query = 'cannabis',
		create_cron = false,
	} = req.query as {
		location: string;
		query: string;
		create_cron: string;
	};
	const clientToken = req.headers.authorization?.split(' ')[1];
	const token = env.nextAuth.secret;
	if (clientToken !== token) {
		throw new Error('Unauthorized');
	}
	// get cannabis events from eventbrite platform
	const response = await axios(
		`https://www.eventbrite.com/d/${location}/${query}/`
	);
	if (response.status !== 200)
		return res
			.status(500)
			.json({ error: { message: 'Failed to fetch events' } });
	const $ = cheerio.load(response.data);
	let events: Event[] = [];
	$('script').each((index, element) => {
		const scriptContent = $(element).html();
		if (scriptContent?.includes('window.__SERVER_DATA__')) {
			const regex = /window\.__SERVER_DATA__\s*=\s*(\{.*?\});/;
			const match = scriptContent.match(regex);
			if (match?.[1]) {
				events = JSON.parse(match[1]).search_data.events.results;
			}
		}
	});
	const { ok, matchedCount, modifiedCount, hasWriteErrors, upsertedCount } =
		await updateManyEvents({ client, data: [...events] });

	if (create_cron) {
		await CronJobApi.createGetEventsByLocationJob(location);
	}

	res.status(200).json({
		ok,
		matchedCount,
		modifiedCount,
		hasWriteErrors,
		upsertedCount,
	});
};
