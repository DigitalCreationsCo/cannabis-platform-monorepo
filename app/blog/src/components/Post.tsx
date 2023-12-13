import { formatToTimeZone } from '@cd/core-lib';
import { Button, H1, H2, H3, H4, H5, IconWrapper, Paragraph } from '@cd/ui-lib';
import icons from '@cd/ui-lib/src/icons';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Router from 'next/router';
import { urlForImage } from '../lib/sanity.image';
import { type Post } from '../lib/sanity.queries';

export default function Post({ post }: { post: Post }) {
	return (
		<section className="post p-2 flex flex-col gap-y-6">
			<BackButton />
			<div>
				<Paragraph className="post__date tracking-wider text-inverse">
					{formatToTimeZone(post._createdAt, 'EST', 'MM-dd-yyyy hh:mm')}
				</Paragraph>
				<H1 className="md:text-7xl font-onest font-semibold text-inverse tracking-wide drop-shadow-lg">
					{post.title}
				</H1>{' '}
				<Paragraph className="post__excerpt tracking-wider text-inverse">
					{post.excerpt}
				</Paragraph>
			</div>

			{post.mainImage ? (
				<div className="post__cover">
					<Image
						className="rounded"
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						src={urlForImage(post.mainImage)!.url()}
						height={400}
						width={800}
						alt=""
					/>
				</div>
			) : (
				<div className="post__cover--none" />
			)}

			<Paragraph className="post__content font-semibold tracking-widest">
				<PortableText
					value={post.body}
					components={{
						block: {
							h1: H1,
							h2: H2,
							h3: H3,
							h4: H4,
							normal: Paragraph,
							blockquote: Paragraph,
						},
					}}
				/>
			</Paragraph>
		</section>
	);
}

function BackButton() {
	return (
		<Button
			size="sm"
			bg="transparent"
			className="text-dark self-start  sm:py-0"
			onClick={() => Router.back()}
		>
			<IconWrapper Icon={icons.ArrowLeft} className="pr-1" />
			back
		</Button>
	);
}
