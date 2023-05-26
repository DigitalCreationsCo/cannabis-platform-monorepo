import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icons, Colors, Sizes, Fonts, Shadow } from '../../constants'

import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { updateItemQty } from '../../redux/features/cart'

export default function UpdateBagButton({itemQty, toCart}) {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    return (
        <View style={styles.bottom}>
            <TouchableOpacity style={{
                marginHorizontal: Sizes.padding3,
                borderRadius: Sizes.radius / 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.primary,
                height: 90
            }}
            onPress={() => {
                dispatch(updateItemQty(toCart))
                navigation.goBack()
            }}
            >
                <Text style={{
                    textAlign: 'center',
                    ...Fonts.h2,
                    color: Colors.white,
                }}>
                    Update Bag{'\n'}
                    { (toCart.unit * itemQty).toFixed(1) }g{'  '}
                    ${ toCart.subTotal }</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bottom: {
        width: Sizes.width,
        justifyContent: 'flex-end'
    }
})