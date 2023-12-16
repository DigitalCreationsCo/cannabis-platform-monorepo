/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import {
	PortableText,
	type PortableTextReactComponents,
} from '@portabletext/react';

import { SanityImage } from './SanityImage';

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
	types: {
		image: ({ value }) => {
			return <SanityImage {...value} />;
		},
	},
};

export default function PostBody({ body }: { body: any }) {
	return (
		<div className={`mx-auto max-w-2xl`}>
			<PortableText value={body} components={myPortableTextComponents} />
		</div>
	);
}
