import { FlexBox, H4, Icons, Page, PageHeader, Paragraph } from '@cd/ui-lib';

function Support() {
    return (
        <Page>
            <FlexBox className='w-[90%] md:w-2/3 mx-auto space-y-2'>
            <PageHeader title="Support" Icon={Icons.Shield} />
                <H4 className="whitespace-pre-line">
                Thanks for choosing Gras.</H4>
                <Paragraph>We're working around the clock to deliver a world class support service for you.{"\n"}
                For software support, please dial the toll-free support phone number during business hours.</Paragraph>
                <H4 className="m-auto whitespace-pre-line">
                    Gras Support: {'\n'}
                    570-790-1185</H4>
                    </FlexBox>
        </Page>
    );
}

export default Support;
