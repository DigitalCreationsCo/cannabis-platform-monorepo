import { NavigationContainer } from "@react-navigation/native";
import React from "react";
// import 'react-native-devsettings';
// import { handleOTPInput, PasswordlessResponseWithUserDetails, sendOTPEmail } from '@cd/core-lib/src/auth/OTP';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import SuperTokens from 'supertokens-react-native';
import { AuthNavigator, DriveNavigator, navigationRef } from "./navigation";
import { persistor, store } from "./redux/store";

const apiDomain = process.env.NEXT_PUBLIC_SERVER_MAIN_URL || 'http://localhost:6001';

SuperTokens.init({
  apiDomain,
  apiBasePath: "/api/v1/",
  // override: {
  //   functions(originalImplementation, builder) {
  //     let 
  //     mobileImplementation: SuperTokensMobileImplementation = {
  //       ...originalImplementation,
  //       signInOTPEmail: async (input: string) => {
  //         console.log('signInEmailOTP input: ', input)
  //         return sendOTPEmail(input);
  //       },
  //       handleOTPEmail: async (input: string) => {
  //         console.log('signInEmailOTP input: ', input)
  //         return handleOTPInput(input);
  //       }
  //     }
  //     return mobileImplementation;
  //   },
  // }
})
//  as unknown as SuperTokensMobileImplementation;

// export type SuperTokensMobileImplementation = SuperTokens.RecipeInterface & {
//   signInOTPEmail: (input: string) => Promise<void>,
//   handleOTPEmail: (input: string) => Promise<PasswordlessResponseWithUserDetails>,
// } 

const App = () => {
  // const [authentication, setAuth] = useState(null);

  // useEffect(() => {
  //   const storedAuthentication = SecureStore.getItemAsync("authentication")
  //     .then((obj) => JSON.parse(obj))
  //     .then((obj) => {
  //       setAuth(obj);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  // const [fontsLoaded] = useFonts({
  //   "Rubik-Light": require("./assets/fonts/Rubik-Light.ttf"),
  //   "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
  //   "Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
  // });
  
  // if (!fontsLoaded) return <InitialLoading />;

  const 
  isSignedIn = false;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          { isSignedIn ? <DriveNavigator /> : <AuthNavigator /> }
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
