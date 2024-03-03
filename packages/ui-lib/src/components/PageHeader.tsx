import { ReactElement, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import FlexBox from './FlexBox';
import IconWrapper from './IconWrapper';
import { H1, Paragraph } from './Typography';

export interface PageHeaderProps extends PropsWithChildren {
	title?: string;
	subTitle?: string;
	navigation?: any;
	Button?: any;
	Icon?: any;
	iconColor?: string;
	iconSize?: number;
	className?: string;
}
export default function PageHeader({
	title,
	iconColor = 'primary',
	subTitle,
	// Button,
	iconSize = 32,
	Icon,
	className,
	children,
}: PropsWithChildren<PageHeaderProps>) {
	return (
		<FlexBox className={twMerge('top-[66px] min-h-[54px] flex', className)}>
			<FlexBox className="flex-col">
				<FlexBox className="flex-row items-center space-x-2">
					<H1 className="text-2xl">{title}</H1>
					{Icon && (
						<IconWrapper
							iconColor={iconColor}
							className={twMerge('sm:block')}
							Icon={Icon}
							iconSize={iconSize}
						/>
					)}
				</FlexBox>
				{subTitle && (
					<Paragraph className="self-start text-primary">{subTitle}</Paragraph>
				)}
			</FlexBox>
			{children}
		</FlexBox>
	);
}
