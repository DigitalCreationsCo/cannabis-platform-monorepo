import React from 'react';
import { TouchableOpacity } from 'react-native'
import { Icons, Sizes, Colors } from '../constants';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
    
    const navigation = useNavigation()

    return (
        <TouchableOpacity 
            style={{
                position: 'absolute',
                top: Sizes.width * .15,
                left: Sizes.width * .05,
                zIndex: 1,
                backgroundColor: Colors.white,
                width: 40,
                height: 40,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onPress={() => {
                navigation.goBack()
            }}>
            <Icons.back size={Sizes.icon} color={Colors.darkgray} />
        </TouchableOpacity>
    )
}
