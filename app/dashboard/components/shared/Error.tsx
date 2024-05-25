import { Paragraph } from '@cd/ui-lib';
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

export default Error;
