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
import { pruneData } from '@cd/core-lib';
import {
	Button,
	Card,
	Icons,
	Page,
	PageHeader,
	Paragraph,
	Small,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Router from 'next/router';
import { useState } from 'react';
import { connect } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { type RootState } from '../../../redux/store';

type SiteSettingsDashboardProps = {
	siteSetting: Record<string, string>;
};

function SiteSettings({ siteSetting }: SiteSettingsDashboardProps) {
	const [selectTab, setSelectTab] = useState(0);
	return (
		<Page>
			<Card>
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
				Dispensary staff can view and edit their storefront and site settings
				here
				<div>
					{Object.keys(
						pruneData(siteSetting, [
							'id',
							'organizationId',
							'createdAt',
							'updatedAt',
						]),
					).map((key, index) => (
						<a
							key={`site-setting-${key}`}
							className={twMerge(
								'tab border-primary outline-primary',
								selectTab === index ? 'tab-active' : '',
							)}
							onClick={() => setSelectTab(index)}
						>
							<Small className={selectTab === index ? 'text-primary' : ''}>
								{key}
							</Small>
						</a>
					))}
				</div>
				{Object.keys(
					pruneData(siteSetting, [
						'id',
						'organizationId',
						'createdAt',
						'updatedAt',
					]),
				).map(
					(key, index) =>
						selectTab === index && (
							<div key={`site-setting-${index}`}>
								<Paragraph>{siteSetting[key]}</Paragraph>
							</div>
						),
				)}
			</Card>
		</Page>
	);
}

SiteSettings.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

function mapStateToProps(state: RootState) {
	const { dispensary } = state;
	return {
		siteSetting: dispensary.dispensary.siteSetting,
	};
}

export default connect(mapStateToProps)(SiteSettings);
