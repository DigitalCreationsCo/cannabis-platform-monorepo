import { type AppState, crypto } from '@cd/core-lib';
import { type OrganizationWithDashboardDetails } from '@cd/data-access';
import { H4, Page, type LayoutContextProps } from '@cd/ui-lib';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RenderPreview } from './setup-widget';

type PreviewFullScreenProps = {
	organization: OrganizationWithDashboardDetails;
};

function PreviewFullScreenWidget({ organization }: PreviewFullScreenProps) {
	useEffect(() => {
		window.BrevoConversationsSetup = {
			startHidden: true,
		};
	}, []);
	const searchParams = useSearchParams();
	const _w = searchParams.get('_w') as string;

	const _widgetScript = crypto.decrypt(_w);
	return (
		<Page className={'relative h-screen pb-4'}>
			<div className="top-0 z-1 m-auto border rounded p-4">
				<H4>{`You are previewing Delivery by Gras with ${organization.name}`}</H4>
			</div>
			<RenderPreview organization={organization}>
				{_widgetScript}
				{/* <Script
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
							useDutchie,
							parentElement: '#widget-parent',
						});
					}}
				/> */}
			</RenderPreview>
		</Page>
	);
}

PreviewFullScreenWidget.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: false,
	showTopBar: false,
	showFooter: false,
});

function mapStateToProps(state: AppState) {
	const { dispensary } = state;
	return {
		organization: dispensary.dispensary,
	};
}

export default connect(mapStateToProps)(PreviewFullScreenWidget);
