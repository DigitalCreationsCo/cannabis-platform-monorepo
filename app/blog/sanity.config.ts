/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */
import { assist } from '@sanity/assist';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { deskTool } from 'sanity/desk';
import { presentationTool } from 'sanity/presentation';
import settings from 'schemas/settings';
import {
	apiVersion,
	dataset,
	DRAFT_MODE_ROUTE,
	projectId,
} from './src/lib/sanity.api';
import { locate } from './src/plugins/locate';
import { previewDocumentNode } from './src/plugins/previewPane';
import { settingsStructure, settingsPlugin } from './src/plugins/settings';
import { schema } from './src/schemas';

export function resolveUrl(href = '/') {
	return process.env.NODE_ENV === 'production'
		? `${process.env.NEXT_PUBLIC_BLOG_APP_URL}${href}`
		: `${process.env.NEXT_PUBLIC_BLOG_APP_URL}/blog${href}`;
}

export default defineConfig({
	basePath: '/blog/studio',
	name: 'gras-blog-studio',
	title: 'Gras Blog Studio',
	projectId,

	dataset,

	schema,

	plugins: [
		deskTool({
			structure: settingsStructure(settings),
			// `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
			defaultDocumentNode: previewDocumentNode(),
			// structure: (S) => {
			// 	return S.list()
			// 		.menuItemGroups()
			// 		.title('Content')
			// 		.items([
			// 			S.listItem()
			// 				.title('Post')
			// 				.child(S.editor().schemaType('post').documentId('post')),
			// 			// Add a visual divider (optional)
			// 			S.divider(),
			// 			// List out the rest of the document types, but filter out the config type
			// 			// ...S.documentTypeListItems(),
			// 			// .filter(
			// 			// 	(listItem) => !['post'].includes(listItem.getId()),
			// 			// ),
			// 		]);
			// },
			// `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
			// You can add any React component to `S.view.component` and it will be rendered in the pane
			// and have access to content in the form in real-time.
			// It's part of the Studio's “Structure Builder API” and is documented here:
			// https://www.sanity.io/docs/structure-builder-reference
			// defaultDocumentNode: (S, { schemaType }) => {
			// 	switch (schemaType) {
			// 		case 'post':
			// 			return S.document().views([
			// 				// Default form view
			// 				S.view.form(),
			// 				// Preview
			// 				S.view.component(Iframe).options(iframeOptions).title('Preview'),
			// 			]);
			// 			break;
			// 		default:
			// 			return S.document().views([S.view.form()]);
			// 	}
			// },
		}),
		presentationTool({
			locate,
			previewUrl: {
				origin: resolveUrl(),
				draftMode: {
					enable: DRAFT_MODE_ROUTE,
				},
			},
		}),
		// Configures the global "new document" button, and document actions, to suit the Settings document singleton
		settingsPlugin({ type: settings.name }),
		// Add an image asset source for Unsplash
		unsplashImageAsset(),
		// Vision lets you query your content with GROQ in the studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
		assist(),
	],
});
