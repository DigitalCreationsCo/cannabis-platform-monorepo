import { twMerge } from 'tailwind-merge';
import { Icons, IconWrapper } from '@cd/shared-ui';

function SearchBar() {
    return (
        <div
            className={twMerge(
                'items-center',
                'bg-white',
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
            <input className="outline-none w-full" placeholder="Search" />
        </div>
    );
}

export default SearchBar;
