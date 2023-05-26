import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./NavigationService";

const AppContainer = ({ children }) => (
  <NavigationContainer ref={navigationRef}>{children}</NavigationContainer>
);

export default AppContainer;
