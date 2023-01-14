import { Icons, IconWrapper } from '@cd/shared-ui';
import { ReactEventHandler, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type SearchBarProps = {
    onChange?: ReactEventHandler;
    placeholder?: string;
}
function SearchBar({ placeholder = "Search", onChange }: SearchBarProps) {
    const [ isFocused, setFocused ] = useState(false)
    const focused = 'border lg:w-[420px]'
    //  w-full md:w-1/2'
    const searchRef = useRef(null)
    return (
        <div
            onFocus={ () => setFocused(true) }
            onBlur= { () => setFocused(false )}
            className={ twMerge(
                [ 'flex flex-row items-center space-x-3',
                'w-full md:w-[644px] lg:w-[244px]',
                'bg-light lg:shadow-md',
                'py-2 pl-4',
                isFocused ? focused : 'border border-transparent',
                ]
            )}
        >
            <IconWrapper Icon={Icons.Search} />
            <input placeholder={ placeholder }  className="outline-none w-full" onChange={onChange} />
        </div>
    );
}

export default SearchBar;
