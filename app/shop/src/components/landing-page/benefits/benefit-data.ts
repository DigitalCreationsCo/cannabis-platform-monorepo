import { Icons } from '@cd/ui-lib';
import { type StaticImageData } from 'next/image';
import FleetTrackingImage from '../../../../public/fleet-tracking-and-app-view.png';
import benefitOneImg from '../../../../public/get-order.png';
import benefitTwoImg from '../../../../public/pair-of-buds.png';

export const benefitDataDeliveryThatWorksForYou: BenefitData = {
	title: 'Delivery That Works For You',
	description: `Offering flexible delivery service to suit your business.`,
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
			description: `Fast and easy same-day delivery.`,
			icon: Icons.CheckmarkOutline,
		},
		{
			title: 'Same-Day Delivery',
			description: 'We guarantee delivery within 2 hours in New York City',
			icon: Icons.ShoppingBag,
		},
	],
};

export const benefitDataTrackYourOrders: BenefitData = {
	title: 'Helping You Stay On Track',
	description: `Track delivery drivers and orders, and easily make adjustments.`,
	image: FleetTrackingImage,
	bullets: [],
};

export const benefitDataStableBusinessAndGrowth = {
	title: 'We Value Stable Business Growth',
	description: `Your goals are our goals. We're here to help you grow.`,
	image: benefitTwoImg,
	bullets: [
		{
			title: 'Support When You Need It',
			description: 'Support is a phone call or a click away.',
			icon: Icons.ServiceDesk,
		},
		{
			title: 'Your Goals Are Our Goals',
			description: `Gras is committed to sustainable growth in the cannabis industry.`,
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
