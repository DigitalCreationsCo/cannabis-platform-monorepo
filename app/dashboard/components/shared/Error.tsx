import { Paragraph } from '@cd/ui-lib';
import newrelic from 'newrelic';
import { useTranslation } from 'next-i18next';
import Alert from './Alert';

interface ErrorProps {
	message?: string;
}

const Error = (props: ErrorProps) => {
	const { message } = props;
	const { t } = useTranslation('common');

	return (
		<Alert status="error" className="my-2">
			<Paragraph>{message || t('unknown-error')}</Paragraph>
		</Alert>
	);
};

Error.getInitialProps = ({ res, err }) => {
	if (typeof window == 'undefined') {
		newrelic.noticeError(err);
	} else {
		window.newrelic.noticeError(err);
	}

	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Error;
