import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import { TransitionPresets } from "@react-navigation/stack";
import { DriveScreens } from "../navigationPaths";
import {
  DeliveryOrderScreen,
  NewOrderScreen,
  CompleteDeliveryScreen,
  MapScreen,
} from "../../screens";

const DriveNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={
        // "Test"
        DriveScreens.HOME
      }
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={"Test"}
        component={
          // MapScreen
          DeliveryOrderScreen
          // CompleteDeliveryScreen
          // TabNavigator
        }
      />
      <Stack.Screen name={DriveScreens.HOME} component={TabNavigator} />
      <Stack.Screen
        name={DriveScreens.NEW_ORDER_SCREEN}
        component={NewOrderScreen}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name={DriveScreens.DELIVERY_ORDER_SCREEN}
        component={DeliveryOrderScreen}
      />
      <Stack.Screen
        name={DriveScreens.COMPLETE_DELIVERY_SCREEN}
        component={CompleteDeliveryScreen}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default DriveNavigator;
