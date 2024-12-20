import { getDashboardSite } from '@cd/core-lib/utils';
import { type ProductVariantWithDetails } from '@cd/data-access';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/assets/images/logo.png';
import Icons from '../icons';
import FlexBox from './FlexBox';
import IconWrapper from './IconWrapper';
import Price from './Price';
import Row from './Row';
import { Small, Span } from './Typography';

interface ProductVariantRowProps {
	variant: ProductVariantWithDetails;
}
export default function ProductVariantRow({ variant }: ProductVariantRowProps) {
	const imageSrc = variant.images?.[0]?.location || logo;

	return (
		<Link href={getDashboardSite(`products/${variant.productId}`)}>
			<Row className="grid grid-cols-12 h-[44px]">
				<Image
					loader={({ src }) => src}
					className="hidden sm:block col-span-1"
					src={imageSrc}
					alt={variant.name}
					width={40}
					height={40}
					quality={25}
				/>

				<Small className="col-span-3">{variant.name}</Small>

				<FlexBox className="flex-row items-center space-x-0 md:space-x-2 sm:grow col-span-2 sm:col-span-1">
					<IconWrapper iconColor="yellow" Icon={StarIcon} />
					<Small>{variant.rating}</Small>
				</FlexBox>

				<Small
					className={twMerge(
						'flex flex-row col-span-2',
						variant.stock <
							(process.env.NEXT_PUBLIC_LOW_STOCK_THRESHOLD || 7) && 'text-error'
					)}
				>
					{variant.stock.toString().padStart(2, '0')}&nbsp;
					<Span className="hidden sm:block">in stock</Span>
				</Small>

				<Price
					className="col-span-4 justify-self-end"
					basePrice={variant.basePrice}
					salePrice={variant.salePrice}
					discount={variant.discount}
					isDiscount={variant.isDiscount}
					showDiscount={true}
					showOriginalPrice={true}
				/>

				<IconWrapper
					className="hidden sm:block col-span-1 justify-self-end"
					iconSize={16}
					Icon={Icons.Right}
				/>
			</Row>
		</Link>
	);
}
