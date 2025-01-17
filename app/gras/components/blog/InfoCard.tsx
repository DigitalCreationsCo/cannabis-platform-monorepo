import { truncateWordsAndLeaveN } from '@gras/core/utils';
import { twMerge } from 'tailwind-merge';
import { urlForImage } from '@/lib/sanity/sanity.image';
import { resolveHref } from '@/lib/sanity/sanity.links';
import { type Post } from '@/lib/sanity/sanity.queries';
import logo from '../../public/logo.png';
import { Anchor, Image, Title, Text } from '@mantine/core';

interface InfoCardProps {
	info: Post;
	showDescription?: boolean;
}

function InfoCard({
	info,
	showDescription = true,
}: InfoCardProps) {
	return (
		<Anchor
			href={resolveHref('post', info.slug)!}
		>
				<Image
					src={urlForImage(info.mainImage)?.url() || logo.src}
					alt={info.title!}
					sizes="330px"
				/>
			<div className={twMerge('max-h-36', 'px-2')}>
				<Title order={3}>{info.title}</Title>
				{(showDescription && (
					<Text>
						{truncateWordsAndLeaveN(info.excerpt!, 9)}
					</Text>
				)) || <></>}
			</div>
		</Anchor>
	);
}

export default InfoCard;
