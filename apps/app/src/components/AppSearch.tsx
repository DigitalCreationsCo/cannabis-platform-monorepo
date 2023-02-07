import { Icons, IconWrapper } from '@cd/shared-ui';
import { ReactEventHandler, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type SearchBarProps = {
    onChange?: ReactEventHandler;
    placeholder?: string;
};
function SearchBar({ placeholder = 'Search', onChange }: SearchBarProps) {
    const [isFocused, setFocused] = useState(false);
    const focused = 'border';
    // const searchRef = useRef(null);
    return (
        <div
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={twMerge([
                'flex flex-row grow items-center lg:self-center space-x-3',
                'xl:max-w-[408px] xl:relative',
                'h-[51px]',
                'bg-light lg:shadow-md',
                'py-2 pl-4',
                isFocused ? focused : 'border border-transparent',
            ])}
        >
            <IconWrapper Icon={Icons.Search} />
            <input placeholder={placeholder} className="text-lg outline-none h-full w-full" onChange={onChange} />
        </div>
    );
}

export default SearchBar;
