import { useState } from 'react';
import { TextInput } from 'react-native';
import { View } from '@components';
import Icons from '../icons';
import IconWrapper from './IconWrapper';
import { styles } from './styles';

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
