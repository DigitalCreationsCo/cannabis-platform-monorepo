import { ErrorMessage, Page } from '@cd/shared-ui';

function _404() {
    return (
        <Page>
            <ErrorMessage
                code={404}
                message={`We're sorry! This resource is not found. Please try again later. this is the custom 404 page.`}
            />
        </Page>
    );
}

export default _404;
