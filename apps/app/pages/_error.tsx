import { ErrorMessage, Page } from '@cd/shared-ui';

function Error({ statusCode }: { statusCode: number }) {
    return (
        <Page>
            {statusCode ? (
                <ErrorMessage
                    code={statusCode}
                    message={`We're sorry. An error occurred with our server. Please try again later. Custom error page.`}
                />
            ) : (
                <ErrorMessage
                    code={statusCode}
                    message={`We're sorry. An error occurred on client. Please try again later. Custom error page.`}
                />
            )}
        </Page>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
