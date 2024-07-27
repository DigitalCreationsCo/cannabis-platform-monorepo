/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Paragraph, Small } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { urlForImage } from '@/lib/sanity';

interface CoverImageProps {
	title: string;
	slug?: string;
	image: any;
	priority?: boolean;
	creditUser?: string;
	creditLink?: string;
}

export default function MainImage(props: CoverImageProps) {
	const {
		title,
		slug,
		image: source,
		creditUser,
		creditLink,
		priority,
	} = props;
	const image = source.asset._ref ? (
		<div
			className={twMerge(
				'shadow-small',
				'w-full',
				slug && 'transition-shadow duration-200 hover:shadow-medium'
			)}
		>
			{slug ? (
				<Link href={`/blog/posts/${slug}`} aria-label={title}>
					<Image
						blurDataURL={urlForImage(source)?.blur(100).url()}
						className="h-auto w-full"
						width={1000}
						height={1000}
						alt={title}
						src={urlForImage(source)!.url()}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						priority={priority}
					/>
				</Link>
			) : (
				<Image
					blurDataURL={urlForImage(source)?.blur(100).url()}
					className="h-auto w-full md:rounded"
					width={2000}
					height={1000}
					alt=""
					src={urlForImage(source)!.height(500).width(1000).url()}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					priority={priority}
				/>
			)}
			{(creditUser && (
				<div className="pt-2 mx-auto bg-light">
					<Small className="text-center">
						<a href={`${creditLink}?utm_source=Gras&utm_medium=referral`}>
							{creditUser}
						</a>
					</Small>
				</div>
			)) ||
				null}
		</div>
	) : (
		<div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
	);

	return <div className="mx-auto">{image}</div>;
}
