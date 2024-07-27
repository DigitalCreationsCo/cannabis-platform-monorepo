import { Button, H1, IconWrapper, Paragraph } from '@cd/ui-lib';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

import styles from './BlogHeader.module.css';

export default function BlogHeader({
	title,
	description,
	level,
}: {
	title: string;
	description?: any[];
	level: 1 | 2;
}) {
	switch (level) {
		case 1:
			return (
				<header className="px-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-x-8">
					<H1 className="z-10 text-3xl md:text-5xl">{title}</H1>
					<Paragraph>
						<PortableText value={description} />
					</Paragraph>
				</header>
			);

		case 2:
			return (
				<header className="px-4">
					<Link href="/blog" className="w-fit block hover:underline">
						<BackButton />
					</Link>
				</header>
			);

		default:
			throw new Error(
				`Invalid level: ${
					JSON.stringify(level) || typeof level
				}, only 1 or 2 are allowed`
			);
	}
}

function BackButton() {
	return (
		<Button
			size="sm"
			bg="transparent"
			hover="transparent"
			className="px-0 self-start py-4"
		>
			<IconWrapper Icon={ArrowLeftIcon} className="pr-1" />
			back
		</Button>
	);
}
