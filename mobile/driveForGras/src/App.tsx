import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { AuthNavigator, DriveNavigator, navigationRef } from "./navigation";
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

  const 
  isSignedIn = false;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}
      loading={<Text>Loading...</Text>}
      >
        <NavigationContainer ref={navigationRef}>
       // {/* <AuthSwitch authentication={authentication} /> */}
          { isSignedIn ? <DriveNavigator /> : <AuthNavigator /> }
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
