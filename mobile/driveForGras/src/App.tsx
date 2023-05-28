import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import SuperTokens from 'supertokens-react-native';
import { NativeToastProvider } from './components';
import { AuthNavigator, DriveNavigator, navigationRef } from "./navigation";
import { persistor, store } from "./redux/store";
SuperTokens.addAxiosInterceptors(axios);

const 
apiDomain = process.env.NEXT_PUBLIC_SERVER_MAIN_URL || 'http://localhost:6001';

SuperTokens.init({
  apiDomain,
  apiBasePath: "/api/v1/",
}) 

const App = () => {

  // const isSignedIn = false;
  const 
  { isSignedIn, user } = store.getState().user;

  useEffect(() => {
    console.log('isSignedIn: ', isSignedIn);
  }, [isSignedIn])
  
  return (
    <SafeAreaProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          { isSignedIn ? <DriveNavigator /> : <AuthNavigator /> }
          <NativeToastProvider />
        </NavigationContainer>
      </PersistGate>
    </Provider>
    </SafeAreaProvider>
  );
};

export default App;
