import { useState } from 'react';
import { TextInput } from 'react-native';
import Icons from '@expo/vector-icons/MaterialIcons';
import IconWrapper from './IconWrapper';
import { styles } from '../styles';
import { View } from './Themed';

type SearchBarProps = {
	onChange?: () => void;
	placeholder?: string;
};
function SearchBar({ placeholder = 'Search', onChange }: SearchBarProps) {
	const [isFocused, setFocused] = useState(false);
	// const searchRef = useRef(null);
	return (
		<View onResponderStart={() => setFocused(true)}>
			<IconWrapper Icon={<Icons name='search' />} />
			<TextInput placeholder={placeholder} onChange={onChange} />
		</View>
	);
}

export default SearchBar;
