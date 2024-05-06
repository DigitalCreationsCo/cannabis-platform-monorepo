import {
	Button,
	H1,
	H2,
	H3,
	H4 as H4Base,
	IconWrapper,
	Paragraph,
} from '@cd/ui-lib';
import icons from '@cd/ui-lib/src/icons';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { default as Router } from 'next/router';
import { twMerge } from 'tailwind-merge';
import { urlForImage } from '@/lib/sanity';
import { type Post } from '@/lib/sanity';
import Date from './PostDate';
import { useTranslation } from 'next-i18next';

const H4 = (props: any) => {
	const hexColor = getRandomHexColor();
	return (
		<H4Base className={twMerge(`text-inverse text-[${hexColor}]`)} {...props} />
	);
};
export default function Post({ post }: { post: Post }) {
	return (
		<section className="post p-2 flex flex-col gap-y-6">
			<BackButton />
			<div>
				<Paragraph className="post__date tracking-wider text-inverse inline">
					<Date dateString={post._createdAt} />
				</Paragraph>
				<Paragraph className="text-inverse inline">{post.categories}</Paragraph>
				<H1 className="md:text-7xl font-onest font-semibold text-inverse tracking-wide drop-shadow-lg">
					{post.title}
				</H1>
				<Paragraph className="post__excerpt tracking-wider text-inverse drop-shadow text-lg max-w-3xl">
					{post.excerpt}
				</Paragraph>
			</div>

			{post.mainImage ? (
				<div className="post__cover">
					<Image
						className="rounded shadow"
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

function BackButton({ className }: { className?: string }) {
	const { t } = useTranslation('common')
	return (
		<Button
			size="sm"
			bg="transparent"
			className={twMerge('text-dark self-start sm:py-0', className)}
			onClick={() => Router.back()}
		>
			<IconWrapper Icon={icons.ArrowLeft} className="pr-1" />
			{t('go-back')}
		</Button>
	);
}

function getRandomHexColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
