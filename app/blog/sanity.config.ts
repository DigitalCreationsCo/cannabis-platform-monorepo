/* eslint-disable sonarjs/no-duplicate-string */
/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { Iframe, type IframeOptions } from 'sanity-plugin-iframe-pane';
import { deskTool } from 'sanity/desk';
import { apiVersion, dataset, projectId } from './src/lib/sanity.api';
import { schema } from './src/schemas';

// function getPreviewUrl(doc: SanityDocument) {
// 	return doc?.slug?.current
// 		? `${window.location.host}/${doc.slug.current}`
// 		: `${window.location.host}`;
// }

const iframeOptions = {
	url: {
		origin: 'same-origin',
		preview: '/api/draft',
		draftMode: '/api/draft',
	},
	reload: { button: true },
} satisfies IframeOptions;

export default defineConfig({
	basePath: '/blog/studio',
	name: 'project-name',
	title: 'Project Name',
	projectId,

	dataset,

	schema,

	plugins: [
		deskTool({
			// `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
			// You can add any React component to `S.view.component` and it will be rendered in the pane
			// and have access to content in the form in real-time.
			// It's part of the Studio's “Structure Builder API” and is documented here:
			// https://www.sanity.io/docs/structure-builder-reference
			defaultDocumentNode: (S, { schemaType }) => {
				return S.document().views([
					// Default form view
					S.view.form(),
					// Preview
					S.view.component(Iframe).options(iframeOptions).title('Preview'),
				]);
			},
		}),

		// Add the "Open preview" action
		// previewUrl({
		// 	base: '/api/draft',
		// 	requiresSlug: ['post'],
		// 	urlSecretId: previewSecretId,
		// }),

		// Vision lets you query your content with GROQ in the studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
	],
});
