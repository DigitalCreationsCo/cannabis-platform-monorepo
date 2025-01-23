import { convertCentsToDollars } from '../../../../../core/src/utils';
import { type PricingProps } from './Pricing';

const messagingPrices: PricingProps = {
	title: 'Pricing',
	dealValues: [779, 1179, 4779, 979, 1479],
	prices: [
		{
			price: `$${convertCentsToDollars(48900)}`,
			description: 'Send compliant messages to your customers.',
			rate: 'monthly',
			text: 'Unlimited Messages',
		},
	],
	cta: 'Start Messaging My Customers',
};

export default messagingPrices;
