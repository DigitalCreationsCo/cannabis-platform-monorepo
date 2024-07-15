import { GrasSignature, H1, H2, H4, Paragraph } from '@cd/ui-lib';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

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
				<header className="px-1 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-x-8">
					<H1 className="z-10">{title}</H1>
					<Paragraph className="h-fit">
						<PortableText value={description} />
					</Paragraph>
				</header>
			);

		case 2:
			return (
				<header className="px-4">
					<H1>
						<Link href="/blog" className="hover:underline">
							{title}
						</Link>
					</H1>
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
