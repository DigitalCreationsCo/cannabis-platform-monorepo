import { OrderStatus, OrderWithDetails, Schedule } from '@cd/data-access';

export const checkOrderIsCompleteOrCanceled = (order: OrderWithDetails) =>
    order.status === 'Cancelled' || order.status === 'Delivered';

export const orderStatusList: OrderStatus[] = ['Pending', 'Processing', 'Delivered', 'Cancelled'];

export function calcSalePrice(price: number, discount: number) {
    return price - (price * discount) / 100;
}

export const parseDaysFromSchedule = (days: number) => String(days).split("").map(Number)

export const checkDispensaryIsOpen = (schedule: Schedule) => {
    const now = new Date();

    const { openAt, closeAt } = schedule
    const openTime = new Date();
    
    const closeTime = new Date();
    const days = parseDaysFromSchedule(schedule.days)

    const result = days.includes(now.getDay()) && now > openTime && now < closeTime
    console.log('result', result)
    return result
}