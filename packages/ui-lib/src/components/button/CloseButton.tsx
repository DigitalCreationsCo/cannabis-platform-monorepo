import { CarbonIconType } from '@carbon/icons-react';
import { ReactEventHandler, SVGAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import Icons from '../../icons';
import IconButton from './IconButton';

interface CloseButtonProps {
    Icon?: ((props: SVGAttributes<SVGElement>) => JSX.Element) | CarbonIconType;
    onClick?: ReactEventHandler;
    theme?: 'light' | 'dark';
    className?: string;
}

function CloseButton({ Icon = Icons.XIcon, className, ...props }: CloseButtonProps) {
    const closeButtonStyle =
        'bg-transparent hover:bg-transparent md:hover:bg-transparent shadow-none top-0 right-0 border p-2 m-0 min-w-min h-min absolute';
    return (
        <div className={twMerge("w-fit self-end relative py-2")}>
            <IconButton size={16} className={twMerge(closeButtonStyle, className)} {...props} Icon={Icon} />
        </div>
    );
}

export default CloseButton;
