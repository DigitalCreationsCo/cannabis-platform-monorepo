import { Order } from '@cd/data-access';
import { format } from 'date-fns';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Icons from './icons';
import IconWrapper from './IconWrapper';
import Price from './Price';
import Row from './Row';
import { H6, Paragraph } from './Typography';
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
        <Link href={`${orderDetailsRoute}/${order.id}`}>
            <Row className="h-[48px] justify-between">
                <H6 className="w-[100px]">{order.id}</H6>
                <Paragraph className={twMerge('grow', `text-${getColor(order.status)}`)}>{order.status}</Paragraph>
                <Paragraph className="w-[140px] flex justify-center w-[120px]">
                    {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                </Paragraph>
                <H6 className="w-[80px] flex justify-center w-[80px]">
                    <Price price={order.total} />
                </H6>
                <IconWrapper Icon={Icons.Right} />
            </Row>
        </Link>
    );
}

export default OrderRow;
