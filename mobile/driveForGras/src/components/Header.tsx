import { RNstyles } from '@cd/core-lib/src';
import { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import Svg, { Path } from "react-native-svg";
import { twMerge } from 'tailwind-merge';
import SearchField from './SearchField';

type HeaderProps = {
    onSearchChange?: () => void;
    placeholder?: string;
    drawerComponentId?: string;
} & PropsWithChildren;
function Header({ onSearchChange, placeholder, drawerComponentId, children }: HeaderProps) {
    return (
        <View className={twMerge(RNstyles.header.container)}>
            <View className={twMerge(RNstyles.header.header)}>
                <Text 
                // htmlFor={drawerComponentId} 
                className={twMerge(RNstyles.header.drawerButton)}>
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
