import { ErrorMessage, Page } from '@cd/shared-ui';

function _404({ code = 404 }: { code: number }) {
    return (
        <Page>
            <ErrorMessage
                code={code}
                message={`This resource is not found.  
                   Please try again later, or call our support phone number. Thank you.`}
            />
        </Page>
    );
}

export default _404;
