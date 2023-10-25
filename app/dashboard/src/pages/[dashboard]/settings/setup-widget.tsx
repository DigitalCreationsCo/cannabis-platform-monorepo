import { modalActions, modalTypes } from '@cd/core-lib';
import { type OrganizationWithDashboardDetails } from '@cd/data-access/dist';
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
	IconButton,
	Icons,
	Paragraph,
} from '@cd/ui-lib';
import icons from '@cd/ui-lib/src/icons';
import Router from 'next/router';
import Script from 'next/script';
import { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { useAppDispatch } from '../../../redux/hooks';
import { type RootState } from '../../../redux/store';

type SetupWidgetProps = {
	organization: OrganizationWithDashboardDetails;
};

function SetupWidget({ organization }: SetupWidgetProps) {
	const dispatch = useAppDispatch();

	function openEmailModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.emailModal,
			}),
		);
	}

	const [position, setPosition] = useState('right');
	const [shape, setShape] = useState('rectangle');
	const [useDutchie, setUseDutchie] = useState(false);
	const WidgetScript = useCallback(() => {
		function generateScript() {
			return `<script src="https://gras-cannabis-2.uk.r.appspot.com/widget.js"></script>
	<script>GrasDeliveryWidget.mount({
			dispensaryId: ${organization.id},
			dispensaryName: ${organization.name},
			position: ${position},
			shape: ${shape},
			useDutchie: ${useDutchie}
		});</script>`;
		}
		return <>{generateScript()}</>;
	}, [position, shape, useDutchie]);
	return (
		<Page>
			<FlexBox className="mt-2 flex-col gap-4 xl:grid xl:grid-cols-2">
				<Card className="col-span-1 m-0 space-y-2 p-0 md:!w-full lg:!w-full">
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
					<div id="configure-widget" className="relative space-y-2">
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
								Do you use Dutchie checkout in your store?
							</Small>
							<Select
								values={['yes', 'no']}
								defaultValue="no"
								setOption={(val: string) => {
									if (val === 'yes') setUseDutchie(true);
									else setUseDutchie(false);
								}}
							/>
						</FlexBox>
						<FlexBox className="mx-auto items-center justify-center">
							<Small className="text-center font-semibold">
								Copy and paste the code below to add Checkout Widget to your
								ecommerce store.
							</Small>
							<div className="rounded p-4 md:bg-gray-400">
								<code>
									<WidgetScript />
								</code>
							</div>
							<IconButton
								onClick={openEmailModal}
								Icon={icons.RepoSourceCode}
								size="lg"
								bg="transparent"
								border
								className="p-4 my-4 border-2"
							>
								<Paragraph>Install with a developer's help</Paragraph>
							</IconButton>
						</FlexBox>
					</div>
				</Card>
				<FlexBox className="bg-light h-full w-full grow rounded pt-2 shadow">
					<H3 className="text-primary mx-auto text-center">Preview Widget</H3>
					<div
						id="widget-parent"
						className="relative h-full w-full bg-transparent"
					>
						<Script
							async
							id="GrasDeliveryWidget"
							className="bg-transparent"
							// src="https://gras-cannabis-2.uk.r.appspot.com/widget.js"
							src="https://localhost:9000/widget.js"
							strategy="afterInteractive"
							onLoad={() => {
								console.info('loaded checkout-widget code: ');
								window.GrasDeliveryWidget.mount({
									dispensaryId: organization.id,
									dispensaryName: organization.name,
									position,
									shape,
									useDutchie,
									parentElement: '#widget-parent',
								});
							}}
						/>
					</div>
				</FlexBox>
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
