import { type Price, type Service } from '@cd/data-access';
import getSymbolFromCurrency from 'currency-symbol-map';
import { Button } from '@cd/ui-lib';

interface PaymentButtonProps {
  plan: Service;
  price: Price;
  initiateCheckout: (priceId: string, quantity?: number) => void;
}

const PaymentButton = ({
  plan,
  price,
  initiateCheckout,
}: PaymentButtonProps) => {
  const metadata = price.metadata;
  const currencySymbol = getSymbolFromCurrency(price.currency || 'USD');
  let buttonText = 'Get Started';

  if (metadata?.interval === 'month') {
    buttonText = price.amount
      ? `${currencySymbol}${price.amount} / month`
      : `Monthly`;
  } else if (metadata?.interval === 'year') {
    buttonText = price.amount
      ? `${currencySymbol}${price.amount} / year`
      : `Yearly`;
  }

  return (
    <Button
      key={`${plan.id}-${price.id}`}
      color="primary"
      size="md"
      onClick={() => {
        initiateCheckout(
          price.id,
          (price.billingScheme == 'per_unit' ||
            price.billingScheme == 'tiered') &&
            metadata?.usage_type !== 'metered'
            ? 1
            : undefined
        );
      }}
      className="rounded-full"
    >
      {buttonText}
    </Button>
  );
};

export default PaymentButton;
