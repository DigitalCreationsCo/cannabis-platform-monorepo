import { Grid } from '@cd/ui-lib';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { type Partner } from './partners-data';

function Partners({ partners }: { partners: Partner[] }) {
	return (
		<div className={twMerge(styles.gradient)}>
			<p className="text-center tracking-wider max-w-sm lg:max-w-xl mx-auto text-lg lg:mb-2 font-medium">
				{`Partnering with the leading cannabis technology`.toUpperCase()}
			</p>
			<Grid className="grid-cols-2 justify-center md:px-16 lg:grid-cols-3 gap-2 mx-auto">
				{partners.map(({ imgSrc, name }: Partner) => (
					<Image
						key={`partner-${name}`}
						className="w-full h-auto max-w-[280px] items-center self-center mx-auto col-span-1"
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

const styles = {
	gradient: ['bg-gradient-to-b', 'from-10%', 'from-inverse', 'to-inverse-soft'],
};
