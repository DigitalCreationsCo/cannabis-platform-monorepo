import { ErrorMessage, Page } from '@cd/shared-ui';

function _404() {
    return (
        <Page>
            <ErrorMessage
                code={404}
                message={`This resource is not found.  
                   Please try again later, or call our support phone number. Thank you.`}
            />
        </Page>
    );
}

export default _404;
