/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { type SubscriptionPlan } from '@cd/data-access';
import {
	Button,
	Card,
	FlexBox,
	H2,
	IconWrapper,
	Page,
	Paragraph,
	type LayoutContextProps,
	PageHeader,
} from '@cd/ui-lib';
import icons from '@cd/ui-lib/src/icons';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

function PricingPlans({ plans }: { plans: SubscriptionPlan[] }) {
	const [selectPlanIndex, setSelectPlanIndex] = useState<number | null>(null);
	const plansDummyData: SubscriptionPlan[] = [
		{
			id: '1',
			name: 'Delivery Management',
			description: `Use Gras to manage your in-house delivery operations`,
			price: 11,
			deliveryLimit: 32,
			currency: 'USD',
			isActive: true,
			featuresDelivery: false,
			featuresPickup: false,
			featuresDailyDeals: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: '2',
			name: 'Express Premium',
			description: `Our fully-managed delivery service. 
				Includes on-demand delivery and daily deals marketing`,
			price: 20,
			currency: 'USD',
			deliveryLimit: 20,
			isActive: true,
			featuresDelivery: true,
			featuresPickup: false,
			featuresDailyDeals: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: '3',
			name: 'Express Gold',
			description: `Stand out to new customers in your area. 
			Includes on-demand delivery and consumer marketing`,
			price: 25,
			deliveryLimit: 99,
			currency: 'USD',
			isActive: true,
			featuresDelivery: true,
			featuresPickup: false,
			featuresDailyDeals: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	];

	const colorMap: Record<string, any> = {
		'1': {
			text: 'text-dark',
			main: 'gray-500',
			accent: 'amber-300',
			active: 'amber-400',
		},
		'2': {
			text: 'text-light',
			main: 'primary-light',
			accent: '[#53ba70]',
			active: 'primary',
		},
		'3': {
			text: 'text-dark',
			main: 'amber-200',
			accent: 'amber-300',
			active: 'amber-400',
		},
	};

	return (
		<Page className={'bg-light min-h-[820px]'}>
			<PageHeader
				title="Pick a plan that works best for your business"
				className="mx-auto"
			></PageHeader>
			<FlexBox className="md:flex-row gap-4">
				{plansDummyData.map((plan, index) => (
					<Card
						key={`plan-${index}`}
						className={twMerge(
							index === selectPlanIndex
								? 'border-2 border-primary-light'
								: 'border-2 border-transparent',
							`flex !shadow-lg flex-col h-full mx-auto md:items-center px-8 bg-${
								colorMap[plan.id]['accent']
							}`,
						)}
					>
						<H2>{plan.name}</H2>

						<Paragraph className="grow mt-2 font-semibold text-gray-500">
							{plan.description}
						</Paragraph>

						<Paragraph className="font-semibold mt-4">
							{/* {getCurrencySymbol(plan.currency) +
								convertCentsToDollars(plan.price)}/month */}
							{plan.price}% commission per delivery
						</Paragraph>

						<hr className="w-full my-4 border" />

						<div className="space-y-2">
							<FlexBox className="flex flex-row items-center space-x-2">
								<IconWrapper
									iconColor={
										plan.featuresDelivery
											? colorMap[plan.id]['main']
											: 'gray-300'
									}
									Icon={
										plan.featuresDelivery
											? icons.CheckmarkFilled
											: icons.CloseFilled
									}
								/>
								<Paragraph>{'Fast and Secure Delivery by Gras'}</Paragraph>
							</FlexBox>
							<FlexBox className="flex flex-row items-center space-x-2">
								<IconWrapper
									iconColor={
										plan.deliveryLimit > 0
											? colorMap[plan.id]['main']
											: 'gray-300'
									}
									Icon={
										plan.deliveryLimit > 0
											? icons.CheckmarkFilled
											: icons.CloseFilled
									}
								/>
								<Paragraph>
									{plan.deliveryLimit === 99
										? `Unlimited Daily Deliveries`
										: `${plan.deliveryLimit} daily deliveries`}
								</Paragraph>
							</FlexBox>
							<FlexBox className="flex flex-row items-center space-x-2">
								<IconWrapper
									iconColor={
										plan.featuresDailyDeals
											? colorMap[plan.id]['main']
											: 'gray-300'
									}
									Icon={
										plan.featuresDailyDeals
											? icons.CheckmarkFilled
											: icons.CloseFilled
									}
								/>
								<Paragraph>{'Includes Daily Deals marketing'}</Paragraph>
								{/* <div className='underline tool-tip' data-tip='hello'>Learn more</div> */}
							</FlexBox>
						</div>

						<Button
							className={`${colorMap[plan.id]['text']} !mt-12 bg-${
								colorMap[plan.id]['main']
							} hover:bg-${colorMap[plan.id]['accent']} active:bg-${
								colorMap[plan.id]['active']
							} focus:bg-${colorMap[plan.id]['active']}`}
							size="lg"
							onClick={() => setSelectPlanIndex(index)}
						>
							Choose Plan
						</Button>
					</Card>
				))}
			</FlexBox>

			<div className="p-8 items-center">
				<Paragraph className="">
					Do you have questions about your plan?{' '}
					<span
						onClick={() => {
							window?.BrevoConversations &&
								window?.BrevoConversations?.openChat();
						}}
						className="underline"
					>
						Get Support
					</span>
				</Paragraph>
			</div>
			{/* <div className='p-8 items-center'>
				<H5 className=''>What else is included in your plan?</H5>

			</div> */}
		</Page>
	);
}

// const cache = new NodeCache({ stdTTL: 30 });

// export const getServerSideProps = wrapper.getServerSideProps(
// 	() =>
// 		async ({ query, req, res }: any) => {
// 			res.setHeader('Cache-Control', 'private, s-maxage=120');

// 			if (!query.dashboard) throw new Error();

// 			Supertokens.init(backendConfig());

// 			let session;
// 			let plans: SubscriptionPlan[] = [];

// 			try {
// 				// session = await Session.getSession(req, res, {
// 				// 	overrideGlobalClaimValidators: () => {
// 				// 		// this makes it so that no custom session claims are checked
// 				// 		return [];
// 				// 	},
// 				// });

// 				if (cache.has(`subscription-plans`)) {
// 					plans = cache.get(`subscription-plans`) || [];
// 				} else {
// 					plans = (await prisma?.subscriptionPlan.findMany({})) || [];
// 					cache.set(`subscription-plans`, plans, 120);
// 				}

// 				console.info('plans: ', plans);
// 				return {
// 					props: { plans },
// 				};
// 			} catch (err) {
// 				console.log('Pricing Plans: ', err);
// 				return {
// 					notFound: true,
// 				};
// 			}
// 		},
// );

PricingPlans.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSearch: false,
	showSideNav: false,
	showFooter: false,
});

export default PricingPlans;
