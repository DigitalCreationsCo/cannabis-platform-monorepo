import { NavigationContainer } from "@react-navigation/native";
import React from "react";
// import 'react-native-devsettings';
import { Toasts } from '@backpackapp-io/react-native-toast';
import { PasswordlessResponseWithUserDetails } from '@cd/core-lib/src/auth/OTP';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
// import SuperTokens from 'supertokens-react-native';
import SuperTokens from 'supertokens-auth-react';
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from 'supertokens-auth-react/recipe/session';
import { AuthNavigator, DriveNavigator, navigationRef } from "./navigation";
import { persistor, store } from "./redux/store";

const apiDomain = process.env.NEXT_PUBLIC_SERVER_MAIN_URL || 'http://localhost:6001';

SuperTokens.init({
  appInfo: {
    appName: "DriveForGras",
    websiteDomain: "*",
  apiDomain,
  apiBasePath: "/api/v1/",
  },
  recipeList: [

  Passwordless.init({
    contactMethod: "EMAIL_OR_PHONE",
    
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
  // },
    // onHandleEvent: (event: any) => {
    //     console.log('passwordless event: ', event)
    //     if (event.action === 'SUCCESS') {
    //         console.log('role ? ', event.user && event.user.memberships?.[0]?.role.toLocaleUpperCase())
    //         if (event.user && event.user.memberships?.[0]?.role.toLocaleUpperCase() === 'ADMIN' ||
    //         event.user.memberships?.[0]?.role.toLocaleUpperCase() === 'OWNER') {
    //             window.location.href = dashboardDomain + '/dashboard';
    //         } else {
    //             window.location.href = `${shopDomain}${window.location.pathname}`;
    //         }
    //     }
    // },
}),
Session.init({
    // @ts-ignore
    // sessionTokenFrontendDomain: '.localhost:3000',
    // sessionTokenBackendDomain: '.localhost:3000',
    // onHandleEvent: (event) => {
    //     if (event.action === 'UNAUTHORISED' || event.action === 'SIGN_OUT') {
    //         // window.location.href = '/';
    //     }
    //     if (event.action === 'SESSION_CREATED') {
    //         console.log('session created')
    //         if (
    //             event.userContext.memberships?.[0]?.role.toLocaleUpperCase() === 'ADMIN' ||
    //             event.userContext.memberships?.[0]?.role.toLocaleUpperCase() === 'OWNER'
    //         ) {
    //             window.location.href = dashboardDomain;
    //         } else {
    //             window.location.reload()
    //         }
    //     }
    // },
})
]
}) as unknown as SuperTokensMobileImplementation;

export type SuperTokensMobileImplementation = SuperTokens.RecipeInterface & {
  signInOTPEmail: (input: string) => Promise<void>,
  handleOTPEmail: (input: string) => Promise<PasswordlessResponseWithUserDetails>,
} 

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
    <SafeAreaProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <Toasts />
          { isSignedIn ? <DriveNavigator /> : <AuthNavigator /> }
        </NavigationContainer>
      </PersistGate>
    </Provider>
    </SafeAreaProvider>
  );
};

export default App;
