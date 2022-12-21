import { twMerge } from 'tailwind-merge';
import { Icons, IconWrapper } from '@cd/shared-ui';
import { ReactEventHandler } from 'react';

type SearchBarProps = {
    onChange?: ReactEventHandler;
    placeholder?: string;
}
function SearchBar({ placeholder = "Search", onChange }:SearchBarProps) {
    return (
        <div
            className={twMerge(
                'items-center',
                'flex',
                'flex-row',
                'space-x-2',
                'w-full',
                'px-2',
                'py-2',
                'mx-4',
                'shadow-md',
                'outline-none',
                'md:w-1/2',
                'wh-10'
            )}
        >
            <IconWrapper Icon={Icons.Search} />
            <input placeholder={ placeholder }  className="outline-none w-full" onChange={onChange} />
        </div>
    );
}

export default SearchBar;
