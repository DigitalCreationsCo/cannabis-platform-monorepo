import { GrasSignature, H4 } from '@cd/ui-lib';
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
        <header className="mb-10 lg:mt-10 flex flex-col items-center md:mb-12 xl:flex-row xl:justify-between">
          <GrasSignature
            className={twMerge(
              'text-outline drop-shadow text-6xl font-bold leading-tight tracking-tight md:pr-8 sm:text-8xl'
            )}
          >
            {title}
          </GrasSignature>
          <H4
            className={`text-inverse xl:self-end text-center text-2xl md:pl-8 md:text-left ${styles.portableText}`}
          >
            <PortableText value={description} />
          </H4>
        </header>
      );

    case 2:
      return (
        <header className="px-4">
          <GrasSignature className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
            <Link href="/" className="hover:underline">
              {title}
            </Link>
          </GrasSignature>
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
