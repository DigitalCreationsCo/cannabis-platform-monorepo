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
export default function PageHeader({ title, iconColor, subTitle, Button, Icon }: PageHeaderProps) {
    return (
        <FlexBox className="pb-6 lg:pt-6 z-10 top-[66px] min-h-[54px] flex space-x-4">
            <FlexBox className="flex-col">
                <FlexBox className="flex-row">
                    <H3>{title}</H3>
                    {Icon && (
                        <IconWrapper iconColor={iconColor} className={twMerge('sm:block')} Icon={Icon} size={24} />
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
