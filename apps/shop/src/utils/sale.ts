export function calcSalePrice(price: number, discount: number) {
    return price - (price * discount) / 100;
}
