import { Icons } from '@cd/ui-lib';
import { type StaticImageData } from 'next/image';
import FleetTrackingImage from '../../../../public/fleet-tracking-and-app-view.png';
import benefitOneImg from '../../../../public/get-order.png';
import benefitTwoImg from '../../../../public/pair-of-buds.png';

export const automateDeliveryCompliance: BenefitData = {
	title: `You can relax, 
	We handle compliant delivery.`,
	description: `With Flexible Automation That Suits Your Business.`,
	image: benefitOneImg,
	bullets: [
		{
			description: `No more paper manifests. Automate your records.`,
			icon: Icons.CheckboxChecked,
		},
		{
			description: `Your drivers keep driving. We handle the rest.`,
			icon: Icons.Delivery,
		},
		{
			description:
				'State audit? No sweat. Your records are backed up and always available.',
			icon: Icons.UserAdmin,
		},
	],
	cta: `I want to fix my delivery compliance`,
};

export const consumerTextMessaging: BenefitData = {
	title: 'We put you in touch with your customers',
	description: `With trusted text messaging that keeps them coming back`,
	// description: `With trusted text messaging that makes their day better, and keeps them coming back`,
	image: benefitOneImg,
	bullets: [
		// {
		// 	description: `No more paper manifests. Automate your records.`,
		// 	icon: Icons.CheckboxChecked,
		// },
		// {
		// 	description: `Your drivers keep driving. We handle the rest.`,
		// 	icon: Icons.Delivery,
		// },
		// {
		// 	description:
		// 		'State audit? No sweat. Your records are backed up and always available.',
		// 	icon: Icons.UserAdmin,
		// },
	],
};

export const deliveryManagementService: BenefitData = {
	title: 'We Make Cannabis Delivery A Breeze',
	description: `With Flexible Tech & Automation That Suits Your Business.`,
	image: benefitOneImg,
	bullets: [
		{
			description: `No more paper manifests. Automate your records.`,
			icon: Icons.CheckboxChecked,
		},
		{
			description: `Your drivers keep driving. We handle the rest.`,
			icon: Icons.Delivery,
		},
		{
			description:
				'State audit? No sweat. Your records are backed up and always available.',
			icon: Icons.UserAdmin,
		},
	],
	cta: `Automate my delivery service`,
};

export const fullServiceDelivery: BenefitData = {
	title: 'Outsource Your Delivery',
	description: `Your Delivery Service On Auto Pilot`,
	// image: FleetTrackingImage,
	bullets: [
		{
			description: `Fast and easy same-day delivery.`,
			icon: Icons.AlarmClock,
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
	cta: `Outsource my delivery service`,
};

export const trackDeliveries: BenefitData = {
	title: 'We Help Your Drivers Stay On Track',
	description: `Track delivery drivers, and orders live`,
	image: FleetTrackingImage,
	bullets: [],
};

export const unlockYourGrowth = {
	title: 'We Unlock Hyper Growth For Your Dispensary',
	description: `Your Vision + Our Support = Your Success`,
	image: benefitTwoImg,
	bullets: [
		{
			// title: 'Your Goals Are Our Goals',
			description: '',
			icon: Icons.IncreaseLevel,
		},
		{
			// title: 'Support When You Need It',
			description: 'Support is a phone call or a click away.',
			icon: Icons.ServiceDesk,
		},
	],
	cta: "I'm ready to 2X my dispensary",
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
	cta?: string;
};
