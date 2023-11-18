import { type PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { twMerge } from 'tailwind-merge';
import { styles } from '../classes';
import SearchField from './SearchField';

type HeaderProps = {
	onSearchChange?: () => void;
	placeholder?: string;
	drawerComponentId?: string;
} & PropsWithChildren;
function Header({ onSearchChange, placeholder, children }: HeaderProps) {
	return (
		<View className={twMerge(styles.header.container)}>
			<View className={twMerge(styles.header.header)}>
				<Text
					// htmlFor={drawerComponentId}
					className={twMerge(styles.header.drawerButton)}
				>
					{/* // add this svg to ui-lib lib */}
					<Svg
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-6 h-6 stroke-current"
					>
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
