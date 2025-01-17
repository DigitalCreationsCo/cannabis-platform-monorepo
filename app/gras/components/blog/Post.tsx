import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { PortableText } from '@portabletext/react';
import { useTranslations } from 'next-intl';
import { default as Router } from 'next/router';
import { twMerge } from 'tailwind-merge';
import { urlForImage, type Post } from '@/lib/sanity';
import Date from './PostDate';
import { Title as TitleBase, Text, Image, Button } from '@mantine/core';

import { IconWrapper } from '@gras/ui';
const Title = (props: any) => {
	const hexColor = getRandomHexColor();
	return (
		<TitleBase className={twMerge(`text-inverse text-[${hexColor}]`)} {...props} />
	);
};
export default function Post({ post }: { post: Post }) {
	return (
		<section>
			<BackButton />
			<div>
				<Text className="post__date">
					<Date dateString={post._createdAt} />
				</Text>
				<Text>{post.categories}</Text>
				<Title>
					{post.title}
				</Title>
				<Text className="post__excerpt">
					{post.excerpt}
				</Text>
			</div>

			{post.mainImage ? (
				<div className="post__cover">
					<Image
						src={urlForImage(post.mainImage)!.url()}
						height={300}
						width={600}
						alt={post.title}
					/>
				</div>
			) : (
				<div className="post__cover--none" />
			)}

			<Text className="post__content">
				<PortableText
					value={post.body}
					components={{
						block: {
							h1: (t) => <Title>{t}</Title>,
							h2: (t) => <Title order={2}>{t}</Title>,
							h3: (t) => <Title order={3}>{t}</Title>,
							h4: (t) => <Title order={4}>{t}</Title>,
							normal: Text as any,
							blockquote: Text as any,
						},
					}}
				/>
			</Text>
		</section>
	);
}

function BackButton({ className }: { className?: string }) {
	const t = useTranslations('common');
	return (
		<Button
			size="sm"
			bg="transparent"
			className={twMerge('text-dark self-start sm:py-0', className)}
			onClick={() => Router.back()}
		>
			<IconWrapper Icon={ArrowLeftIcon} />
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
