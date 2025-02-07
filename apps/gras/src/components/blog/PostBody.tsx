/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import { H1, H2, H3, H4, Paragraph } from '@gras/ui';
import { IconDots as EllipsisHorizontalIcon } from '@tabler/icons-react';
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
	block: {
		h1: H1,
		h2: H2,
		h3: H3,
		h4: H4,
		normal: Paragraph,
		blockquote: Paragraph,
	},
};

export default function PostBody({ body }: { body: any }) {
	return (
		<div className="flex flex-col mx-auto bg-light p-8 md:px-16 pb-16 min-h-[250px] justify-between">
			<PortableText value={body} components={myPortableTextComponents} />
			<EllipsisHorizontalIcon className="w-10 h-10 mx-auto mt-4" />
		</div>
	);
}
