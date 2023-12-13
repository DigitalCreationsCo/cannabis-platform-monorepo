import { showTime } from '@cd/core-lib';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlForImage } from 'lib/sanity.image';
import { type Post } from '../lib/sanity.queries';

export default function Post({ post }: { post: Post }) {
	return (
		<section className="post">
			{post.mainImage ? (
				<Image
					className="post__cover"
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					src={urlForImage(post.mainImage)!.url()}
					height={231}
					width={367}
					alt=""
				/>
			) : (
				<div className="post__cover--none" />
			)}
			<div className="post__container">
				<h1 className="post__title">{post.title}</h1>
				<p className="post__excerpt">{post.excerpt}</p>
				<p className="post__date">{showTime(post._createdAt)}</p>
				<div className="post__content">
					<PortableText value={post.body} />
				</div>
			</div>
		</section>
	);
}
