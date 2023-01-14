// import SettingsIcon from "@mui/icons-material/Settings";
// import { TabContext, TabList, TabPanel } from "@mui/lab";
// import { Box, styled, Tab } from "@mui/material";
// import Card1 from "components/Card1";
// import AdminDashboardLayout from "components/layout/AdminDashboardLayout";
// import AdminDashboardNavigation from "components/layout/AdminDashboardNavigation";
// import DashboardPageHeader from "components/layout/DashboardPageHeader";
// import BannerSlider from "components/site-settings/BannerSlider";
// import FooterSetting from "components/site-settings/FooterSetting";
// import GeneralForm from "components/site-settings/GeneralForm";
// import ShippingTax from "components/site-settings/ShippingTax";
// import SocialLinks from "components/site-settings/SocialLinks";
// import TopbarSetting from "components/site-settings/TopbarSetting";
import { Card, Icons, Page } from '@cd/shared-ui';
import { PageHeader, ProtectedComponent } from 'components';
import { useState } from 'react';

type SiteSettingsDashboardProps = Record<string, unknown>;

export default function SiteSettings() {
    const [selectTab, setSelectTab] = useState('general');

    return (
        <ProtectedComponent>
            <Page>
                <PageHeader
                    title="Site Settings"
                    Icon={Icons.CategoryOutlined}
                    // navigation={ <AdminDashboardNavigation /> }
                />
                <Card className="h-[200px]">
                    Dispensary staff can edit their storefront and site settings here
                    {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(_, value) => setSelectTab(value)} variant="scrollable">
                <Tab label="General" value="general" disableRipple />
                <Tab label="Topbar" value="topbar" disableRipple />
                <Tab label="Footer" value="footer" disableRipple />
                <Tab label="Social Links" value="social-links" disableRipple />
                <Tab label="Banner Slider" value="banner-slider" disableRipple />
                <Tab label="Shipping & Vat" value="shipping-vat" disableRipple />
            </TabList>
        </Box> */}
                </Card>
            </Page>
        </ProtectedComponent>
    );
}
