import { createStackNavigator } from "@react-navigation/stack";
import { DriveScreens } from "./paths";
import TabNavigator from "./TabNavigator";

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
      {/* <Stack.Screen
        name={"Test"}
        component={
          DeliveryOrderScreen
          // MapScreen
          // CompleteDeliveryScreen
          // TabNavigator
        }
      /> */}
      <Stack.Screen name={DriveScreens.HOME} component={TabNavigator} />
      {/* <Stack.Screen
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
      /> */}
    </Stack.Navigator>
  );
};

export default DriveNavigator;
