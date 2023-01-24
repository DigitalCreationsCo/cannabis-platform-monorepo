import React from 'react';
type PriceProps = {
    price: number;
    className?: string;
    locale?: string; // country
};

function Price({ price, className, locale = 'en-us' }: PriceProps) {
    const _currencySymbol: any = { 'en-us': '$' };
    function convertCentsToDollars(cents: number) {
        const number = Number(((cents / 100) * 100) / 100);
        return number.toFixed(2);
        // V this statement interrupts React hydration
        // return number.toLocaleString(locale, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }
    const renderPriceString = (value: number): string => convertCentsToDollars(value);
    return <div className={className}>{_currencySymbol[locale] + renderPriceString(price)}</div>;
}

export default Price;
