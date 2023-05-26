import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

import { Colors, Images } from '../constants'

const InitialLoading = () => {
    return (
        <View style={styles.container}>
            <Image 
                source={Images.splashImage}
                style={{
                    width: 250,
                    height: 150
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lightGray3,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default InitialLoading