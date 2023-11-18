import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { generateImage } from '../image/generateImage';
import { type GenerateOptions } from '../image/types';
import { uploadToSanity } from '../sanity';

import { dataset, projectId } from './sanity.api';
import { type Client, type ClientConfigOptions } from './types';

const imageBuilder = createImageUrlBuilder({
	projectId: projectId || '',
	dataset: dataset || '',
});

export const urlForImage = (source: Image) => {
	// Ensure that source image contains a valid reference
	if (!source?.asset?._ref) {
		return undefined;
	}

	return imageBuilder?.image(source).auto('format');
};

export const createImageClient = ({
	dataset,
	projectId,
	apiVersion = '2022-08-28',
	useCdn = false,
	token,
	redisUrl,
}: ClientConfigOptions): Client => {
	return {
		generateImage: async (args: GenerateOptions): Promise<Buffer | {}> => {
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
