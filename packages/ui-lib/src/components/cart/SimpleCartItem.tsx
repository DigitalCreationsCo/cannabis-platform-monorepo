import { type ProductVariantWithDetails } from '@cd/data-access';
import { twMerge } from 'tailwind-merge';
import Price from '../Price';
import { H6, Small } from '../Typography';

function SimpleCartItem({ product }: { product: ProductVariantWithDetails }) {
	return (
		<div className={twMerge(styles.lineItem)}>
			<img
				src={product?.images?.[0]?.location}
				alt={`${product.name}`}
				style={{ height: 50, maxHeight: 50, width: 50, maxWidth: 50 }}
				className="rounded border object-cover place-self-center"
			/>

			<div className={styles.info}>
				<H6 className="flex text-light">
					{product.name} ({product.quantity})
				</H6>

				<div className="flex flex-row justify-between">
					<Small className="text-light">{product.size + product.unit}</Small>
					<Price
						color="light"
						className="text-sm text-light"
						basePrice={product.basePrice}
						salePrice={product.salePrice}
						discount={product.discount}
						quantity={product.quantity}
					/>
				</div>
			</div>
		</div>
	);
}

export default SimpleCartItem;

const styles = {
	lineItem:
		'flex flex-nowrap w-full items-center rounded justify-between cursor-default',
	info: 'pl-2 flex flex-col w-full min-h-[64px] justify-center',
};
