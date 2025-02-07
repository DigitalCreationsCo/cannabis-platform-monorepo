import { type Author, urlForImage } from '@/lib/sanity';
import { Text, Image } from '@mantine/core';

export default function AuthorAvatar(props: Author) {
	const { name, picture } = props;
	return (
		<div>
			<div>
				<Image
					src={
						picture?.asset?._ref
							? urlForImage(picture)!.height(96).width(96).fit('crop').url()
							: 'https://source.unsplash.com/96x96/?face'
					}
					height={96}
					width={96}
					alt={picture?.alt ?? name}
				/>
			</div>
			<Text className="text-xl">{name}</Text>
		</div>
	);
}
