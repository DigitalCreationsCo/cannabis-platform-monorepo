import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import SuperTokens from 'supertokens-react-native';
import { NativeToastProvider } from './components';
import { AuthNavigator, navigationRef } from "./navigation";
import { persistor, store } from "./redux/store";

// must add axios interceptors on all axios imports, or provide a global configuration
SuperTokens.addAxiosInterceptors(axios);

const 
apiDomain = process.env.NEXT_PUBLIC_SERVER_MAIN_URL || 'http://localhost:6001';

SuperTokens.init({
  apiDomain,
  apiBasePath: "/api/v1",

  tokenTransferMethod: "cookie",
  sessionTokenBackendDomain: apiDomain,
}) 

const App = () => {  
  return (
    <SafeAreaProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <AuthNavigator />
          <NativeToastProvider />
        </NavigationContainer>
      </PersistGate>
    </Provider>
    </SafeAreaProvider>
  );
};

export default App;
