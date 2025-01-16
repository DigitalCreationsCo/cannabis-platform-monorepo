import {
	FlexBox,
	H4,
	Icons,
	IconWrapper,
	type LayoutContextProps,
	Page,
	PageHeader,
	Paragraph,
	H5,
} from '@gras/ui';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

function Support() {
	useEffect(() => {
		function openChat() {
			setTimeout(() => {
				if (window?.BrevoConversations?.openChat) {
					window.BrevoConversations.openChat();
				}
			}, 2400);
		}
		openChat();
	}, []);
	return (
		<Page className="pt-4">
			<Head>
				<title>Grascannabis.org Support</title>
				<meta name="Gras App Support" content="Built by Gras Cannabis Co." />
			</Head>
			<FlexBox className="mx-auto w-[80%] space-y-2 md:w-[440px]">
				<PageHeader title="Support" Icon={Icons.Shield} />
				<H4>Thank you for choosing Gras.</H4>
				<Paragraph className="whitespace-pre-line">
					{`Our team is available to deliver our best support for your business.

					For technical support, you can reach our team through chat and email. 
					Our toll-free support line is open during business hours.`}
				</Paragraph>
				<FlexBox>
					<H5 className="whitespace-pre-line">Gras Support</H5>
					<FlexBox className="flex-row items-center space-x-2">
						<IconWrapper Icon={Icons.PhoneFilled} className="text-dark" />
						<Link href={`tel:+15707901185`}>
							<H5>+1-570-790-1185</H5>
						</Link>
					</FlexBox>
					<Link
						href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}?subject=Support Request`}
					>
						<H5 className="whitespace-pre-line underline">
							{`email ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
						</H5>
					</Link>
				</FlexBox>
			</FlexBox>
		</Page>
	);
}

Support.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default Support;
