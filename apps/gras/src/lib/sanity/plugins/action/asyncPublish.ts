import axios from 'axios';
// import { type SanityDocument } from 'next-sanity';
import {} from // type DocumentActionComponent,
// type DocumentActionsContext,
// type DocumentActionProps,
'sanity';
import { apiVersion } from '@/lib/sanity/sanity.api';
import { setContentUrl } from '@/lib/sanity/sanity.client';
// import { type Post } from '../../sanity.queries';

export function createAsyncPublishAction(originalAction, context) {
	const client = context.getClient({ apiVersion });
	return (props) => {
		const originalResult = originalAction(props);
		const publishedDocument = props.published;
		console.info('publishedDocument: ', publishedDocument);

		// originalResult.onHandle();
		return {
			...originalResult,
			onHandle: async () => {
				try {
					originalResult.onHandle();

					const document = await client.getDocument(props.id);
					// const document = await client.fetch<Post>(`*[_id == $id][0]`, {
					// 	id: props.id,
					// });

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
