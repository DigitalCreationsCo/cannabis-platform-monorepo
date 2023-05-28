import React from "react";
// import { userActions } from "../redux/features/user";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { Screen } from '../components';
import { LoginView, PasscodeView } from "../views";
// import { Images, Fonts, Colors, Sizes, Shadow, Icons } from "../constants";

const LoginScreen = () => {

  const 
  LoginStack = createStackNavigator();

  return (
  <LoginStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>

    <LoginStack.Screen 
    name="Login" 
    component={LoginView} 
    options={{
      ...TransitionPresets.FadeFromBottomAndroid,
    }}
    />

    <LoginStack.Screen 
    name="Passcode" 
    component={PasscodeView} 
    options={{
      ...TransitionPresets.ModalSlideFromBottomIOS,
    }}
    />
    
  </LoginStack.Navigator>)
}

export default Screen(LoginScreen)
