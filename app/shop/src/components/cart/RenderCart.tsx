import {} from '@carbon/icons-react';
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
		<div className={styles.cartContainer}>
			<RenderTotal />
			<Grid className={twMerge(styles.cartGrid)}>
				{cart.length > 0 ? (
					cart.map((item, index) => (
						<ProductItem
							key={`bag-item-${index}`}
							data={item as unknown as ProductVariantWithDetails}
						/>
					))
				) : (
					<div className="col-span-2 text-center">
						<Paragraph>Your bag is empty</Paragraph>
						<Link href="/browse">
							<Paragraph className={'inline-block cursor-pointer border-b-2'}>
								{TextContent.shop.BAG_GET_WHAT_YOU_WANT}
							</Paragraph>
						</Link>
					</div>
				)}
			</Grid>
			{/* <RenderTotal />  */}
		</div>
	);
}

export default RenderCart;

const styles = {
	// cartContainer: 'min-w-full flex flex-col lg:px-8',
	cartContainer: 'px-8 pb-4 space-y-4',
	cartGrid: 'grid grid-cols-2 items-stretch gap-2 md:gap-8 md:w-full m-auto',
};
