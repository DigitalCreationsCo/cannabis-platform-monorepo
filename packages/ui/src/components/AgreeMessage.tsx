import { TextContent } from '../../../core/src/constants';
import { getShopSite } from '../../../core/src/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Paragraph } from './Typography';

const AgreeMessage = ({ text }: { text: string }) => {
	const t = useTranslations('common');

	return (
		<Paragraph className="text-sm text-center">
			{t('agree-message-part', { button: text })}{' '}
			<Link
				rel="noopener noreferrer"
				target="_blank"
				href={getShopSite(TextContent.href.dispensary_tos)}
				className="font-medium text-primary hover:text-[color-mix(in_oklab,oklch(var(--p)),black_7%)]"
			>
				{'\n'}
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
