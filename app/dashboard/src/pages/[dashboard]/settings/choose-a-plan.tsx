import { convertCentsToDollars, getCurrencySymbol } from '@cd/core-lib';
import prisma, { type SubscriptionPlan } from '@cd/data-access';
import {
	Button,
	Card,
	FlexBox,
	H1,
	H2,
	H3,
	IconWrapper,
	Page,
	Paragraph,
	Price,
	type LayoutContextProps,
} from '@cd/ui-lib';
import icons from '@cd/ui-lib/src/icons';
import NodeCache from 'node-cache';
import Supertokens from 'supertokens-node';
import { backendConfig } from 'config/backendConfig';
import { wrapper } from 'store';

function PricingPlans({ plans }: { plans: SubscriptionPlan[] }) {
	const plansDummyData: SubscriptionPlan[] = [
		{
			id: '1',
			name: 'Express Premium',
			description:
				'Premium value delivery service, including on-demand delivery and daily deals service.',
			price: 1000000,
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
			id: '2',
			name: 'Express Gold',
			description: 'Express Gold',
			price: 1500000,
			deliveryLimit: 32,
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
			text: 'text-light',
			main: 'primary-light',
			accent: '[#53ba70]',
			active: 'primary',
		},
		'2': {
			text: 'text-dark',
			main: 'amber-200',
			accent: 'amber-300',
			active: 'amber-400',
		},
	};

	return (
		<Page className={'m-auto h-[820px]'}>
			<FlexBox className="flex-row justify-center m-auto self-center">
				{plansDummyData.map((plan, index) => (
					<Card
						key={`plan-${index}`}
						className={`flex !shadow-lg flex-col mx-10 my-auto max-w-[480px] items-center space-y-2 !py-24`}
					>
						<H2 className="inline-flex">
							{getCurrencySymbol(plan.currency) +
								convertCentsToDollars(plan.price)}
						</H2>
						<H3 className="inline-flex">/month</H3>
						<hr className="w-1/2" />
						<H1 className={'text-' + colorMap[plan.id]['main']}>{plan.name}</H1>
						<div>
							<FlexBox className="flex flex-row items-center space-x-2">
								<IconWrapper
									iconColor={'text-' + colorMap[plan.id]['main']}
									Icon={plan.featuresDailyDeals ? icons.Checkmark : icons.XIcon}
								/>
								<Paragraph>{'Fast and Secure Delivery Service'}</Paragraph>
							</FlexBox>
							<FlexBox className="flex flex-row items-center space-x-2">
								<IconWrapper
									Icon={plan.featuresDailyDeals ? icons.Checkmark : icons.XIcon}
								/>
								<Paragraph>
									{plan.deliveryLimit === 99
										? `Unlimited Daily Deliveries`
										: `Includes ${plan.deliveryLimit} daily deliveries`}
								</Paragraph>
							</FlexBox>
							<FlexBox className="flex flex-row items-center space-x-2">
								<IconWrapper
									Icon={plan.featuresDailyDeals ? icons.Checkmark : icons.XIcon}
								/>
								<Paragraph>{'includes Daily Deals marketing'}</Paragraph>
							</FlexBox>
						</div>
						<Button
							className={`${colorMap[plan.id]['text']} !mt-12 bg-${
								colorMap[plan.id]['main']
							} hover:bg-${colorMap[plan.id]['accent']} active:bg-${
								colorMap[plan.id]['active']
							} focus:bg-${colorMap[plan.id]['active']}`}
							size="lg"
						>
							Choose Plan
						</Button>
					</Card>
				))}
			</FlexBox>
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
