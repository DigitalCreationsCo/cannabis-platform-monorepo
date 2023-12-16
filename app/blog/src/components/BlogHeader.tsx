import { GrasSignature, H4 } from '@cd/ui-lib';
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
				<header className="mb-10 mt-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
					<GrasSignature className="text-yellow drop-shadow text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
						{title}
					</GrasSignature>
					<H4
						className={`self-end text-primary text-center text-2xl md:pl-8 md:text-left ${styles.portableText}`}
					>
						<PortableText value={description} />
					</H4>
				</header>
			);

		case 2:
			return (
				<header>
					<h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
						<Link href="/" className="hover:underline">
							{title}
						</Link>
					</h2>
				</header>
			);

		default:
			throw new Error(
				`Invalid level: ${
					JSON.stringify(level) || typeof level
				}, only 1 or 2 are allowed`,
			);
	}
}
