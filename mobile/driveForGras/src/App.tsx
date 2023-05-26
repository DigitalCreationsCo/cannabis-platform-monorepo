import React from "react";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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

  return (
    // <Provider store={store}>
      // {/* <AuthSwitch authentication={authentication} /> */}
      <SafeAreaProvider>
        <SafeAreaView>
      <Text>hello</Text>
      </SafeAreaView>
      </SafeAreaProvider>
    // </Provider>
  );
};

export default App;
