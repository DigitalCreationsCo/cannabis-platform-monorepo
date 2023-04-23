import { OrderStatus, OrderWithDetails } from '@cd/data-access';

const orderStatusList: OrderStatus[] = ['Pending', 'Processing', 'Delivered', 'Cancelled'];

/**
 * returns the order status as a boolean
 * @param order 
 * @returns 
 */
const checkOrderIsCompleteOrCanceled = (order: OrderWithDetails) =>
    order.orderStatus === 'Cancelled' || order.orderStatus === 'Delivered';

/**
 * calculates the price of an item after discount
 * @param price 
 * @param discount 
 * @returns 
 */
function calcSalePrice(price: number, discount: number) {
    return price - (price * discount) / 100;
}

/**
 * gets the currency symbol for a given currency code
 * @param currency 
 * @returns 
 */
function getCurrencySymbol(currency: any) {
    const currencySymbol = new Intl.NumberFormat('en', {
      currency,
      style: 'currency' 
    }).formatToParts(0).find(part => part.type === 'currency');
    return currencySymbol && currencySymbol.value;
}

/**
 * Converts a price from cents to decimal value
 * @param cents 
 * @returns converted dollar value with 2 decimal values
 */
function convertCentsToDollars(cents: number) {
    const number = Number(((cents / 100) * 100) / 100);
    return number.toFixed(2);
    // V Beware: this statement interrupts React hydration
    // return number.toLocaleString(locale, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

/**
 * Converts a dollar value to a whole number
 * @param value a dollar value with up to 2 decimal values
 * @returns a whole number conversion
 */
function convertDollarsToWholeNumber(value: number) {
    return Math.round(value * 100);
}

/**
 * Determines the platform fee for every transaction
 * note: HARD CODE THIS VALUE
 * @param amount 
 * @returns 
 */
function calculatePlatformFeeForTransaction(amount: number) {
    //   return Math.round(amount * 0.1)
    return amount
}
    

export {
    orderStatusList,
    checkOrderIsCompleteOrCanceled,
    calcSalePrice,
    getCurrencySymbol,
    convertCentsToDollars,
    convertDollarsToWholeNumber,
    calculatePlatformFeeForTransaction
};

