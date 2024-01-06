/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { generateImage } from '../image/generateImage';
import { type GenerateOptions } from '../image/types';
import { uploadToSanity } from '../sanity';
import { type Client, type ClientConfigOptions } from './types';

export const createImageClient = ({
	dataset,
	projectId,
	apiVersion = '2022-08-28',
	useCdn = false,
	token,
	redisUrl,
}: ClientConfigOptions): Client => {
	return {
		generateImage: async (
			args: GenerateOptions,
		): Promise<Buffer | Record<string, unknown>> => {
			try {
				const image = await generateImage(args);

				// If our client can authenticate with Sanity, update the corresponding document
				if (args.id && dataset && projectId && redisUrl) {
					await uploadToSanity({
						image,
						documentId: args.id,
						dataset,
						projectId,
						apiVersion,
						token,
						useCdn,
						redisUrl,
					});
				}

				return image;
			} catch (e) {
				return e;
			}
		},
	};
};
