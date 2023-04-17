import { OrderStatus, OrderWithDetails, Schedule } from '@cd/data-access';

export const checkOrderIsCompleteOrCanceled = (order: OrderWithDetails) =>
    order.orderStatus === 'Cancelled' || order.orderStatus === 'Delivered';

export const orderStatusList: OrderStatus[] = ['Pending', 'Processing', 'Delivered', 'Cancelled'];

export function calcSalePrice(price: number, discount: number) {
    return price - (price * discount) / 100;
}

export const parseDaysFromSchedule = (days: number) => String(days).split("").map(Number)

export const checkDispensaryIsOpen = (schedule: Schedule) => {
    try {
        const now = new Date()

        const { openAt, closeAt } = schedule
        if (!openAt || !closeAt) {
            return null
        }

        const openTime = new Date();
        openTime.setHours(openAt)

        const closeTime = new Date();
        closeTime.setHours(closeAt)

        const days = parseDaysFromSchedule(schedule.days)
        const result = days.includes(now.getDay()) && now > openTime && now < closeTime

        return result ? 'open now' : 'closed';

    } catch (error) {
        return null
    }
}

export const getCurrencySymbol = (currency: any) => {
    const currencySymbol = new Intl.NumberFormat('en', {
      currency,
      style: 'currency' 
    }).formatToParts(0).find(part => part.type === 'currency');
    return currencySymbol && currencySymbol.value;
  }