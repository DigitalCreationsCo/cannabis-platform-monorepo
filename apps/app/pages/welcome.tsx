import { Page } from '@cd/shared-ui';
import { ProtectedComponent } from '../src/components';
import LandingPage from '../src/components/Landing';

function WelcomePage() {
    return (
        <ProtectedComponent>
            <Page>
                <LandingPage />
            </Page>
        </ProtectedComponent>
    );
}

export default WelcomePage;
