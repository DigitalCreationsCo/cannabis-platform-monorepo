/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import SettingsIcon from "@mui/icons-material/Settings";
// import { TabContext, TabList, TabPanel } from "@mui/lab";
// import { Box, styled, Tab } from "@mui/material";
// import Card1 from "components/Card1";
// import DashboardLayout from "components/layout/DashboardLayout";
// import DashboardNavigation from "components/layout/DashboardNavigation";
// import DashboardPageHeader from "components/layout/DashboardPageHeader";
// import BannerSlider from "components/site-settings/BannerSlider";
// import FooterSetting from "components/site-settings/FooterSetting";
// import GeneralForm from "components/site-settings/GeneralForm";
// import ShippingTax from "components/site-settings/ShippingTax";
// import SocialLinks from "components/site-settings/SocialLinks";
// import TopbarSetting from "components/site-settings/TopbarSetting";
import { type AppState, pruneData, TextContent } from '@cd/core-lib';
import {
	type SiteSetting,
	type OrganizationWithDashboardDetails,
} from '@cd/data-access';
import {
	Button,
	Card,
	FlexBox,
	Icons,
	Page,
	PageHeader,
	Paragraph,
	Small,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { connect } from 'react-redux';
import { twMerge } from 'tailwind-merge';

type SiteSettingsDashboardProps = {
	dispensary: OrganizationWithDashboardDetails;
	siteSetting: SiteSetting;
};

function SiteSettings({ dispensary, siteSetting }: SiteSettingsDashboardProps) {
	if (!siteSetting) throw new Error();

	const [setting, setSetting] = useState('');
	return (
		<Page className={twMerge('sm:px-4 md:pr-16')}>
			<PageHeader title="Site Settings" Icon={Icons.CategoryOutlined}>
				<Button
					onClick={() =>
						Router.push(TextContent.href.settings_f(dispensary.id))
					}
					className="bg-inverse hover:bg-inverse active:bg-accent-soft place-self-start"
				>
					back
				</Button>
			</PageHeader>
			View and edit your storefront details
			<Card className="grid mt-2 lg:!w-full grid-cols-1 md:grid-cols-2 gap-6">
				<FlexBox className="border flex-col md:col-start-1">
					{Object.keys(
						pruneData(siteSetting, [
							'id',
							'organizationId',
							'createdAt',
							'updatedAt',
						]),
					).map((key) => (
						<a
							key={`site-setting-${key}`}
							className={twMerge(
								'tab border-primary outline-primary',
								setting === key ? 'tab-active' : '',
							)}
							onClick={() => setSetting(key)}
						>
							<Small className={setting === key ? 'text-primary' : ''}>
								{key}
							</Small>
						</a>
					))}
				</FlexBox>
				<Paragraph className="md:col-start-2 flex flex-row md:flex-col border row-start-1 md:row-start-auto h-16">
					{setting.toLowerCase().includes('color') && (
						<div
							className={twMerge(
								`w-[50px] h-[50px] mr-2`,
								'border',
								`bg-[${siteSetting[setting as keyof SiteSetting]}]`,
							)}
						></div>
					)}
					{setting &&
						setting + ': ' + siteSetting[setting as keyof SiteSetting]}
				</Paragraph>
				<Link
					target={'_blank'}
					className="md:col-start-2 w-fit place-self-center"
					href={TextContent.href.storefront_f(dispensary.subdomainId)}
				>
					<Button className="px-8" size="lg">
						Check my storefront
					</Button>
				</Link>
			</Card>
		</Page>
	);
}

SiteSettings.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

function mapStateToProps(state: AppState) {
	const { dispensary } = state;

	const siteSetting = dispensary.dispensary.siteSetting;

	return {
		dispensary: dispensary.dispensary,
		siteSetting: siteSetting,
	};
}

export default connect(mapStateToProps)(SiteSettings);
