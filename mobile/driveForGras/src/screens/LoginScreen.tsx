import TextContent from "@cd/core-lib/src/constants/textContent";
import Icons from '@cd/native-ui/src/icons';
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { View } from "react-native";
import { FlexBox, H1, H5, Screen } from '../components';
import { LoginView, PasscodeView } from "../views";

const LoginScreen = () => {

  const 
  LoginStack = createStackNavigator();
  return (
    <>
    
    <View>
      <FlexBox className="flex-row items-center">
      <H1 color="light">
        {TextContent.info.COMPANY_NAME}
      </H1>
      <Icons.Flower color="white" />
      </FlexBox>
      <H5 color="light">
        {TextContent.technical.DRIVER_APP} DRIVER APP
      </H5>
    </View>

    <LoginStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }} >

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
      
    </LoginStack.Navigator>
  </>)
}

export default Screen(LoginScreen)
