import DeliveryBox from '@cd/ui-lib/src/icons/DeliveryBox';
import { StopIcon } from '@heroicons/react/20/solid';
import {
	ChatBubbleLeftEllipsisIcon,
	UserCircleIcon,
	PresentationChartLineIcon,
	ArrowDownOnSquareStackIcon,
	ClipboardDocumentCheckIcon,
	CalendarIcon,
	CheckIcon,
	TruckIcon,
	ClockIcon,
	HeartIcon,
	ShareIcon,
	UserGroupIcon,
	QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { type StaticImageData } from 'next/image';
import FleetTrackingImage from '../../../public/fleet-tracking-and-app-view.png';

export const unlockYourGrowth = {
	title: 'We Unlock Hyper Growth For Your Dispensary',
	description: `Your Vision & Our Support = Your Success`,
	image: require('../../../public/dispensary.png'),
	bullets: [
		{
			description:
				'Our service is designed help you target and reach higher goals.',
			icon: PresentationChartLineIcon,
		},
		{
			description: `We invest in the growth of your company for long-term success.`,
			icon: CalendarIcon,
		},
		{
			description: 'Our support team is a phone call or a click away.',
			icon: ArrowDownOnSquareStackIcon,
		},
	],
	cta: `I'm ready to 2X My Business`,
};

export const automateDeliveryCompliance: BenefitData = {
	title: `Relax, We Keep Your Delivery Compliant`,
	description: `With Automation That Suits Your Business`,
	image: require('../../../public/compliance.png'),
	bullets: [
		{
			description: `No more paper manifests. Automate your records.`,
			icon: CheckIcon,
		},
		{
			description: `Electronic records eliminate mistakes and keep your drivers on the road.`,
			icon: DeliveryBox,
		},
		{
			description:
				'State audit? No sweat. Your records are backed up and always available.',
			icon: ClipboardDocumentCheckIcon,
		},
	],
	cta: `Fix my delivery compliance`,
};

export const trackDeliveries: BenefitData = {
	title: 'Your Drivers Will Stay On Track',
	description: `Track delivery drivers, orders and make adjustments on the fly`,
	image: FleetTrackingImage,
	bullets: [],
	cta: `Upgrade my delivery service`,
};

export const deliveryManagementService: BenefitData = {
	title: 'Make Cannabis Delivery A Breeze',
	description: `Delivery Management Service`,
	image: require('../../../public/sun.png'),
	bullets: [
		{
			description: `No more paper manifests. Automate your records.`,
			icon: CheckIcon,
		},
		{
			description: `Your drivers keep driving. We handle the rest.`,
			icon: TruckIcon,
		},
		{
			description:
				'State audit? No sweat. Your records are backed up and always available.',
			icon: ClipboardDocumentCheckIcon,
		},
	],
	cta: `Automate my delivery service`,
};

export const fullServiceDelivery: BenefitData = {
	title: 'Outsource Your Delivery',
	description: `Our Full Service Delivery has you covered from your doorstep to your customers. Here's what you can expect:`,
	// image: require('../../../public/delivery-4.png'),
	bullets: [
		// {
		// 	description: `Same-day delivery by our Delivery Team.`,
		// 	icon: Icons.DeliveryParcel,
		// },
		{
			title: `Improved Delivery Times`,
			description: `Drivers stay out of traffic with navigation, delighting your customers with short wait times.`,
			icon: ClockIcon,
		},
		// {
		// 	description:
		// 		'Our delivery team is trained in compliant and safe delivery.',
		// 	icon: Icons.UserAdmin,
		// },
		{
			title: `Compliance, Guaranteed`,
			description: `We follow compliant regulations without fail, giving you the ultimate peace of mind.`,
			icon: CheckIcon,
		},
		{
			title: 'Say Goodbye To Order Mix-Ups',
			description:
				'Technology makes sure every order is accurate. Our delivery process makes sure drivers pick up the correct order every time, for happier customers and fewer returns.',
			icon: StopIcon,
		},
		{
			title: `Boost Customer Satisfaction`,
			description: `We prioritize exceptional service that gets you rave reviews and repeat business.`,
			icon: HeartIcon,
		},
	],
	cta: `Outsource my delivery`,
};

export const consumerTextMessaging: BenefitData = {
	title: 'Stay In Touch With Your Customers',
	description: `With engaging and trusted experiences that make their day better, and keep them coming back`,
	image: require('../../../public/message.png'),
	bullets: [
		{
			description: 'Share events, promotions, new products, and order updates.',
			icon: ShareIcon,
		},
		{
			description: 'Keep your customers coming back with deals and events.',
			icon: HeartIcon,
		},
		{
			description: 'Build a community and build trust.',
			icon: UserGroupIcon,
		},
	],
	cta: `Starting messaging my customers`,
};

export const messageSupport: BenefitData = {
	title: 'Support That Keeps You Going',
	description: `You always have access to our customer support and success teams.`,
	// image: require('../../../public/message.png'),
	bullets: [
		{
			description: 'Deliver trusted customer experiences with compliance.',
			icon: UserCircleIcon,
		},
		{
			description:
				'Guidance from industry-leading marketers helps you build engagement.',
			icon: ChatBubbleLeftEllipsisIcon,
		},
		{
			description: 'Technical support is available online and via email.',
			icon: QuestionMarkCircleIcon,
		},
	],
	cta: `Starting messaging my customers`,
};

export const takeUrgentAction: BenefitData = {
	title: `Most people hope and pray that things will get easier, when they could be taking action to make it better.`,
	description: `With trusted text messaging that keeps them coming back`,
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

export const dealValue: BenefitData = {
	title: `We Offer More Than Value`,
	description: `We provide experiences that create loyal customers who keep coming back for more.`,
	bullets: [
		{
			title: `Delivery Compliance Service`,
			icon: CheckIcon,
		},
		{
			title: `Delivery Management Service`,
			icon: CheckIcon,
		},
		{
			title: `Full Service Delivery`,
			icon: CheckIcon,
		},
		{
			title: `Consumer Messaging`,
			icon: CheckIcon,
		},
		{
			title: `Events Promotion`,
			icon: CheckIcon,
		},
	],
};

export interface BenefitData {
	title?: string;
	description?: string;
	image?: StaticImageData | string;
	bullets: {
		title?: string;
		description?: string;
		icon: any;
	}[];
	cta?: string;
}
