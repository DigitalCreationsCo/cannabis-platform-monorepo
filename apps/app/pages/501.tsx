import { ErrorMessage, Page } from '@cd/shared-ui';

function _500() {
    return (
        <Page>
            <ErrorMessage
                code={500}
                message={`We're sorry! An error happened. Please try again. This is the custom 500 page.`}
            />
        </Page>
    );
}

export default _500;
