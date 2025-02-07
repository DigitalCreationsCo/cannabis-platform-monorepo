import { truncateWordsAndLeaveN } from '@gras/core/src/utils/ui.util';
import { urlForImage } from '@/lib/sanity/sanity.image';
import { resolveHref } from '@/lib/sanity/sanity.links';
import { type Post } from '@/lib/sanity/sanity.queries';
import logo from '../../public/logo.png';
import { Anchor, Image, Title, Group, Text } from '@mantine/core';

interface InfoCardProps {
	info: Post;
	showDescription?: boolean;
}

export default function InfoCard({
	info,
	showDescription = true,
}: InfoCardProps) {
	return (
		<Anchor
			href={resolveHref('post', info.slug)!}
            style={{
				height: '300px',
				textDecoration: 'none',
			}}
		>
            <Image
                src={urlForImage(info.mainImage)?.url() || logo.src}
                alt={info.title!}
                sizes='300px'
                fit='cover'
                style={{ height: '200px', borderRadius: '10px' }}
            />
            <Group
            style={{ height: '100px', gap: 0, p:0, m: 0, justifyContent: 'start', justifyItems: 'start' }}
            >
				<Title order={4} p={0} m={0}>{info.title}</Title>
				{showDescription && (
                    <Text p={0} m={0} size="sm">
						{truncateWordsAndLeaveN(info.excerpt!, 9)}
					</Text>
				)}
            </Group>
		</Anchor>
	);
}
