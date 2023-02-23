import { Grid, H4, H5, Icons, Page } from '@cd/shared-ui';
import { PageHeader, ProtectedComponent } from '../src/components';

function Support() {
    return (
        <ProtectedComponent>
            <Page className="md:max-w-1/2">
                <PageHeader title="Support" Icon={Icons.Shield} />
                <Grid className="space-y-4 px-2">
                    <H5 className="whitespace-pre-line">{` 
            We're working around the clock to deliver a world class support service for your business.
            For software support, please dial the toll-free support phone number. `}</H5>
                    <H4 className="text-left whitespace-pre-line">{`24 / 7 Gras Support Phone Number: 
                1-800-GREEN-35`}</H4>
                </Grid>
            </Page>
        </ProtectedComponent>
    );
}

export default Support;
