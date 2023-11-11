/* eslint-disable jsx-a11y/click-events-have-key-events */
import { crypto, modalActions, modalTypes, TextContent } from '@cd/core-lib';
import {
	type OrganizationWithDashboardDetails,
	type POS,
} from '@cd/data-access';
import {
	Card,
	H3,
	Page,
	PageHeader,
	Select,
	Small,
	type LayoutContextProps,
	Button,
	FlexBox,
	Icons,
	Paragraph,
	IconButton,
} from '@cd/ui-lib';
import icons from '@cd/ui-lib/src/icons';
import Link from 'next/link';
import Router from 'next/router';
import Script from 'next/script';
import { useCallback, useState } from 'react';
import Iframe from 'react-iframe';
import { connect } from 'react-redux';
import { useAppDispatch } from '../../../redux/hooks';
import { type RootState } from '../../../redux/store';

export const pointOfSaleSystemList: POS[] = [
	'dutchie',
	'blaze',
	'weedmaps',
	'none',
];

type SetupWidgetProps = {
	organization: OrganizationWithDashboardDetails;
};

function SetupWidget({ organization }: SetupWidgetProps) {
	const dispatch = useAppDispatch();

	function openEmailModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.emailModal,
				modalText: `Hello, our Dispensary wants to receive online delivery orders from Delivery By Gras. We are installing the Delivery By Gras app on our store website. 
				Please provide support for the install. 
				Here are the install instructions. 
				Thank you!`,
			}),
		);
	}

	const [position, setPosition] = useState('right');
	const [shape, setShape] = useState('rectangle');
	const [pos, setPOS] =
		useState<OrganizationWithDashboardDetails['pos']>('none');

	function generateScript() {
		return document.createTextNode(
			`<script src="https://localhost:9000/widget.js"></script><script>GrasDeliveryWidget.mount({dispensaryId: ${organization.id}, dispensaryName: ${organization.name}, position: ${position}, shape: ${shape}, pos: ${pos}});</script>`,
		).textContent as string;
	}

	const WidgetScript = useCallback(
		() => <>{generateScript()}</>,
		[position, shape, pos],
	);

	const _w = generateScript();
	console.info('_w ', _w);

	const encrypt = crypto.encrypt(_w);

	return (
		<Page>
			<PageHeader
				title="Setup Your Gras Checkout Widget"
				Icon={Icons.WifiBridgeAlt}
				// navigation={ <DashboardNavigation /> }
			>
				<Button
					onClick={() => Router.back()}
					className="bg-inverse hover:bg-inverse active:bg-accent-soft place-self-start"
				>
					back
				</Button>
			</PageHeader>
			<FlexBox className="mt-2 flex-col gap-4 xl:grid xl:grid-cols-2">
				<Card className="col-span-1 m-0 space-y-2 p-0 md:!w-full lg:!w-full">
					<div
						id="configure-widget"
						className="w-4/5 m-auto relative space-y-6"
					>
						<FlexBox className="pb-2">
							<Paragraph>
								Add this code to your ecommerce website, and customers can place
								orders for delivery.
							</Paragraph>
						</FlexBox>
						<hr />
						<FlexBox className="mx-auto flex-row items-center justify-center">
							<Small className="font-semibold">{`Dispensary Name: ${organization.name}`}</Small>
						</FlexBox>
						<FlexBox className="mx-auto flex-row items-center justify-center">
							<Small className="font-semibold">{`Dispensary Id: ${organization.id}`}</Small>
						</FlexBox>
						<FlexBox className="mx-auto flex-row items-center justify-center">
							<Small className="font-semibold">shape:</Small>
							<Select
								values={['round', 'rectangle']}
								defaultValue="rectangle"
								setOption={setShape}
							/>
						</FlexBox>
						<FlexBox className="mx-auto flex-row items-center justify-center">
							<Small className="font-semibold">widget position:</Small>
							<Select
								values={['left', 'right']}
								defaultValue="right"
								setOption={setPosition}
							/>
						</FlexBox>
						<FlexBox className="mx-auto flex-row items-center justify-center">
							<Small className="font-semibold">
								Do you use integrated ecommerce service in your store?
								{'\n'}(If no choice applies, select none).
							</Small>
							<Select
								values={pointOfSaleSystemList}
								defaultValue={'none'}
								setOption={(val: typeof pointOfSaleSystemList[number]) => {
									setPOS(val);
								}}
							/>
						</FlexBox>
						<FlexBox className="mx-auto items-center justify-center">
							<Small className="text-center font-semibold">
								Copy and paste the code below to add Checkout Widget to your
								ecommerce store.
							</Small>
							<div className="rounded p-4 md:bg-gray-200">
								<code>
									<WidgetScript />
								</code>
							</div>
							{/* INSTALL WITH A DEVELOPER'S HELP */}
							<IconButton
								onClick={openEmailModal}
								Icon={icons.Devices}
								size="lg"
								bg="transparent"
								border
								className="p-4 my-4 border-2"
							>
								<Paragraph className="whitespace-pre">{` Get help from a developer`}</Paragraph>
							</IconButton>
						</FlexBox>
					</div>
				</Card>
				<Card className="bg-light min-h-[400px] h-full !w-full lg:!w-full grow rounded p-4 shadow">
					<H3 className="text-primary mx-auto text-center">Preview Widget</H3>
					<FlexBox className="flex-row py-2">
						<Paragraph>Preview the checkout widget on your website.</Paragraph>
						<Link
							href={`${TextContent.href.preview_fullscreen_widget(
								organization.id,
							)}/?_w=${encrypt}`}
							target="_blank"
							className="underline pl-1 hover:font-semibold hover:text-primary"
						>
							<Paragraph className="font-bold">View full screen</Paragraph>
						</Link>
					</FlexBox>
					<RenderPreview organization={organization}>
						<Script
							async
							id="GrasDeliveryWidget"
							// src="https://gras-cannabis-2.uk.r.appspot.com/widget.js"
							src="https://localhost:9000/widget.js"
							onLoad={() => {
								console.info('loaded preview checkout-widget');
								window.GrasDeliveryWidget.mount({
									dispensaryId: organization.id,
									dispensaryName: organization.name,
									position,
									shape,
									pos,
									parentElement: '#widget-parent',
								});
							}}
						/>
					</RenderPreview>
				</Card>
			</FlexBox>
		</Page>
	);
}

SetupWidget.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

function mapStateToProps(state: RootState) {
	const { dispensary } = state;
	return {
		organization: dispensary.dispensary,
	};
}

export default connect(mapStateToProps)(SetupWidget);

export function RenderPreview({
	children,
	organization,
}: SetupWidgetProps & { children: React.ReactNode }) {
	return (
		<div id="widget-parent" className="relative h-full border w-full rounded">
			{(organization?.ecommerceUrl && (
				<Iframe
					className="h-full w-full absolute"
					// url={organization.ecommerceUrl}
					// url={'https://www.releaf-shop.com/'}
					url={'https://localhost:9000/demo-ecom/'}
				/>
			)) || (
				<Iframe
					className="h-full w-full absolute"
					url={'https://localhost:9000/demo-ecom/'}
				/>
			)}
			{children}
		</div>
	);
}
