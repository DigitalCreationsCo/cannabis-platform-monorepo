import Center from './Center';
import CopyRight from './CopyRight';
import { H1, H4, Paragraph } from './Typography';

function ErrorMessage({ code, message }: { code: number; message: string }) {
    return (
        <Center className="grow-0 xl:-ml-[188px] text-center space-y-4">
            <H1>Our bad, Your request failed: {code} Error</H1>
            <H4 className="whitespace-pre-line">{message}</H4>
            <Paragraph className="pt-2">
                <CopyRight />
            </Paragraph>
        </Center>
    );
}

export default ErrorMessage;
