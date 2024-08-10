/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';
import { type SanityDocument } from 'next-sanity';
import {
	type DocumentActionDescription,
	type DocumentActionComponent,
	type DocumentActionsContext,
	type DocumentActionProps,
} from 'sanity';
import { apiVersion } from '@/lib/sanity/sanity.api';
import { setContentUrl } from '@/lib/sanity/sanity.client';
import { type Post } from '../../sanity.queries';

export function createAsyncPublishAction(
	originalAction: DocumentActionComponent,
	context: DocumentActionsContext
): DocumentActionComponent {
	const client = context.getClient({ apiVersion });
	return (props: DocumentActionProps) => {
		const originalResult = originalAction(props)!;
		const publishedDocument: SanityDocument = props.published!;
		console.info('publishedDocument: ', publishedDocument);

		// originalResult.onHandle();
		return {
			...originalResult,
			onHandle: async () => {
				try {
					originalResult.onHandle();

					// Wait until the document is published
					const document = await client.getDocument<Post>(props.id);

					console.info('document: ', document);
					if (!document) {
						throw new Error('Document is not yet published.');
					}

					// Call the API route with the published document data
					await axios.post('/api/blog/generate-social-media-post', {
						...document,
					});

					// Set the content URL after the document is published
					// document.categories.includes('Business')
					// 	? await setContentUrl(client, document, 'business')
					// 	:
					await setContentUrl(client, document);

					// Call the original onHandle to complete the publishing process
					// originalResult.onHandle();
				} catch (error) {
					console.error('Error during async publish:', error);
				}
			},
		};
	};
}
