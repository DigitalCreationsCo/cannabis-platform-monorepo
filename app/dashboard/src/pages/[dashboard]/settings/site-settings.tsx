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
import { pruneData, TextContent } from '@cd/core-lib';
import { type OrganizationWithDashboardDetails } from '@cd/data-access';
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
import { type RootState } from '../../../redux/store';

type SiteSettingsDashboardProps = {
	dispensary: OrganizationWithDashboardDetails;
	siteSetting: Record<string, string>;
};

function SiteSettings({ dispensary, siteSetting }: SiteSettingsDashboardProps) {
	if (!siteSetting) throw new Error();

	const [setting, setSetting] = useState('');
	return (
		<Page>
			<PageHeader
				title="Site Settings"
				Icon={Icons.CategoryOutlined}
				// navigation={ <DashboardNavigation /> }
			>
				<Button
					onClick={() => Router.back()}
					className="bg-inverse hover:bg-inverse active:bg-accent-soft place-self-start"
				>
					back
				</Button>
			</PageHeader>
			<Card className="grid mt-2 grid-cols-2">
				View and edit your storefront details
				<FlexBox className="flex-col col-start-1">
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
				<Paragraph className="col-start-2">
					{setting && setting + ': ' + siteSetting[setting]}
					{setting.toLowerCase().includes('color') && (
						<div
							className={twMerge(
								`w-[50px] h-[50px]`,
								'border',
								`bg-[${siteSetting[setting]}]`,
							)}
						></div>
					)}
				</Paragraph>
				<Link
					target={'_blank'}
					className="col-start-2 w-fit"
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

function mapStateToProps(state: RootState) {
	const { dispensary } = state;

	const siteSetting = dispensary.dispensary.siteSetting;
	if (!siteSetting) {
		return {};
	}

	return {
		dispensary: dispensary.dispensary,
		siteSetting: siteSetting,
	};
}

export default connect(mapStateToProps)(SiteSettings);
