import { PropsWithChildren } from 'react';
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
export default function PageHeader({
	title,
	iconColor = 'primary',
	subTitle,
	Button,
	Icon,
	children,
}: PropsWithChildren<PageHeaderProps>) {
	return (
		<FlexBox className="top-[66px] min-h-[54px] flex">
			<FlexBox className="flex-col">
				<FlexBox className="flex-row items-center space-x-1">
					<H3>{title}</H3>
					{Icon && (
						<IconWrapper
							iconColor={iconColor}
							className={twMerge('sm:block')}
							Icon={Icon}
							iconSize={24}
						/>
					)}
				</FlexBox>
				{subTitle && (
					<Span className="self-start text-primary">{subTitle}</Span>
				)}
			</FlexBox>
			{children}
		</FlexBox>
	);
}
