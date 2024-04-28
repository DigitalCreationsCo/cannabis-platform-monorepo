/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Paragraph } from '@cd/ui-lib';
import Image from 'next/image';
import { Author, urlForImage } from '@/lib/sanity';

export default function AuthorAvatar(props: Author) {
	const { name, picture } = props;
	return (
		<div className="flex items-center">
			<div className="relative mr-4 h-12 w-12">
				<Image
					src={
						picture?.asset?._ref
							? urlForImage(picture)!.height(96).width(96).fit('crop').url()
							: 'https://source.unsplash.com/96x96/?face'
					}
					className="rounded-full"
					height={96}
					width={96}
					alt={picture?.alt ?? name}
				/>
			</div>
			<Paragraph className="text-xl">{name}</Paragraph>
		</div>
	);
}
