import { Grid, Paragraph } from '@cd/ui-lib';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { type Partner } from './partners-data';

function Partners({
	scaleOnHover = false,
	partners,
	title,
	className,
}: {
	scaleOnHover?: boolean;
	title: string;
	partners: Partner[];
	className?: string;
}) {
	return (
		<div
			className={twMerge(
				'py-16',
				'bg-gradient-to-b from-10% from-inverse-soft to-inverse',
				'space-y-12',
				className,
			)}
		>
			<Paragraph className="max-w-lg lg:max-w-full font-semibold text-center mx-auto text-3xl lg:mb-2">
				{title}
			</Paragraph>
			<Grid className="grid-cols-2 justify-center md:px-16 lg:grid-cols-3 gap-4 mx-auto">
				{partners.map(({ imgSrc, name }: Partner) => (
					<Image
						key={`partner-${name}`}
						className={twMerge(
							'w-full h-auto max-w-[280px] items-center self-center mx-auto col-span-1',
							scaleOnHover && 'hover:scale-105 duration-200',
						)}
						src={imgSrc}
						alt={name}
						loader={({ src }) => src}
						width={150}
						height={100}
					/>
				))}
			</Grid>
		</div>
	);
}

export default Partners;
