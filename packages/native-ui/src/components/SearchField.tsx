import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { styles } from '../classes';
import Icons from '../icons';
import IconWrapper from './IconWrapper';

type SearchBarProps = {
	onChange?: () => void;
	placeholder?: string;
};
function SearchBar({ placeholder = 'Search', onChange }: SearchBarProps) {
	const [isFocused, setFocused] = useState(false);
	// const searchRef = useRef(null);
	return (
		<View
			onResponderStart={() => setFocused(true)}
			className={twMerge(
				styles.searchField.container,
				styles.searchField.isFocused_f(isFocused),
			)}
		>
			<IconWrapper Icon={Icons.Search2} />
			<TextInput
				placeholder={placeholder}
				className="text-lg outline-none h-full w-full"
				onChange={onChange}
			/>
		</View>
	);
}

export default SearchBar;
