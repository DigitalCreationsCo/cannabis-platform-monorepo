import {
	renderAddress,
	selectOrder,
	selectUserState,
	TextContent,
	useAppSelector,
} from '@cd/core-lib';
import { type OrderWithShopDetails } from '@cd/data-access';
import {
	Button,
	Card,
	FlexBox,
	Grid,
	H5,
	H6,
	Page,
	Paragraph,
	Price,
	Row,
	Span,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { getOrderStatusColor } from '@cd/ui-lib/src/components/OrderRow';
import { format } from 'date-fns-tz';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import logo from '../../../../public/logo.png';
import { wrapper } from '../../../store';

function ViewOrder({ orderId }: { orderId: string }) {
	const { user } = useAppSelector(selectUserState);
	const order = useAppSelector(selectOrder(orderId)) as OrderWithShopDetails;
	return (
		<Page className="pb-0 md:pb-24">
			<div className="mx-auto max-w-[600px] space-y-4 pt-4 md:pt-0">
				<Button
					bg="inverse"
					hover="accent-soft"
					className="text-dark hover:text-light"
				>
					<Link href={TextContent.href.orders_f(user.id)} className="max-w-min">
						Back to Orders
					</Link>
				</Button>
				<Card className="mx-auto !w-full px-4 md:!w-full lg:!w-full">
					<Grid className="gap-2 pt-2">
						<Row className="grid h-[55px] grid-cols-12 justify-between pt-0 shadow-none drop-shadow-none md:shadow md:drop-shadow">
							<H6 className="col-span-6">
								{`Ordered at ${format(
									new Date(order.createdAt),
									'MMM dd, yyyy, hh:mm',
								)}`}
							</H6>
							<Paragraph
								className={twMerge(
									'col-span-6',
									`text-${getOrderStatusColor(order.orderStatus)}`,
								)}
							>
								{order.orderStatus}
							</Paragraph>
						</Row>
						<Paragraph className="whitespace-nowrap">
							{user.username}
							<br />
							<Span className="whitespace-nowrap font-semibold">
								{`${user.firstName} ${user.lastName}`}
							</Span>
						</Paragraph>
						<Paragraph>
							{renderAddress({ address: order.destinationAddress })}
						</Paragraph>
						<FlexBox className="join flex-col items-stretch space-x-0">
							<Row className="join-item h-[44px] items-center justify-start shadow-none drop-shadow-none md:shadow md:drop-shadow">
								<H6>{TextContent.ui.ITEMS}</H6>
							</Row>

							{order.items.map((item, index: number) => (
								<Row
									key={`order-item-${index}`}
									className="join-item flex shadow-none drop-shadow-none sm:h-[66px] md:space-x-4 md:shadow md:drop-shadow"
								>
									<Image
										src={item.images?.[0]?.location || logo}
										className={twMerge('hidden sm:block sm:visible ')}
										alt={`order-item-${item.id}`}
										height={64}
										width={64}
									/>
									<FlexBox className="grow ">
										<Paragraph>{item.name}</Paragraph>
									</FlexBox>
									<Paragraph>x{item.quantity}</Paragraph>
									<Price
										basePrice={item.basePrice}
										discount={item.discount}
										salePrice={item.salePrice}
									/>
								</Row>
							))}
						</FlexBox>
						<FlexBox className="flex flex-col">
							<FlexBox className="grid w-full grid-cols-12 flex-row items-center justify-between">
								<H5 className="col-span-3">Subtotal</H5>
								<div className="divider-horizontal col-span-6 w-full border"></div>
								<H6 className="col-span-3 justify-self-end">
									<Price basePrice={order.subtotal} />
								</H6>
							</FlexBox>
							<FlexBox className="grid w-full grid-cols-12 flex-row items-center justify-between">
								<H5 className="col-span-3">Delivery Fee</H5>
								<div className="divider-horizontal col-span-6 w-full border"></div>
								<H6 className="col-span-3 justify-self-end">
									<Price basePrice={order.deliveryFee + order.mileageFee} />
								</H6>
							</FlexBox>
							<FlexBox className="grid w-full grid-cols-12 flex-row items-center justify-between">
								<H5 className="col-span-3">Tax</H5>
								<div className="divider-horizontal col-span-6 w-full border"></div>
								<H6 className="col-span-3 justify-self-end">
									<Price basePrice={order.taxAmount} />
								</H6>
							</FlexBox>
							<FlexBox className="grid w-full grid-cols-12 flex-row items-center justify-between">
								<H5 className="col-span-3">Total</H5>
								<div className="divider-horizontal col-span-6 w-full border"></div>
								<H6 className="col-span-3 justify-self-end">
									<Price basePrice={order.total} />
								</H6>
							</FlexBox>
						</FlexBox>
						This needs to accurately reflect the price total of order!
					</Grid>
				</Card>
			</div>
		</Page>
	);
}

ViewOrder.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default ViewOrder;

export const getServerSideProps = wrapper.getServerSideProps(
	() =>
		async ({ query }: any) => {
			try {
				if (!query['shop.view-order']) throw new Error(`no order query`);
				return {
					props: {
						orderId: query['shop.view-order'],
					},
				};
			} catch (error) {
				return {
					notFound: true,
				};
			}
		},
);
