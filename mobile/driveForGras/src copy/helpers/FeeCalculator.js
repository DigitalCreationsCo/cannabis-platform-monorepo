const FeesList = {
  PROMOTION_FEE: 0.12,
  SERVICE_FEE: 0.08,
  DELIVERY_FEE: 0.15,
};
const TaxCodes = {
  SALES_TAX: 0.06,
};

const tip = 300;

export const FeeCalculator = (subTotal) => {
  // total = convertCentsToDollars(total);
  const calcFee = (fee) => {
    return Math.round(subTotal * fee);
  };

  const fees = {
    promotionFee: calcFee(FeesList.PROMOTION_FEE),
    serviceFee: calcFee(FeesList.SERVICE_FEE),
    deliveryFee: calcFee(FeesList.DELIVERY_FEE),
    salesTax: calcFee(TaxCodes.SALES_TAX),
  };

  const { promotionFee, serviceFee, deliveryFee, salesTax } = fees;
  const feesList = [
    subTotal,
    promotionFee,
    serviceFee,
    deliveryFee,
    tip,
    salesTax,
  ];
  const total = feesList.reduce((sum, next) => sum + next);
  feesList.push(total);
  const formattedFeesList = feesList.map((fee) => [toCurrencyFormat(fee)]);
  return formattedFeesList;
};

export const convertCentsToDollars = (cents) => {
  console.log("cents: ", cents);
  return (((cents / 100) * 100) / 100).toFixed(2);
};

export const toCurrencyFormat = (val) => `$${convertCentsToDollars(val)}`;
