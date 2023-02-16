import { IconButton, Icons } from '@cd/shared-ui';
import { twMerge } from 'tailwind-merge';

function CloseButton(props) {
    const closeButtonStyle =
        'bg-transparent hover:bg-transparent md:hover:bg-transparent shadow-none top-0 right-0 px-0 m-0 w-min h-min absolute';
    return (
        <div className="relative py-2">
            <IconButton size={16} className={twMerge(closeButtonStyle)} {...props} Icon={Icons.XIcon} />
        </div>
    );
}

export default CloseButton;
