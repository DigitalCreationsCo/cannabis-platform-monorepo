import {
	type AppState,
	crypto,
	generateWidgetScriptTag,
	modalActions,
	modalTypes,
	TextContent,
	useAppDispatch,
} from '@cd/core-lib';
import {
	type Inventory,
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
	CopyClipboardButton,
} from '@cd/ui-lib';
import icons from '@cd/ui-lib/src/icons';
import Router from 'next/router';
import Script from 'next/script';
import { useCallback, useState } from 'react';
import Iframe from 'react-iframe';
import { connect } from 'react-redux';

export const pointOfSaleSystemList: POS[] = [
	'dutchie',
	'blaze',
	'weedmaps',
	'none',
];

export const inventorySystemList: Inventory[] = [
	'dutchie',
	'blaze',
	'weedmaps',
	'metrc',
	'none',
];

type SetupWidgetProps = {
	organization: OrganizationWithDashboardDetails;
};

function SetupWidget({ organization }: SetupWidgetProps) {
	const dispatch = useAppDispatch();

	const [position, setPosition] = useState('right');
	const [shape, setShape] = useState('rectangle');
	const [pos, setPOS] =
		useState<OrganizationWithDashboardDetails['pos']>('none');
	const [inventory, setInventory] =
		useState<OrganizationWithDashboardDetails['inventory']>('none');

	function openEmailModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.emailModal,
				modalText: `Hello, our Dispensary wants to receive online delivery orders from Delivery By Gras. We are installing the Delivery By Gras app on our store website. 
				Please provide support to install this script in the ecommerce page located at ${
					organization.ecommerceUrl
				}. 
				Script:
				${generateWidgetScriptTag({
					id: organization.id,
					name: organization.name,
					position,
					shape,
					pos,
					inventory,
				})}
				The script instructions are available at ${
					process.env.NEXT_PUBLIC_DASHBOARD_APP_URL +
					TextContent.href.install_guide
				}. 
				Thank you!`,
			}),
		);
	}

	const WidgetScript = useCallback(
		() => (
			<div className="bg-gray-200 p-4 font-encode tracking-widest">
				<CopyClipboardButton
					copyText={generateWidgetScriptTag({
						id: organization.id,
						name: organization.name,
						position,
						shape,
						pos,
						inventory,
					})}
				/>
				<Paragraph className="text-left">SAMPLE SCRIPT</Paragraph>
				{generateWidgetScriptTag({
					id: organization.id,
					name: organization.name,
					position,
					shape,
					pos,
					inventory,
				})}
			</div>
		),
		[position, shape, pos],
	);

	const _w = generateWidgetScriptTag({
		id: organization.id,
		name: organization.name,
		position,
		shape,
		pos,
		inventory,
	});
	const encrypt = crypto.encrypt(_w);

	return (
		<Page className="bg-light lg:min-h-[710px]">
			<PageHeader
				title="Setup Delivery By Gras Widget"
				Icon={Icons.WifiBridgeAlt}
			>
				<Button
					onClick={() =>
						Router.push(TextContent.href.settings_f(organization.id))
					}
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
						<FlexBox className="mx-auto flex-row items-center justify-center">
							<Small className="font-semibold">
								Do you use integrated inventory service in your store?
								{'\n'}(If no choice applies, select none).
							</Small>
							<Select
								values={inventorySystemList}
								defaultValue={'none'}
								setOption={(val: typeof inventorySystemList[number]) => {
									setInventory(val);
								}}
							/>
						</FlexBox>
						<FlexBox className="mx-auto items-center justify-center">
							<Small className="text-center font-semibold">
								Copy and paste the code below to add Checkout Widget to your
								ecommerce store.
							</Small>
							<WidgetScript />

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

					{/* FULL PAGE CHECKOUT WIDGET PREVIEW */}
					{/* <FlexBox className="flex-row py-2">
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
					</FlexBox> */}
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
									inventory,
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

function mapStateToProps(state: AppState) {
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
			<Iframe
				className="h-full w-full absolute"
				url={organization.ecommerceUrl || 'https://localhost:9000/demo-ecom/'}
			/>
			{children}
		</div>
	);
}
