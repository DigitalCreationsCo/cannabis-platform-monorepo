import { NextPage } from 'next';
import { ReactNode } from 'react';
import { Page } from '@cd/shared-ui';

function LandingPage() {
    return <Page>Landing Page</Page>;
}

LandingPage.getLayout = function (page: NextPage & ReactNode) {
    return page
};
export default LandingPage;
