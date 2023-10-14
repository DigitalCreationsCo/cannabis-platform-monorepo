import { useState, type ReactEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';
import Icons from '../icons';
import IconWrapper from './IconWrapper';

type SearchBarProps = {
	onChange?: ReactEventHandler;
	placeholder?: string;
};
function SearchBar({ placeholder = 'Search', onChange }: SearchBarProps) {
	const [isFocused, setFocused] = useState(false);
	const focused = 'border-primary-light';
	// const searchRef = useRef(null);
	return (
		<div
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			className={twMerge([
				'lg:rounded-full',
				'flex flex-row grow items-center lg:self-center space-x-3',
				'xl:max-w-[408px] xl:relative',
				'h-[51px]',
				'lg:shadow-md',
				'pl-4',
				'border-b-2 lg:border-l-2 border-inverse',
				isFocused && focused,
			])}
		>
			<IconWrapper Icon={Icons.Search} iconColor="light" iconSize={28} />
			<input
				placeholder={placeholder}
				className="bg-inherit text-inverse placeholder:text-inverse-soft text-lg outline-none h-full w-full"
				onChange={onChange}
			/>
		</div>
	);
}

export default SearchBar;
