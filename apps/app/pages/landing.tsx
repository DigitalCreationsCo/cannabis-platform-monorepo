import { NextPage } from 'next';
import { ReactNode } from 'react';
import { Page } from '@cd/shared-ui';

function LandingPage() {
    return <div>Landing Page</div>;
}

LandingPage.getLayout = function (page: NextPage & ReactNode) {
    return <Page>{page}</Page>;
};
export default LandingPage;
