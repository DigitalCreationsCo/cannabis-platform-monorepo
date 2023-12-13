/* eslint-disable sonarjs/no-small-switch */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable sonarjs/no-duplicate-string */
/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */
import { assist } from '@sanity/assist';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { Iframe, type IframeOptions } from 'sanity-plugin-iframe-pane';
import { deskTool } from 'sanity/desk';
import { apiVersion, dataset, projectId } from './src/lib/sanity.api';
import { schema } from './src/schemas';

function resolveUrl(href = '/') {
	return process.env.NODE_ENV === 'production'
		? `${process.env.NEXT_PUBLIC_BLOG_APP_URL}${href}`
		: `${process.env.NEXT_PUBLIC_BLOG_APP_URL}/blog${href}`;
}

const iframeOptions = {
	url: (document) =>
		document?.slug?.current
			? // ? resolveUrl(`/post/${document.slug.current}`)
			  resolveUrl(`/post/${document.slug.current}`)
			: resolveUrl(),
	showDisplayUrl: true,
	reload: { button: true },
} satisfies IframeOptions;

export default defineConfig({
	basePath: '/blog/studio',
	name: 'gras-blog-studio',
	title: 'Gras Blog Studio',
	projectId,

	dataset,

	schema,

	plugins: [
		deskTool({
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
			defaultDocumentNode: (S, { schemaType }) => {
				switch (schemaType) {
					case 'post':
						return S.document().views([
							// Default form view
							S.view.form(),
							// Preview
							S.view
								.component(Iframe)
								.options(iframeOptions)
								// .options({
								// 	url: (doc: SanityDocument) => getPreviewUrl(doc),
								// })
								.title('Preview'),
						]);
						break;
					default:
						return S.document().views([S.view.form()]);
				}
			},
		}),
		// Vision lets you query your content with GROQ in the studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
		assist(),
	],
});
