import Collapse from './Collapse';
import FlexBox from './FlexBox';

export default function FAQ() {
	return (
		<FlexBox className="mx-auto items-center w-full max-w-2xl rounded-2xl p-8">
			<div>
				{faqdata.map((item, index: number) => (
					<Collapse key={`faq-${index}`} item={item} />
				))}
			</div>
		</FlexBox>
	);
}

const faqdata = [
	{
		q: 'How do I get started with Delivery by Gras?',
		value: `Hit the big button to create your account. 👇 
			Once you signup, you can view your account. Then, simply follow our setup guide to receive delivery orders.`,
	},
	{
		q: 'I signed up. Now what?',
		value: `Follow our setup guide to receive delivery orders!`,
	},
	{
		q: 'How much will I pay for Delivery by Gras?',
		value: `Gras charges your business a low monthly fee. Its that simple. 
			We keep our fees low to offer you affordable, high quality delivery service.`,
	},
	{
		q: 'Is there a guarantee?',
		value: `Yes! If you're not satisfied with our delivery service for any reason, we'll give you 30 days free. We'll do the best we can to improve our service. 
		Gras does not issue refunds. `,
	},
	{
		q: 'Do you offer technical support? ',
		value: `Yes, we do. Gras support team is available 7 days a week to help you with any issues you may have. 
			You can reach us by email, phone, or text. We're here to help.`,
	},
];
