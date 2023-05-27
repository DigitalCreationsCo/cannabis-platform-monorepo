import { Screen } from '@cd/native-ui';
import React from "react";
import { Text, View } from "react-native";

const LoginScreen = () => {
  return (
    <View>
      <Text className="text-xl">Login Screen</Text>
    </View>
  )
}

export default Screen(LoginScreen)