import React from "react";
import { Text, View } from "react-native";
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
          <View className="m-auto bg-primary-light border items-center justify-center flex grow h-full w-full">
      <Text className="text-2xl text-inverse font-bold">Gras</Text>
      </View>
      </SafeAreaView>
      </SafeAreaProvider>
    // </Provider>
  );
};

export default App;
