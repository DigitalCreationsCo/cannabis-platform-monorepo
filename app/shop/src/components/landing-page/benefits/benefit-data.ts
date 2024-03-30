import { Icons } from '@cd/ui-lib';
import { type StaticImageData } from 'next/image';
import FleetTrackingImage from '../../../../public/fleet-tracking-and-app-view.png';
import benefitOneImg from '../../../../public/get-order.png';
import benefitTwoImg from '../../../../public/pair-of-buds.png';

export const benefitDataDeliveryThatWorksForYou: BenefitData = {
	title: 'We Make Cannabis Delivery Easy',
	description: `With Flexible Delivery Service That Suits Your Business.`,
	image: benefitOneImg,
	bullets: [
		{
			// title: `We Make Cannabis Delivery Easy`,
			description: `Fast and easy same-day delivery.`,
			icon: Icons.CheckmarkOutline,
		},
		{
			title: 'Secure Delivery',
			description:
				'Our delivery team is trained in compliant and safe delivery.',
			icon: Icons.UserAdmin,
		},
		{
			title: 'Fastest Delivery In The City',
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
	title: 'We Drive Retail Business Growth',
	description: `Your Vision + Our Support = Success`,
	image: benefitTwoImg,
	bullets: [
		{
			// title: 'Your Goals Are Our Goals',
			description: `Our team is committed to growing your business.`,
			icon: Icons.IncreaseLevel,
		},
		{
			// title: 'Support When You Need It',
			description: 'Support is a phone call or a click away.',
			icon: Icons.ServiceDesk,
		},
	],
};

export type BenefitData = {
	title?: string;
	description?: string;
	image?: StaticImageData | string;
	bullets: {
		title?: string;
		description?: string;
		icon: any;
	}[];
};
