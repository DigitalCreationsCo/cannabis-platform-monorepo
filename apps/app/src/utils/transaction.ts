import { OrderStatus, OrderWithDetails } from '@cd/data-access/dist';

export const checkOrderIsCompleteOrCanceled = (order: OrderWithDetails) =>
    order.status === 'Cancelled' || order.status === 'Delivered';

export const orderStatusList: OrderStatus[] = ['Pending', 'Processing', 'Delivered', 'Cancelled'];
