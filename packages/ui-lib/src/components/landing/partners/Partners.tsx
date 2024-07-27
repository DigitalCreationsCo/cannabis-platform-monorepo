import Image from 'next/image';
import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import Grid from '../../Grid';
import { Paragraph } from '../../Typography';
import { type Partner } from './partners-data';

function Partners({
	scaleOnHover = false,
	partners,
	title,
	className,
	...props
}: {
	scaleOnHover?: boolean;
	title: string;
	partners: Partner[];
	className?: string;
} & HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			className={twMerge(
				'py-20',
				'bg-gradient-to-b from-10% from-inverse-soft to-inverse',
				'space-y-4',
				className
			)}
		>
			<Paragraph className="max-w-lg lg:max-w-full font-semibold text-center mx-auto text-3xl">
				{title}
			</Paragraph>
			<Grid className="grid-cols-2 justify-center md:px-16 lg:grid-cols-3 gap-4 mx-auto">
				{partners.map(({ imgSrc, name }: Partner) => (
					<Image
						key={`partner-${name}`}
						className={twMerge(
							'w-full h-auto max-w-[280px] items-center self-center mx-auto col-span-1',
							scaleOnHover && 'hover:scale-105 duration-200'
						)}
						src={imgSrc}
						alt={name}
						loader={({ src }) => src}
						width={150}
						height={100}
						unoptimized
						quality={25}
					/>
				))}
			</Grid>
		</div>
	);
}

export default Partners;
