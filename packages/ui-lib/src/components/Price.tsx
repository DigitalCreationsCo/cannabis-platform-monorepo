import { calcSalePrice, convertCentsToDollars } from '@cd/core-lib/src/utils/transaction';
import { twMerge } from 'tailwind-merge';
import { Paragraph } from './Typography';

type PriceProps = {
    basePrice: number;
    salePrice?: number;
    discount?: number;
    quantity?: number;
    className?: string;
    locale?: string; // country
    showDiscount?: boolean;
    showOriginalPrice?: boolean;
};

function Price({ 
    basePrice, 
    salePrice, 
    discount = 0, 
    quantity = 1 ,
    className, 
    showDiscount = false,
    showOriginalPrice = false,
    locale = 'en-us' }: PriceProps) {
    const _currencySymbol: any = { 'en-us': '$' };

    const base = basePrice * quantity;
    
    const toDollars = (value: number): string => convertCentsToDollars(value);

    // discount is a flat number representing percentage off
    function computeSalePrice() {
        let _salePrice: number
        let _discount = discount
            if (salePrice) {
                _salePrice = salePrice * quantity;
            } else {
                console.log('basePrice: ', basePrice)
                console.log('discount: ', _discount)
                console.log('sale price: ', calcSalePrice(basePrice, _discount) * quantity)
                _salePrice = calcSalePrice(basePrice, _discount) * quantity;
            }
        return _salePrice
    }

    return <div className={twMerge("flex flex-row space-x-2 pl-2", className)}>
        {showOriginalPrice && <Paragraph className="text-dark">{_currencySymbol[locale] + toDollars(base)}</Paragraph>}
        {showDiscount && <Paragraph className="text-accent">`${discount}% off`</Paragraph> }
        
        <Paragraph className="text-dark">{_currencySymbol[locale] + toDollars(computeSalePrice())}</Paragraph>
        </div>;
}

export default Price;
