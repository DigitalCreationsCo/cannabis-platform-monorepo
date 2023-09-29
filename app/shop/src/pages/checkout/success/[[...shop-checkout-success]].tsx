import { cartActions, selectCartState, TextContent } from '@cd/core-lib';
import { type ProductVariant } from '@cd/data-access';
import {
	Card,
	Center,
	FlexBox,
	H3,
	Page,
	Paragraph,
	Price,
	ProductItem,
	Small,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { useEffect } from 'react';
import Confetti from 'react-confetti';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../redux/hooks';

function CheckoutSuccess() {
	const dispatch = useAppDispatch();
	const { order } = useSelector(selectCartState);

	useEffect(() => {
		dispatch(cartActions.emptyCart());
	}, [dispatch]);

	return (
		<Page>
			<Confetti numberOfPieces={540} recycle={false} />
			<Card className="m-auto cursor-default md:max-w-[500px]">
				<Center className="space-y-4">
					<H3 className="text-primary hover:text-primary-light transition">
						{TextContent.shop.THANK_CUSTOMER_f(order?.organization.name)}
					</H3>
					<Paragraph>{TextContent.shop.PAYMENT_SUCCESSFUL}</Paragraph>
					<FlexBox>
						<Paragraph className="w-full text-left">
							{TextContent.shop.ORDER_INFO_HEADER}
						</Paragraph>
						{order?.items.map((item: ProductVariant, index: number) => (
							<ProductItem key={`bag-item-${index}`} data={item} />
						))}
						<Small className="flex w-full flex-row justify-end pr-4">
							subtotal
							<Price basePrice={order?.subtotal} />
						</Small>
						<Small className="flex w-full flex-row justify-end pr-4">
							Delivery Fee 0{/* <Price basePrice={order?.total} /> */}
						</Small>
						<Small className="flex w-full flex-row justify-end pr-4">
							Tax
							<Price basePrice={order?.total} />
						</Small>
						<Small className="flex w-full flex-row justify-end pr-4">
							Total
							<Price basePrice={order?.total} />
						</Small>
					</FlexBox>
					<Small>
						{TextContent.info.THANK_YOU}
						{'\n'}
						Both <b>{order?.organization.name}</b> and <b>Gras</b> appreciate
						your business and the opportunity to serve our community.
						{/* ❤️ */}
					</Small>
					<Small>
						<b>{TextContent.info.SMS_UPDATE}</b>
						{'\n'}
						{TextContent.shop.RECEIPT_TO_EMAIL_f(order?.customer.email)}
						{'\n'}
					</Small>
				</Center>
			</Card>
		</Page>
	);
}

export default CheckoutSuccess;

CheckoutSuccess.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});
