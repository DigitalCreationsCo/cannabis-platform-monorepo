import { type ProductVariantWithDetails } from '@cd/data-access';
import { twMerge } from 'tailwind-merge';
import FlexBox from '../FlexBox';
import Price from '../Price';
import { H6, Small } from '../Typography';

interface SimpleCartItemProps extends React.HTMLAttributes<HTMLDivElement> {
	product: ProductVariantWithDetails;
	staticQuantity?: boolean;
}

function SimpleCartItem({
	product,
	staticQuantity = false,
	className,
}: SimpleCartItemProps) {
	const quantity = staticQuantity ? 1 : product.quantity;
	return (
		<div className={twMerge(className, styles.lineItem)}>
			{product?.images?.[0]?.location ? (
				<img
					data-item="cart-item__product.image"
					src={product?.images?.[0]?.location}
					alt={`${product.name}`}
					style={{ height: 50, maxHeight: 50, width: 50, maxWidth: 50 }}
					className="rounded border object-cover place-self-center"
				/>
			) : null}
			<div className={styles.info}>
				<H6
					data-item="cart-item__product.name-product.quantity)"
					className="flex"
				>
					{product.name} ({product.quantity})
				</H6>

				<div className="flex flex-row justify-between">
					<FlexBox className="flex-row">
						<Small data-item="cart-item__product.size-product.unit">
							{product.size} {product.unit}
						</Small>
						{!staticQuantity ? (
							<>
								<Small className="pl-1">@</Small>
								<Price
									data-item="cart-item__each-price"
									className="text-sm"
									basePrice={product.basePrice}
									salePrice={product.salePrice}
									discount={product.discount}
									quantity={quantity}
									useStaticQuantity={!staticQuantity}
								/>
							</>
						) : null}
					</FlexBox>
					<Price
						data-item="cart-item__price"
						className="text-sm"
						basePrice={product.basePrice}
						salePrice={product.salePrice}
						discount={product.discount}
						quantity={quantity}
						useStaticQuantity={staticQuantity}
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
