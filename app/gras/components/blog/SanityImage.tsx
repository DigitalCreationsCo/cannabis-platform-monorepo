import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
import { getSanityImageConfig } from '@/lib/sanity';

interface Props {
	asset: SanityImageSource;
	alt: string;
	caption?: string;
}

export const SanityImage = (props: Props) => {
	const { asset, alt, caption } = props;
	const imageProps = useNextSanityImage(getSanityImageConfig(), asset);

	if (!imageProps) return null;

	return (
		<figure>
			<Image {...imageProps} alt={alt} sizes="400px" quality={25} />
			{caption && (
				<figcaption className="mt-2 text-center italic text-sm text-gray-500 dark:text-gray-400">
					{caption}
				</figcaption>
			)}
		</figure>
	);
};
