import { FlexBox, Page, PageHeader, Paragraph } from '@cd/ui-lib';
import { CheckBadgeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import SEOMetaTags from '@/lib/SEOMetaTags';

function SupportPage() {
	const { t } = useTranslation('common');

	const SUCCESS_PHONE = '+15707901185';
	// useEffect(() => {
	// 	function openChat() {
	// 		setTimeout(() => {
	// 			if (window?.BrevoConversations?.openChat) {
	// 				window.BrevoConversations.openChat();
	// 			}
	// 		}, 2400);
	// 	}
	// 	openChat();
	// }, []);
	return (
		<Page className={twMerge('bg-light mb-24 p-0 m-0 lg:p-0')}>
			<SEOMetaTags title={t('dispensary-support')} />
			<PageHeader title="Support" Icon={CheckBadgeIcon} />
			<FlexBox className="flex-col items-start gap-y-8">
				<FlexBox className="gap-y-2 rounded p-6 max-w-[600px] shadow-inner border-gray-200 border">
					<Paragraph>
						For <span className="font-semibold">Technical Support</span>, you
						can reach our team through chat and email.
					</Paragraph>
					<Link
						className="hover:underline font-medium"
						href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}?subject=Tech Support: `}
					>
						email: {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
					</Link>
				</FlexBox>
				<FlexBox className="gap-y-2 rounded p-6 max-w-[600px] shadow-inner border-gray-200 border">
					<Paragraph>
						For <span className="font-semibold">Marketing Support</span>, you
						can reach our team through chat, email, and our toll-free number.
					</Paragraph>
					<Link
						className="hover:underline font-medium"
						href={`mailto:success@grascannabis.org?subject=Request: `}
					>
						email: {`success@grascannabis.org`}
					</Link>
					<FlexBox className="flex-row items-center space-x-2">
						<PhoneIcon className="h-5 w-5 shrink-0" />
						<Link
							href={`tel:${SUCCESS_PHONE}`}
							className="hover:underline font-medium"
						>
							{`Toll-free Success Number`}
						</Link>
					</FlexBox>
				</FlexBox>
			</FlexBox>
		</Page>
	);
}

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
		},
	};
}

export default SupportPage;
