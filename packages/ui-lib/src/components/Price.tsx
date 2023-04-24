import { convertCentsToDollars } from '@cd/core-lib/src/utils/transaction';
import { twMerge } from 'tailwind-merge';

type PriceProps = {
    price: number;
    className?: string;
    locale?: string; // country
};

function Price({ price, className, locale = 'en-us' }: PriceProps) {
    const _currencySymbol: any = { 'en-us': '$' };
    const renderPriceString = (value: number): string => convertCentsToDollars(value);
    return <div className={twMerge(className, "text-dark")}>{_currencySymbol[locale] + renderPriceString(price)}</div>;
}

export default Price;
