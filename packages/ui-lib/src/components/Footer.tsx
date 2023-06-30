import { getCurrentSite, getDashboardSite, TextContent } from '@cd/core-lib/src';
import Link from 'next/link';
import CopyRight from './CopyRight';
import FlexBox from './FlexBox';
import { H4, Small } from './Typography';

export default function Footer() {

    const 
    aboutLink = getCurrentSite('/about-gras'),
    supportLink = getCurrentSite('/support');

    return (
        <FlexBox className={styles.container}>

            <Link href={getDashboardSite('/signup/create-dispensary-account')}>
            <Small className="text-inverse hover:underline font-semibold">
                {TextContent.account.DISPENSARIES_START_HERE}
                </Small>
            </Link>

            <Link href={supportLink}>
            <Small className="text-inverse hover:underline font-semibold">
                get support
                </Small>
            </Link>

            <Link href={aboutLink}>
            <Small className="text-inverse hover:underline font-semibold">
                about Gras
                </Small>
            </Link>

            <Small className="text-inverse">
                <CopyRight />
            </Small>

            <H4 color='light'>{TextContent.info.CANNABIS_DELIVERED}</H4>
        </FlexBox>
    );
}

const styles = {
    container: "cursor-default space-y-2 flex-col min-h-[188px] p-8 pb-24 lg:px-[248px] bg-secondary min-w-full bottom-0 shadow-lg"
}