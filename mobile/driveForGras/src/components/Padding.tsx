import { PropsWithChildren } from 'react';
import { View } from 'react-native';

function Padding({ children }: PropsWithChildren) {
    return <View className="p-12">{children}</View>;
}

export default Padding;
