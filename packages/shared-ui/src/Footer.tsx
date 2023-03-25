import CopyRight from './CopyRight';
import FlexBox from './FlexBox';
import { Paragraph } from './Typography';

export default function Footer() {
    return (
        <FlexBox className="grow p-12 lg:px-[248px] bg-secondary">
            <Paragraph className="text-inverse font-semibold">
                <CopyRight />
            </Paragraph>
        </FlexBox>
    );
}
