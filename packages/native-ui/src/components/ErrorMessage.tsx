// import router from 'next/router';
import Center from './atomic/Center';
import CopyRight from './CopyRight';
import FlexBox from './FlexBox';
import { H1, H5, Paragraph } from './Typography';

function ErrorMessage({ code, message }: { code: number; message: string }) {
    return (
        <Center className="py-4 space-y-4">
            <H1 className="whitespace-pre-line text-center">Our bad, your request failed</H1>
            
            <FlexBox className="flex-row space-x-2">
            <H5 className='text-error'>{code} Error</H5>
            <H5 className="whitespace-pre-line text-center">{message}</H5>
            </FlexBox>
            
            {/* <Button onPress={() => Router.back()}>go back</Button> */}
            <Paragraph className="pt-2">
                <CopyRight />
            </Paragraph>
        </Center>
    );
}

export default ErrorMessage;
