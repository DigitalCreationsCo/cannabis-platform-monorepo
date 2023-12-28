/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { urlForImage } from '../lib/sanity.image';

interface CoverImageProps {
	title: string;
	slug?: string;
	image: any;
	priority?: boolean;
}

export default function MainImage(props: CoverImageProps) {
	const { title, slug, image: source, priority } = props;
	const image = source?.asset?._ref ? (
		<div
			className={twMerge(
				'shadow-small',
				slug && 'transition-shadow duration-200 hover:shadow-medium',
			)}
		>
			<Image
				className="h-auto w-full md:rounded"
				width={2000}
				height={1000}
				alt=""
				src={urlForImage(source)!.height(1000).width(2000).url()}
				sizes="100vw"
				priority={priority}
			/>
		</div>
	) : (
		<div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
	);

	return (
		<div className="sm:mx-0">
			{slug ? (
				<Link href={`/posts/${slug}`} aria-label={title}>
					{image}
				</Link>
			) : (
				image
			)}
		</div>
	);
}
