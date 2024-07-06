import { getShopSite, TextContent } from '@cd/core-lib';
import { Paragraph } from '@cd/ui-lib';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const AgreeMessage = ({ text }) => {
	const { t } = useTranslation('common');

	return (
		<Paragraph className="text-sm text-center">
			{t('agree-message-part', { button: text })}{' '}
			<Link
				rel="noopener noreferrer"
				target="_blank"
				href={getShopSite(TextContent.href.user_tos)}
				className="font-medium text-primary hover:text-[color-mix(in_oklab,oklch(var(--p)),black_7%)]"
			>
				{t('terms')}
			</Link>{' '}
			{t('and')}{' '}
			<Link
				rel="noopener noreferrer"
				target="_blank"
				href={getShopSite(TextContent.href.privacy)}
				className="font-medium text-primary hover:text-[color-mix(in_oklab,oklch(var(--p)),black_7%)]"
			>
				{t('privacy')}
			</Link>
		</Paragraph>
	);
};

export default AgreeMessage;
