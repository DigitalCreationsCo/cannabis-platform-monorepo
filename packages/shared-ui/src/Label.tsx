import { PropsWithChildren } from 'react';
import { Paragraph } from './Typography';

function Label({ children }: PropsWithChildren) {
    return (
        <label>
            <Paragraph>{children}</Paragraph>
        </label>
    );
}

export default Label;
