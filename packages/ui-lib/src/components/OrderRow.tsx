import { truncate } from '@cd/core-lib';
import { type Order } from '@cd/data-access';
import { formatInTimeZone } from 'date-fns-tz';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Price from './Price';
import Row from './Row';
import { H6, Paragraph, Small } from './Typography';
type OrderRowProps = {
	order: Order;
	orderDetailsRoute: string;
	className?: string | string[];
};

function OrderRow({ order, orderDetailsRoute, className }: OrderRowProps) {
	return (
		<Link href={`${orderDetailsRoute}/${order.id}`}>
			<Row className={twMerge('grid grid-cols-12 h-[48px]', className)}>
				<H6 className="col-span-4">{truncate(order.id)}</H6>
				<Paragraph
					className={twMerge(
						'col-span-4',
						`text-${getOrderStatusColor(order.orderStatus)}`,
					)}
				>
					{order.orderStatus}
				</Paragraph>

				<Small className="col-span-2">
					{formatInTimeZone(
						new Date(order.createdAt),
						Intl.DateTimeFormat().resolvedOptions().timeZone,
						'MMM dd, hh:mm',
					)}
				</Small>
				<Price
					className="col-span-2 justify-self-end"
					basePrice={order.total}
				/>
				{/* <IconWrapper
					className="hidden sm:block col-span-1 justify-self-end"
					iconSize={16}
					Icon={Icons.Right}
				/> */}
			</Row>
		</Link>
	);
}

export default OrderRow;

export const getOrderStatusColor = (status: Order['orderStatus']) => {
	switch (status) {
		case 'Pending':
			return 'default';
		case 'Processing':
			return 'primary';
		case 'OnDelivery':
			return 'primary';
		case 'Delivered':
			return 'secondary';
		case 'Cancelled':
			return 'default-soft';
		default:
			return '';
	}
};
