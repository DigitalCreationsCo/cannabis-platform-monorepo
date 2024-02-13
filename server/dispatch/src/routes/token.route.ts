/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from 'express';
import { AuthTokenUtils } from '../lib/fleet/auth/AuthTokenUtils';
import { ServiceUtils } from '../lib/fleet/utils/ServiceUtils';

export enum TokenType {
	DELIVERY_DRIVER,
	DELIVERY_CONSUMER,
	FLEET_READER,
}
const tokenRoutes = Router();
tokenRoutes.get('/', async (req, res) => {
	ServiceUtils.setStandardResponseHeaders(res);

	let tokenType = req.query.tokenType as string;
	let tokenId = '';
	if (tokenType?.includes('/')) {
		const tokenParams = tokenType.split('/');
		tokenType = tokenParams[0];
		tokenId = tokenParams[1].trim();
	}

	let authToken;
	let tokenTypeEnum: TokenType;
	try {
		tokenTypeEnum =
			TokenType[tokenType.toUpperCase().valueOf() as keyof typeof TokenType];
	} catch (error: any) {
		console.error(`Invalid token type ${tokenType} requested.`);
		ServiceUtils.setErrorResponse(
			res,
			`Invalid token type ${tokenType} requested.`,
			400,
		);
		return res.end();
	}

	try {
		switch (tokenTypeEnum) {
			case TokenType.DELIVERY_DRIVER:
				if (validateTokenId(tokenType, tokenId, res)) {
					return;
				}
				authToken = AuthTokenUtils.getDeliveryDriverToken(tokenId);
				break;
			case TokenType.DELIVERY_CONSUMER:
				if (validateTokenId(tokenType, tokenId, res)) {
					return;
				}
				authToken = AuthTokenUtils.getDeliveryConsumerToken(tokenId);
				break;
			case TokenType.FLEET_READER:
				authToken = AuthTokenUtils.getDeliveryFleetReaderToken();
				break;
			default:
				console.error(
					`Requested token for tokenType ${tokenType}, but it should not get here.`,
				);
				ServiceUtils.setErrorResponse(
					res,
					`Could not find token for the given type: ${tokenType}`,
					400,
				);
				return res.end();
		}
	} catch (error: any) {
		console.error(error.message);
		ServiceUtils.setErrorResponse(
			res,
			`Finding token for tokenType ${tokenType} failed`,
			500,
		);
		return res.end();
	}

	// do not cache this endpoint
	res.setHeader('cache-control', 'no-store');
	res.setHeader('content-type', 'application/json');
	res.setDefaultEncoding('utf8');
	res.write(JSON.stringify(authToken));
	res.flushHeaders();
});

function validateTokenId(tokenType: string, id: string, res: any) {
	if (!id || id === '*') {
		console.error(`Requested token for ${tokenType}, but no ID was supplied.`);
		ServiceUtils.setErrorResponse(
			res,
			`Token type ${tokenType} must include an ID to the claim.`,
			400,
		);
		return false;
	} else {
		return true;
	}
}

export { tokenRoutes };
