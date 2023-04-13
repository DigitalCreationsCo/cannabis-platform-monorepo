import { ErrorMessage, Page } from '@cd/shared-ui';

function _500() {
    return (
        <Page>
            <ErrorMessage
                code={500}
                message={`Thank you for using our service. Our servers are not available currently. 
                    Please dial the support phone number or try again later.`}
            />
        </Page>
    );
}

export default _500;
