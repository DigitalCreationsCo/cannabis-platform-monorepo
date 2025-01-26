"use client"
import { useState } from 'react';
import { Button } from './button';
import Collapse from './Collapse';
import FlexBox from './FlexBox';

export type FAQDATA = {
	topic: 'Dispensaries' | 'Customers' | 'Drivers';
	q: string;
	value: any;
}[];

export const faqData: FAQDATA = [
	// Dispensary Q's

	{
		topic: 'Dispensaries',
		q: 'Who does the delivering?',
		value: `Gras has a team of professional deliverypersons who deliver your products.`,
	},
	{
		topic: 'Dispensaries',
		q: 'Is there a guarantee?',
		value: `Yes! If you're not satisfied with our delivery service for any reason, we'll give you 30 days free. We'll do the best we can to improve our service. 
        Gras does not issue refunds. `,
	},
	{
		topic: 'Dispensaries',
		q: 'Do you offer technical support? ',
		value: `Yes, we do. Gras support team is available 7 days a week to help you with any issues you may have. 
            You can reach us by email, phone, or text. We're here to help.`,
	},
	{
		topic: 'Dispensaries',
		q: 'How do I get started with Delivery by Gras?',
		value: `Hit the big button to create your account. 👇 
            Once you signup, you can view your account. Then, simply follow our setup guide to receive delivery orders.`,
	},
	{
		topic: 'Dispensaries',
		q: 'How much will I pay for Delivery by Gras?',
		value: `Gras charges your business a low monthly fee.
            We keep our fees low to offer you affordable, high quality delivery service.`,
	},
	{
		topic: 'Dispensaries',
		q: 'Okay I signed up. Now what?',
		value: `Sign in and follow our setup guide to receive delivery orders!`,
	},

	// DeliveryPerson Q's
	// {
	// 	topic: 'Drivers',
	// 	q: 'I want to deliver for Gras. How can I start?',
	// 	value: `Apply to drive for Gras here.`,
	// },
	{
		topic: 'Drivers',
		q: 'How old do i have to be drive for Gras?',
		value: `Gras Deliverypersons must be 21 years or older.`,
	},
	{
		topic: 'Drivers',
		q: 'Do you do a background check?',
		value: `Yep! We conduct a standard background check.`,
	},
	{
		topic: 'Drivers',
		q: 'How much can I earn driving?',
		value: `We offer a competitive wage per delivery, and a mileage reimbursement, up to 10 miles.`,
	},

	// Customer Q's
	{
		topic: 'Customers',
		q: 'Where do you deliver?',
		// value: `Gras currently delivers to patients in North New Jersey.
		// You can check if we deliver to your area by entering your zip code here.`,
		value: `Gras currently delivers to patients in North New Jersey.`,
	},
	{
		topic: 'Customers',
		q: 'How do I place an order?',
		value: (
			<>
				Order from your favorite Dispensary at{' '}
				<a
					className="text-lg hover:underline font-semibold"
					href={process.env.NEXT_PUBLIC_SHOP_APP_URL}
				>
					grascannabis.org/browse
				</a>
				.
			</>
		),
	},
];

export default function FAQ({ data = faqData }: { data?: FAQDATA }) {
	const [activeTopic, setTopic] =
		useState<FAQDATA[number]['topic']>('Dispensaries');
	const topics: FAQDATA[number]['topic'][] = [
		'Dispensaries',
		'Customers',
		'Drivers',
	];
	return (
		<FlexBox className="mx-auto items-center w-full max-w-2xl rounded-2xl p-8 px-2">
			<div className="tabs w-full pb-6">
				{topics.map((key) => (
					<Button
						bg="inverse"
						className="tab tab-bordered tab-active flex-1 btn btn-ghost text-dark text-xl font-normal capitalize"
						key={`FAQ-${key}`}
						onClick={() => setTopic(key)}
					>
						{key}
					</Button>
				))}
				{/* {Object.keys(helpTopics).map((key) => (
						<Link
							href={`?topic=${key}`}
							key={`help-topic-${key}`}
							onClick={() => setTopic(key as keyof typeof helpTopics)}
						>
							<Paragraph
								className={twMerge([
									'font-semibold',
									topic === key
										? 'tab tab-bordered tab-active'
										: 'tab tab-bordered',
									'hover:bg-gray-100 rounded-btn btn-ghost btn capitalize',
									topic === key ? 'text-primary' : 'text-dark-soft',
								])}
							>
								{key}
							</Paragraph>
						</Link>
					))} */}
			</div>
			{data.map(
				(item, index: number) =>
					item.topic === activeTopic && (
						<Collapse key={`faq-${index}`} item={item} />
					)
			)}
		</FlexBox>
	);
}
