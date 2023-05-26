import React from "react";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from "./redux/store";

const App = () => {
  const { store, persistor } = configureStore();
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

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}
      loading={<Text>Loading...</Text>}
      >
    // {/* <AuthSwitch authentication={authentication} /> */}
      <SafeAreaProvider>
        <SafeAreaView>
      <Text>Gras</Text>
      </SafeAreaView>
      </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
