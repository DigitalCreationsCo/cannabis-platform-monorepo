import { Icons } from '@cd/ui-lib';
import { type StaticImageData } from 'next/image';
import benefitOneImg from '../../../../public/get-order.png';
import benefitTwoImg from '../../../../public/pair-of-buds.png';

export const benefitDataDeliveryThatWorksForYou: BenefitData = {
	title: 'Delivery That Works For You',
	description: `We help you process delivery orders.
	// A Gras DeliveryPerson delivers quickly and safely to your customers. `,
	image: benefitOneImg,
	bullets: [
		{
			title: 'Secure Delivery',
			description:
				'Our Delivery team is trained in industry compliance and safety.',
			icon: Icons.UserAdmin,
		},
		{
			title: `So Easy You'll Giggle`,
			description: `Sign up and receive deliveries the same day.`,
			icon: Icons.CheckmarkOutline,
		},
		{
			title: 'Same-Day Delivery',
			description:
				'We guarantee delivery within 2 hours in Baltimore, Maryland.',
			icon: Icons.ShoppingBag,
		},
	],
};

export const benefitDataStableBusinessAndGrowth = {
	title: 'We Value Stable Business And Growth',
	description: `Gras is investing in the growth of your dispensary. Our goal is for you to have your best years in business yet. `,
	image: benefitTwoImg,
	bullets: [
		{
			title: 'Industry Compliant',
			desc: 'We follow all state compliance guidelines for delivery and sale of cannabis.',
			icon: Icons.TaskComplete,
		},
		{
			title: 'Support When You Need It',
			description:
				"Gras support is available by phone, email and chat. We're only a phone call or a click away.",
			icon: Icons.ServiceDesk,
		},
		{
			title: 'Your Growth Is Our Goal',
			description: `Gras is committed to long term growth. 
			We believe in building a sustainable cannabis industry.`,
			icon: Icons.IncreaseLevel,
		},
	],
};

export type BenefitData = {
	title?: string;
	description?: string;
	image?: StaticImageData | string;
	bullets: {
		title: string;
		description?: string;
		icon: any;
	}[];
};
