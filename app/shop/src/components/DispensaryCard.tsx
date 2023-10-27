import {
	checkIsDispensaryOpen,
	formatDispensaryUrl,
	renderAddress,
} from '@cd/core-lib';
import { type OrganizationWithShopDetails } from '@cd/data-access';
import { Card, FlexBox, H2, H3, Paragraph } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

type DispensaryCardProps = {
	data: OrganizationWithShopDetails;
	loading?: boolean;
	className?: string | string[];
};
function DispensaryCard({ data: dispensary, className }: DispensaryCardProps) {
	const styles = {
		dispensarycard: [
			'relative',
			'w-[240px] md:min-w-[340px] md:w-[340px] h-[220px] p-4 overflow-hidden !rounded',
		],
		isOpenBadge: [
			'text-inverse border-2 tracking-wider z-5 top-0 right-0 p-3 m-3 badge absolute',
		],
	};

	return (
		<Link
			href={formatDispensaryUrl(dispensary?.subdomainId)}
			className="relative z-0 shadow-2xl"
		>
			<Card
				className={twMerge([
					styles.dispensarycard,
					// 'hover:scale-101 transition duration-500',
					className,
				])}
			>
				<ImageBackDrop src={dispensary?.images?.[0]?.location || logo.src}>
					<FlexBox className="z-5 absolute left-0 flex-col p-2 px-4">
						<H3 className="z-5 text-inverse left-0 top-0 max-w-[248px] whitespace-normal tracking-wide drop-shadow">
							{dispensary?.name}
						</H3>
						<Paragraph className="text-inverse text-xl font-semibold drop-shadow">
							{/* {renderAddress({
								address: dispensary?.address,
								showCountry: false,
								showZipcode: false,
								lineBreak: true,
							})} */}
							{/* {dispensary.address.city + ', ' + dispensary.address.state} */}
							{dispensary.address.city}
						</Paragraph>
					</FlexBox>
					{/* <Paragraph className={twMerge(styles.isOpenBadge)}>
						{checkIsDispensaryOpen(dispensary.schedule) ? 'open now' : 'closed'}
					</Paragraph> */}
					<FlexBox className="z-5 absolute bottom-0 left-0 flex-col p-2 px-4">
						<Paragraph className="text-inverse text-xl font-semibold drop-shadow">
							{(dispensary.subscribedForDelivery && 'Accepting Delivery') ||
								(dispensary.subscribedForPickup && 'Order for Pickup')}
						</Paragraph>
					</FlexBox>
				</ImageBackDrop>
			</Card>
		</Link>
	);
}

const ImageBackDrop = ({
	src,
	children,
}: { src: string } & PropsWithChildren) => {
	return (
		<div className="absolute left-0 top-0 bg-transparent items-center justify-center h-full w-full flex">
			<Image
				className="object-contain p-8 bg-gradient-to-b from-[rgba(0,0,0,.19)]"
				src={src}
				fill
				// height={200}
				// width={200}
				alt="card-backdrop"
				sizes="(max-width: 200px)"
				quality={25}
				priority
				loader={({ width, src }) => src + `?w=${width}`}
			/>
			<div
				style={{
					backgroundColor: 'rgba(200,0,0,0.19)',
					position: 'absolute',
					height: '100%',
					width: '100%',
					left: '0',
					top: '0',
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default DispensaryCard;
