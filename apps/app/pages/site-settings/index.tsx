import { Card, Icons, Page } from '@cd/shared-ui';
import {
    BannerSlider,
    FooterSettings,
    GeneralForm,
    PageHeader,
    ProtectedComponent,
    ShippingTax,
    SocialLinks,
    TopbarSettings
} from 'components';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type SiteSettingsDashboardProps = Record<string, unknown>;

export default function SiteSettings() {
    const [selectTab, setSelectTab] = useState<number>(0);
    return (
        <ProtectedComponent>
            <Page>
                <PageHeader
                    title="Site Settings"
                    Icon={Icons.CategoryOutlined}
                    // navigation={ <AdminDashboardNavigation /> }
                />
                <Card className="h-[200px]">
                    Dispensary staff can edit the site settings here
                    <div className="tabs tabs-boxed">
                        {tabList.map((tab, index) => (
                            <button
                                className={twMerge('tab', selectTab === index && 'tab-active')}
                                key={'tab-0-' + tab.value}
                                onClick={() => setSelectTab(index)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className={twMerge(selectTab === 0 ? 'block' : 'hidden')}>
                        <GeneralForm />
                    </div>
                    <div className={twMerge(selectTab === 1 ? 'block' : 'hidden')}>
                        <TopbarSettings />
                    </div>
                    <div className={twMerge(selectTab === 2 ? 'block' : 'hidden')}>
                        <SocialLinks />
                    </div>
                    <div className={twMerge(selectTab === 3 ? 'block' : 'hidden')}>
                        <BannerSlider />
                    </div>
                    <div className={twMerge(selectTab === 4 ? 'block' : 'hidden')}>
                        <ShippingTax />
                    </div>
                    <div className={twMerge(selectTab === 5 ? 'block' : 'hidden')}>
                        <FooterSettings />
                    </div>
                </Card>
            </Page>
        </ProtectedComponent>
    );
}

const tabList = [
    {
        label: 'General',
        value: 'general',
    },
    {
        label: 'TopBar',
        value: 'topbar',
    },
    {
        label: 'Social Links',
        value: 'social-links',
    },
    {
        label: 'Banner',
        value: 'banner',
    },
    {
        label: 'Fees & Delivery',
        value: 'fees-and-delivery',
    },
    {
        label: 'Footer',
        value: 'footer',
    },
];
