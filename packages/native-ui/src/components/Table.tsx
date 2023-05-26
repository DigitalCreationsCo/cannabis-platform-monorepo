import React from 'react';
import { View } from 'react-native';

type TableProps = {
    head?: any;
    body: any;
};
function Table({ head, body }: TableProps) {
    return (
        <View className="table-auto">
            <View></View>
            <View></View>
        </View>
    );
}

export default Table;
