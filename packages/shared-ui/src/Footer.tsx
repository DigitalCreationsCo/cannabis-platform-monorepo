import CopyRight from './CopyRight';
import FlexBox from './FlexBox';
import { Paragraph } from './Typography';

export default function Footer() {
    return (
        <FlexBox className="min-h-[188px] grow p-12 lg:px-[248px] bg-secondary min-w-full bottom-0">
            <Paragraph className="text-inverse font-semibold">
                <CopyRight />
            </Paragraph>
        </FlexBox>
    );
}
