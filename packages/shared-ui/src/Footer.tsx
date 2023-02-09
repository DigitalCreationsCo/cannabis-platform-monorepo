import CopyRight from './CopyRight';
import { Paragraph } from './Typography';

export default function Footer() {
    return (
        <div className="flex flex-col grow min-h-[188px] p-12 lg:px-[248px] bg-secondary self-end place-self-end">
            <Paragraph className="text-inverse font-semibold">
                <CopyRight />
            </Paragraph>
        </div>
    );
}
