import CopyRight from './CopyRight';
import { Paragraph } from './Typography';

export default function Footer() {
    return (
        <div className="flex grow p-12 lg:px-[248px] bg-secondary">
            <Paragraph className="text-inverse font-semibold">
                <CopyRight />
            </Paragraph>
        </div>
    );
}
