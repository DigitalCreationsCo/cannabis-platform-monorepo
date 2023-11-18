import { useState } from 'react';
import { TextInput } from 'react-native';
import { View } from '@themed';
import Icons from '../icons';
import { styles } from '../styles';
import IconWrapper from './IconWrapper';

type SearchBarProps = {
	onChange?: () => void;
	placeholder?: string;
};
function SearchBar({ placeholder = 'Search', onChange }: SearchBarProps) {
	const [isFocused, setFocused] = useState(false);
	// const searchRef = useRef(null);
	return (
		<View onResponderStart={() => setFocused(true)}>
			<IconWrapper Icon={Icons.Search2} />
			<TextInput placeholder={placeholder} onChange={onChange} />
		</View>
	);
}

export default SearchBar;
