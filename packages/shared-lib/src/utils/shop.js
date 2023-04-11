export const checkOrderIsCompleteOrCanceled = (order) => order.orderStatus === 'Cancelled' || order.orderStatus === 'Delivered';
export const orderStatusList = ['Pending', 'Processing', 'Delivered', 'Cancelled'];
export function calcSalePrice(price, discount) {
    return price - (price * discount) / 100;
}
export const parseDaysFromSchedule = (days) => String(days).split("").map(Number);
export const checkDispensaryIsOpen = (schedule) => {
    const now = new Date();
    const { openAt, closeAt } = schedule;
    const openTime = new Date();
    openTime.setHours(openAt);
    const closeTime = new Date();
    closeTime.setHours(closeAt);
    const days = parseDaysFromSchedule(schedule.days);
    const result = days.includes(now.getDay()) && now > openTime && now < closeTime;
    return result;
};
export const getCurrencySymbol = currency => {
    const currencySymbol = new Intl.NumberFormat('en', {
        currency,
        style: 'currency'
    }).formatToParts(0).find(part => part.type === 'currency');
    return currencySymbol && currencySymbol.value;
};
//# sourceMappingURL=shop.js.map