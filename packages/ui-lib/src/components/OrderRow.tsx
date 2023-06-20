import { Order } from '@cd/data-access';
import { format } from 'date-fns';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Icons from '../icons';
import IconWrapper from './IconWrapper';
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
        <Link href={`${orderDetailsRoute}/${order.id}`}>
            <Row className="h-[48px]">
                <H6 className="w-[100px]">
                    {order.id}</H6>

                <Paragraph className={twMerge('grow', `text-${getColor(order.orderStatus)}`)}>
                    {order.orderStatus}
                </Paragraph>

                <Small>
                    {format(new Date(order.createdAt), 'MMM dd, yyyy, hh:mm a')}
                </Small>
                    
                <Price 
                basePrice={order.total} 
                />
                
                <IconWrapper 
                className="hidden sm:block" 
                iconSize={16} 
                Icon={Icons.Right} 
                />
            </Row>
        </Link>
    );
}

export default OrderRow;
