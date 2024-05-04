/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { type RedisClientType } from 'redis';
import { getRedis } from '../redis';
import { getClient } from './client';
import { shouldUpdatePreviewImage } from './shouldUpdatePreviewImage';
import { type UploadArgs } from './types';

export const uploadToSanity = ({
	image,
	documentId,
	dataset,
	projectId,
	apiVersion,
	token,
	useCdn = false,
	redisUrl,
}: UploadArgs) => {
	return new Promise<void>(async (resolve, reject) => {
		try {
			const redis = (await getRedis(redisUrl)) as RedisClientType;

			const shouldUpdate = await shouldUpdatePreviewImage(documentId, redis);

			// If this document's image has already been updated in the last 10 seconds, ignore.
			// This avoids the infinite "update" webhook loop
			if (!shouldUpdate) return resolve();

			const client = await getClient(
				dataset,
				projectId,
				apiVersion,
				token,
				useCdn,
			);

			const sanityFile = await client.assets.upload('image', image, {
				filename: `socialImages/${documentId}.jpg`,
			});

			// Patch the document with the image reference
			await client
				.patch(documentId)
				.set({
					shareImage: {
						_type: 'image',
						asset: {
							_type: 'reference',
							_ref: sanityFile._id,
						},
					},
				})
				.commit();

			await redis.set(`previewImage-${documentId}`, new Date().toString());

			resolve();
		} catch (e: any) {
			reject(e);
		}
	});
};
