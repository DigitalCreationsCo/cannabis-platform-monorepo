import { FlexBox, H3, IconWrapper, Span } from '@cd/shared-ui';
import { twMerge } from 'tailwind-merge';

export interface PageHeaderProps {
    title?: string;
    subTitle?: string;
    navigation?: any;
    Button?: any;
    Icon?: any;
    iconColor?: string;
}
export default function PageHeader({ title, subTitle, Button, Icon, iconColor = 'primary' }: PageHeaderProps) {
    return (
        <FlexBox className="pb-6 lg:pt-6 xl:max-h-[111px] min-h-[54px] flex space-x-4">
            <FlexBox className="flex-col">
                <FlexBox className="flex-row">
                    <H3>{title}</H3>
                    {Icon && (
                        <IconWrapper
                            className={twMerge('fill-' + iconColor, 'hidden sm:block')}
                            Icon={Icon}
                            size={24}
                        />
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
