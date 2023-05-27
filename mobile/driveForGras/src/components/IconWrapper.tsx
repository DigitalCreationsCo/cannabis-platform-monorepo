import { CarbonIconType } from '@carbon/icons-react';
import { SVGAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type IconProps = {
    Icon: ((props: SVGAttributes<SVGElement>) => JSX.Element) | CarbonIconType;
    className?: string;
    size?: number;
    iconColor?: string;
    theme?: 'light' | 'dark';
};
export default function IconWrapper({ theme, Icon, className, size = 20, iconColor = theme === 'dark' ? 'light' : 'primary', ...props }: IconProps) {
    const styles = {
        fill: 'fill-' + iconColor
    };
    return (
        <div className={twMerge('align-items', className)}>
            <Icon className={twMerge(styles.fill)} height={size} width={size} {...props} />
        </div>
    );
}
