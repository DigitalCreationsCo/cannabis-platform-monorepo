import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, type ReactEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';
import { IconButton } from './button';
import FlexBox from './FlexBox';

export type SearchBarProps = {
	onChange?: ReactEventHandler;
	placeholder?: string;
};
function SearchBar({ placeholder = 'Search', onChange }: SearchBarProps) {
	const [isFocused, setFocused] = useState(false);
	const focused = 'border-primary-light';
	// const searchRef = useRef(null);
	return (
		<FlexBox
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			className={twMerge([
				'flex-row grow items-center',
				'border border-dark-soft rounded',
				'bg-light',
				isFocused && focused,
			])}
		>
			<input
				placeholder={placeholder}
				className={twMerge([
					'w-full h-10',
					'px-4',
					'outline-none',
					'rounded-l',
				])}
				onChange={onChange}
			/>
			<IconButton
				Icon={MagnifyingGlassIcon}
				iconSize={28}
				className="rounded-none rounded-r-sm"
			/>
		</FlexBox>
	);
}

export default SearchBar;
