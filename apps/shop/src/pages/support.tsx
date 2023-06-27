import { FlexBox, H4, Icons, IconWrapper, Page, PageHeader, Paragraph } from '@cd/ui-lib';
import icons from '@cd/ui-lib/icons';
import Head from 'next/head';

function Support() {
    return (
        <Page className='pt-4'>
            <Head>
                <title>Grascannabis.org Support</title>
                <meta name="Gras App Support" content="Built by Gras Cannabis Co." />
            </Head>
            <FlexBox className='w-[80%] md:w-[440px] mx-auto space-y-2'>
            <PageHeader title="Support" Icon={Icons.Shield} />
                <H4 className="whitespace-pre-line">
                Thanks for choosing Gras.</H4>
                <Paragraph>We're working around the clock to deliver a world class support service for you.{"\n"}
                For software support, please dial the toll-free support phone number during business hours.</Paragraph>
                <FlexBox className='m-auto'>
                    <FlexBox className='flex-row space-x-2 items-center'>
                        <H4 className="m-auto whitespace-pre-line">
                        Gras Support</H4>
                        <IconWrapper Icon={icons.PhoneFilled} className='text-dark' />
                    </FlexBox>
                    <H4>570-790-1185</H4>
                </FlexBox>
            </FlexBox>
        </Page>
    );
}

export default Support;
