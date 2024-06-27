/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type SanityDocument } from 'next-sanity';
import {
	type DocumentActionDescription,
	type DocumentActionComponent,
	type DocumentActionsContext,
	type DocumentActionProps,
} from 'sanity';
import { apiVersion } from '@/lib/sanity/sanity.api';
import { setContentUrl } from '@/lib/sanity/sanity.client';

export function createAsyncPublishAction(
	originalAction: DocumentActionComponent,
	context: DocumentActionsContext
): DocumentActionComponent {
	const client = context.getClient({ apiVersion });
	return (props: DocumentActionProps) => {
		const originalResult = originalAction(props)!;
		const publishedDocument: SanityDocument = props.published!;
		return {
			...originalResult,
			onHandle: async () => {
				setContentUrl(client, publishedDocument);
				originalResult!.onHandle!();
			},
		};
	};
}
