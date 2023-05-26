import React from 'react'
import { View, Text } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { Colors, Fonts } from '../constants/theme'

const cartBadge = (props) => {
    const { stroke, fill } = props
    return (
    <View style={{
        position: 'absolute',
        zIndex: 100,
        right: 5
    }}>
        <Svg height={24} width={24}>
            
            <Circle cx={12} cy={12} r={10} 
            stroke={stroke} fill={fill}
            strokeWidth={3}
            />
            <Text style={{
                color: Colors.white,
                ...Fonts.h4,
                textAlign: 'center'
                }}>
                {props.children}</Text>
        </Svg>
    </View>
    )
}

export const SvgIcons = {
    cartBadge
}