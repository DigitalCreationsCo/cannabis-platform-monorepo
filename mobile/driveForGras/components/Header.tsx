import { type PropsWithChildren } from 'react';
import { Path, Svg } from 'react-native-svg';
import SearchField from './SearchField';
import { styles } from '../styles';
import { View, Text } from './Themed';

type HeaderProps = {
	onSearchChange?: () => void;
	placeholder?: string;
	drawerComponentId?: string;
} & PropsWithChildren;
function Header({ onSearchChange, placeholder, children }: HeaderProps) {
	return (
		<View>
			<View>
				<Text
				// htmlFor={drawerComponentId}
				>
					{/* // add this svg to ui lib */}
					<Svg fill="none" viewBox="0 0 24 24">
						<Path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						></Path>
					</Svg>
				</Text>
				<SearchField placeholder={placeholder} onChange={onSearchChange} />
			</View>
			{children}
		</View>
	);
}

export default Header;
