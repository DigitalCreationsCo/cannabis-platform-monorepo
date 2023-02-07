import Center from './Center';
import { H1, H4 } from './Typography';

function ErrorMessage({ code, message }: { code: number; message: string }) {
    return (
        <Center>
            <H1>{code}</H1>
            <H4>{message}</H4>
        </Center>
    );
}

export default ErrorMessage;
