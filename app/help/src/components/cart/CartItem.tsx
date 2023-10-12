import { type ProductVariantWithDetails } from '@cd/data-access';
import { IconButton, Icons, ProductItem } from '@cd/ui-lib';

import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type CartItemProps = {
	className?: string;
	product: ProductVariantWithDetails;
	handleConfirm?: any;
	editable?: boolean;
};

function CartItem({
	product,
	className,
}: // editable = false,
// handleConfirm
CartItemProps & PropsWithChildren) {
	return (
		<div className={twMerge('flex flex-row space-x-4', className)}>
			<ProductItem data={product} />
			<IconButton Icon={Icons.Subtract} />
			<IconButton Icon={Icons.Add} />
		</div>
	);
}

export default CartItem;
