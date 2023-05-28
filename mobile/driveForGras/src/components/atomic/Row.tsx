import { View, ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

function Row ({ className, children }: { className?: string } & ViewProps) {
    return (
        // <Card className={twMerge('flex flex-row justify-between items-center', className)}>{children}</Card>
        <View className={twMerge('flex flex-row justify-between items-center', className)}>{children}</View>
    );
}

export default Row;
