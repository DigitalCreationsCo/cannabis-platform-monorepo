/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type AppState, TextContent } from '@cd/core-lib';
import { type OrganizationWithDashboardDetails } from '@cd/data-access';
import {
	Button,
	Page,
	Card,
	PageHeader,
	type LayoutContextProps,
	H2,
	Paragraph,
	Icons,
	TextField,
	H3,
} from '@cd/ui-lib';
import icons from '@cd/ui-lib/src/icons';
import { default as Router } from 'next/router';
import { useState } from 'react';
import { connect } from 'react-redux';

type BillingProps = {
	dispensary: OrganizationWithDashboardDetails;
};

function BillingAndPayments({ dispensary }: BillingProps) {
	const [stripeIdVisible, setStripeIdVisible] = useState(false);
	return (
		<Page className="bg-light lg:min-h-[710px]">
			<PageHeader
				title="Billing"
				Icon={icons.Payment}
				subTitle={'View and edit your billing and payment details'}
			>
				<Button
					onClick={() =>
						Router.push(TextContent.href.settings_f(dispensary.id))
					}
					className="bg-inverse hover:bg-inverse active:bg-accent-soft place-self-start mt-2"
				>
					back
				</Button>
			</PageHeader>

			<Card className="grid mt-2 lg:!w-3/4 grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-6">
				<H2 className="col-span-full">{dispensary.name}</H2>

				{/* STRIPE ID */}
				<Paragraph className="col-span-full sm:col-span-1 self-center">
					Your Stripe ID
				</Paragraph>
				<TextField
					containerClassName="col-span-2 md:col-span-4 lg:col-span-6"
					name="stripe-account-id"
					value={dispensary.stripeAccountId as string}
					type={stripeIdVisible ? 'text' : 'password'}
					onChange={() => null}
					insertIcon={stripeIdVisible ? Icons.View : Icons.ViewOff}
					onClickIcon={() => setStripeIdVisible(!stripeIdVisible)}
				/>

				{/* SUBSCRIPTIONS */}
				<H3 className="col-span-full">Service Details</H3>
				<div className="col-span-1 sm:col-span-2 grid grid-rows-4">
					<Paragraph className="row-start-1">Subscription Plan</Paragraph>
					<Paragraph className="row-start-2 bg-amber-200 rounded w-fit">
						{dispensary.subscriptionPlan?.isActive ? 'Active' : 'Not Active'}
					</Paragraph>
					<Paragraph className="row-start-3">Next Payment Date</Paragraph>
				</div>
				<div className="col-span-1 sm:col-span-2 grid grid-rows-4">
					<Paragraph className="row-start-1 bg-amber-200">
						{dispensary.subscriptionPlan?.name}
					</Paragraph>
					<Paragraph className="row-start-3">12/12/2021</Paragraph>
				</div>
				<Button
					className="col-span-2 self-start px-2 hover:text-white transition-none"
					onClick={() =>
						Router.push(TextContent.href.pricing_plans_f(dispensary.id))
					}
				>
					Change my plan
				</Button>
			</Card>
		</Page>
	);
}

function mapStateToProps(state: AppState) {
	const { dispensary } = state;
	return {
		dispensary: dispensary.dispensary,
	};
}

BillingAndPayments.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSearch: false,
});

export default connect(mapStateToProps)(BillingAndPayments);
