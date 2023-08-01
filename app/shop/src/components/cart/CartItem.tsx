import { ProductVariantWithDetails } from '@cd/data-access';
import { IconButton, Icons, ProductItem } from '@cd/ui-lib';

import { PropsWithChildren, useState } from 'react';

type CartItemProps = {
  className?: string;
  product: ProductVariantWithDetails;
  handleConfirm?: any;
  editable?: boolean;
};

function CartItem({
  product,
  className,
  editable = false,
  handleConfirm,
}: CartItemProps & PropsWithChildren) {
  const [quantity, setQuantity] = useState(product.quantity);

  return (
    <div className="flex flex-row space-x-4">
      <ProductItem data={product} />
      <IconButton Icon={Icons.Subtract} />
      <IconButton Icon={Icons.Add} />
    </div>
  );
}

export default CartItem;
