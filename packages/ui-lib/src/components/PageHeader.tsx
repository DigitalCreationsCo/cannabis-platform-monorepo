import { twMerge } from 'tailwind-merge';
import FlexBox from './FlexBox';
import IconWrapper from './IconWrapper';
import { H3, Span } from './Typography';

export interface PageHeaderProps {
    title?: string;
    subTitle?: string;
    navigation?: any;
    Button?: any;
    Icon?: any;
    iconColor?: string;
}
export default function PageHeader({ title, iconColor = 'primary', subTitle, Button, Icon }: PageHeaderProps) {
    return (
        <FlexBox className="lg:py-6 top-[66px] min-h-[54px] flex space-x-4">
            <FlexBox className="flex-col">
                <FlexBox className="flex-row items-center space-x-1">
                    <H3>{title}</H3>
                    {Icon && (
                        <IconWrapper iconColor={iconColor} className={twMerge('sm:block')} Icon={Icon} iconSize={24} />
                    )}
                </FlexBox>
                {subTitle && <Span className="self-start text-primary">{subTitle}</Span>}
            </FlexBox>
            {/* <SideNav position="left" handle={<Menu fontSize="small" />}>
          {navigation}
        </SideNav> */}
            <FlexBox>{Button && Button}</FlexBox>
        </FlexBox>
    );
}
