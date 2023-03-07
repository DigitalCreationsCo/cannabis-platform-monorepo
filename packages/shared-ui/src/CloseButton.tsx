import { CarbonIconType } from '@carbon/icons-react';
import { ReactEventHandler, SVGAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import IconButton from './IconButton';
import Icons from './icons';

interface CloseButtonProps {
    Icon?: ((props: SVGAttributes<SVGElement>) => JSX.Element) | CarbonIconType;
    onClick?: ReactEventHandler;
}

function CloseButton({ Icon = Icons.XIcon, ...props }: CloseButtonProps) {
    const closeButtonStyle =
        'bg-transparent hover:bg-transparent md:hover:bg-transparent shadow-none top-0 right-0 px-0 m-0 w-min h-min absolute';
    return (
        <div className="relative py-2">
            <IconButton size={16} className={twMerge(closeButtonStyle)} {...props} Icon={Icon} />
        </div>
    );
}

export default CloseButton;
