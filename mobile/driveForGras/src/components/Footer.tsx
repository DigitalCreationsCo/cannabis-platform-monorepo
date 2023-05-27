// import { Link } from '@react-navigation/native';
import { RNstyles } from '@cd/core-lib/src';
import CopyRight from './CopyRight';
import FlexBox from './FlexBox';
import { Small } from './Typography';

export default function Footer() {
    return (
        <FlexBox className={RNstyles.footer}>
            {/* <Link target='about-gras'> */}
            <Small className="text-inverse font-semibold">
                learn more about Gras
                </Small>
            {/* </Link> */}
            {/* <Link target='support'> */}
            <Small className="text-inverse font-semibold">
                contact Support
                </Small>
            {/* </Link> */}
            <Small className="text-inverse">
                <CopyRight />
            </Small>
        </FlexBox>
    );
}
