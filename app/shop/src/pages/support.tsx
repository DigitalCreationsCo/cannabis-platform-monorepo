import {
	FlexBox,
	H4,
	Icons,
	IconWrapper,
	type LayoutContextProps,
	Page,
	PageHeader,
	Paragraph,
} from '@cd/ui-lib';
import Head from 'next/head';

function Support() {
	return (
		<Page className="pt-4">
			<Head>
				<title>Grascannabis.org Support</title>
				<meta
					name="Gras App Support"
					content="Built by Gras Cannabis Co."
				/>
			</Head>
			<FlexBox className="mx-auto w-[80%] space-y-2 md:w-[440px]">
				<PageHeader title="Support" Icon={Icons.Shield} />
				<H4 className="whitespace-pre-line">
					Thanks for choosing Gras.
				</H4>
				<Paragraph>
					We're working around the clock to deliver a world class
					support service for you.{'\n'}
					For software support, please dial the toll-free support
					phone number during business hours.
				</Paragraph>
				<FlexBox className="m-auto">
					<FlexBox className="flex-row items-center space-x-2">
						<H4 className="m-auto whitespace-pre-line">
							Gras Support
						</H4>
						<IconWrapper
							Icon={Icons.PhoneFilled}
							className="text-dark"
						/>
					</FlexBox>
					<H4>570-790-1185</H4>
				</FlexBox>
			</FlexBox>
		</Page>
	);
}

Support.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default Support;
