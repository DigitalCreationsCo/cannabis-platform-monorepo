import Link from 'next/link';
import CopyRight from './CopyRight';
import FlexBox from './FlexBox';
import { Small, Span } from './Typography';

export default function Footer() {
    return (
        <FlexBox className={styles.container}>
            <Link href='about-gras'>
            <Small className="text-inverse font-semibold">
                about Gras
                </Small>
            </Link>
            <Link href='support'>
            <Small className="text-inverse font-semibold">
                Need help? <Span className="underline">get support</Span>
                </Small>
            </Link>
            <Small className="text-inverse">
                <CopyRight />
            </Small>
        </FlexBox>
    );
}

const styles = {
    container: "space-y-2 flex-col min-h-[188px] p-12 pb-24 lg:px-[248px] bg-secondary min-w-full bottom-0"
}