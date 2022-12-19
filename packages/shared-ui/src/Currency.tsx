import React from "react";
type CurrencyProps = {
    price: number;
    className?: string;
    locale?: string; // country
}

function Currency({ price, className, locale = "en-us" }: CurrencyProps) {
    locale = "en-us"
    const _currencySymbol = {"en-us": "$"}
    function convertCentsToDollars (cents: number) {
        const number = Number(cents / 100 * 100 / 100);
        return number.toFixed(2)
        // V this statement interrupts React hydration
        // return number.toLocaleString(locale, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    };
    const renderCurrencyString = (value:number):string => convertCentsToDollars(value);
    return (
        <div className={className}>
            { _currencySymbol[locale] + renderCurrencyString(price) }
        </div>
    )
}

export default Currency