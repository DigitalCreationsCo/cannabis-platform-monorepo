import {
	Button,
	H1,
	H2,
	H3,
	H4,
	IconWrapper,
	Page,
	Paragraph,
} from '@cd/ui-lib';
import icons from '@cd/ui-lib/src/icons';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { default as Router } from 'next/router';
import { twMerge } from 'tailwind-merge';
import PostPageHead from 'components/PostPageHead';
import PostTitle from 'components/PostTitle';
import SectionSeparator from 'components/SectionSeparator';
import { urlForImage } from 'lib/sanity.image';
import type { Post, Settings } from 'lib/sanity.queries';
import MorePosts from './MorePosts';
import Date from './PostDate';

export interface PostPageProps {
	preview?: boolean;
	loading?: boolean;
	post: Post;
	morePosts: Post[];
	settings: Settings;
}

const NO_POSTS: Post[] = [];

export default function PostPage(props: PostPageProps) {
	const { preview, morePosts = NO_POSTS, post, settings } = props;

	const slug = post?.slug;

	if (!slug && !preview) {
		notFound();
	}

	return (
		<Page className={'bg-inherit pt-8 min-h-[660px]'}>
			<PostPageHead settings={settings} post={post} />

			{preview && !post ? (
				<PostTitle>Loading…</PostTitle>
			) : (
				<>
					<article className="w-full mx-auto max-w-7xl">
						<div className="flex flex-col w-full px-1">
							<BackButton />
							<PostTitle>{post.title}</PostTitle>
							<div className="mb-4">
								<Paragraph className="post__date text-inverse inline">
									<Date dateString={post._createdAt} />
								</Paragraph>
								{'  '}
								<Paragraph className="text-inverse inline">
									{post.categories}
								</Paragraph>
							</div>
							<Paragraph className="leading-tight mb-4 post__excerpt text-inverse drop-shadow text-lg">
								{post.excerpt}
							</Paragraph>
						</div>
						{post.mainImage ? (
							<div className="post__cover mb-8">
								<Image
									className="md:rounded shadow"
									// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
									src={urlForImage(post.mainImage)!.url()}
									height={800}
									width={1600}
									alt=""
								/>
							</div>
						) : (
							<div className="post__cover--none" />
						)}
						<Paragraph className="leading-tight post__content px-1">
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
					</article>
					<SectionSeparator />
					{morePosts.length > 0 && <MorePosts posts={morePosts} />}
				</>
			)}
		</Page>
	);
}

function BackButton({ className }: { className?: string }) {
	return (
		<Button
			size="sm"
			bg="transparent"
			className={twMerge('text-dark self-start sm:py-0', className)}
			onClick={() => Router.back()}
		>
			<IconWrapper Icon={icons.ArrowLeft} className="pr-1" />
			back
		</Button>
	);
}
