import { FlexBox, H4, Icons, Page, PageHeader, Paragraph } from '@cd/ui-lib';


const
supportEmail = 'support@grascannabis.org';

const
EmailLink = ({email}: {email: string}) => (<a href="mailto:{email}"><b>{email}</b></a>)

function Support() {
    return (
        <Page>
            <FlexBox className='w-[90%] md:w-[580px] mx-auto space-y-2'>
            <PageHeader title="Support" Icon={Icons.Shield} />
                <H4 className="whitespace-pre-line">
                Thanks for choosing Gras.</H4>
                <Paragraph className='text-justify'>We're working around the clock to deliver a world class support service for you.{"\n"}
                For software support, please dial the toll-free support phone number, or send us an email at <EmailLink email={supportEmail} />. 
                {'\n'}
                Our business hours are Sunday through Monday 8am to 8pm.</Paragraph>
                <Paragraph>For after hours support, please email us at <EmailLink email={supportEmail} />.</Paragraph>
                <H4 className="m-auto whitespace-pre-line">
                    Gras Toll-Free Support: {'\n'}
                    570-790-1185{'\n'}
                    <EmailLink email={supportEmail} />
                    </H4>
                    </FlexBox>
        </Page>
    );
}

export default Support;
