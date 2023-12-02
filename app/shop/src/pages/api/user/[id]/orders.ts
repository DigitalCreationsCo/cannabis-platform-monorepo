import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import nc from 'next-connect';
import supertokens from 'supertokens-node';
import { type SessionRequest } from 'supertokens-node/framework/express';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import Session from 'supertokens-node/recipe/session';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { backendConfig } from '@config';
import { wrapper } from '@redux';

supertokens.init(backendConfig());
// const handler = nc();
// get orders from a single user
// handler.get(async (req: SessionRequest, res: any) => {

async function handler(req: SessionRequest, res: any) {
	await wrapper.getServerSideProps(req, res);
	try {
		console.log('req ', req);
		const session = await superTokensNextWrapper(
			async (next) => {
				return await Session.getSession(req, res);
			},
			req,
			res,
		);
		console.info('session: ', session);
		res.setHeader('Cache-Control', 'public, s-maxage=120');
		const { id } = req.query;
		const { data } = await axios(urlBuilder.main.ordersByUser(id));
		return res.status(res.statusCode).json(data);
	} catch (error: any) {
		console.error(error.message);
		return res.json(error);
	}
}

export default handler;
