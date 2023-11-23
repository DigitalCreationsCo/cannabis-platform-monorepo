import { selectCartState, TextContent } from '@cd/core-lib';
import { type ProductVariantWithDetails } from '@cd/data-access';
import { Grid, Paragraph, ProductItem } from '@cd/ui-lib';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import RenderTotal from './RenderTotal';

function RenderCart() {
	const { cart } = useSelector(selectCartState);

	return (
		<div className={twMerge(styles.cartContainer)}>
			<RenderTotal />
			{cart.length > 0 ? (
				<Grid className={twMerge(styles.cartGrid)}>
					{cart.map((item, index) => (
						<ProductItem
							key={`bag-item-${index}`}
							data={item as unknown as ProductVariantWithDetails}
						/>
					))}
				</Grid>
			) : (
				<div className="flex h-full flex-col place-content-center text-center">
					<Paragraph>Your bag is empty</Paragraph>
					<Link href="/browse">
						<Paragraph className={'inline-block cursor-pointer border-b-2'}>
							{TextContent.shop.BAG_TAGLINE_CURE_FILL_MY_BAG}
						</Paragraph>
					</Link>
				</div>
			)}
		</div>
	);
}

export default RenderCart;

const styles = {
	cartContainer: 'px-8 space-y-4 h-full w-full',
	cartGrid: 'grid grid-cols-2 items-stretch gap-2 md:gap-8 md:w-full m-auto',
};
