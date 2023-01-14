import { Icons, IconWrapper } from '@cd/shared-ui';
import { ReactEventHandler, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type SearchBarProps = {
    onChange?: ReactEventHandler;
    placeholder?: string;
}
function SearchBar({ placeholder = "Search", onChange }: SearchBarProps) {
    const [ isFocused, setFocused ] = useState(false)
    const focused = 'border w-full md:w-1/2'
    const searchRef = useRef(null)
    return (
        <div
            onFocus={ () => setFocused(true) }
            onBlur= { () => setFocused(false )}
            className={ twMerge(
                'container items-center bg-light',
                'flex flex-row space-x-3',
                'w-full md:w-[777px] lg:w-[333px]',
                'px-4 py-2',
                'outline-none',
                'wh-10',
                isFocused ? focused : 'border border-transparent',
            )}
        >
            <IconWrapper Icon={Icons.Search} />
            <input placeholder={ placeholder }  className="outline-none w-full" onChange={onChange} />
        </div>
    );
}

export default SearchBar;
