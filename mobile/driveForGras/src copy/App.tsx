import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import AuthSwitch from "./navigation/AuthSwitch";
import store from "./redux/store";

import { InitialLoading } from "./screens";

const App = () => {
  const [authentication, setAuth] = useState(null);

  useEffect(() => {
    const storedAuthentication = SecureStore.getItemAsync("authentication")
      .then((obj) => JSON.parse(obj))
      .then((obj) => {
        setAuth(obj);
      })
      .catch((error) => console.log(error));
  }, []);

  const [fontsLoaded] = useFonts({
    "Rubik-Light": require("./assets/fonts/Rubik-Light.ttf"),
    "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
  });
  if (!fontsLoaded) return <InitialLoading />;

  return (
    <Provider store={store}>
      <AuthSwitch authentication={authentication} />
    </Provider>
  );
};

export default App;
