import { getDashboardSite, truncate } from '@cd/core-lib';
import { type Order } from '@cd/data-access';
import { format } from 'date-fns';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Price from './Price';
import Row from './Row';
import { H6, Paragraph, Small } from './Typography';
type OrderRowProps = {
	order: Order;
	orderDetailsRoute: string;
};

function OrderRow({ order, orderDetailsRoute }: OrderRowProps) {
	const getColor = (status: string) => {
		switch (status) {
			case 'Pending':
				return 'default';
			case 'Processing':
				return 'primary';
			case 'Delivered':
				return 'secondary';
			case 'Cancelled':
				return 'default-soft';
			default:
				return '';
		}
	};

	return (
		<Link href={getDashboardSite(`${orderDetailsRoute}/${order.id}`)}>
			<Row className="grid grid-cols-12 h-[48px]">
				<H6 className="col-span-4">{truncate(order.id)}</H6>
				<Paragraph
					className={twMerge(
						'col-span-4',
						`text-${getColor(order.orderStatus)}`,
					)}
				>
					{order.orderStatus}
				</Paragraph>

				<Small className="col-span-2">
					{format(new Date(order.createdAt), 'MMM dd, yyyy, hh:mm')}
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
