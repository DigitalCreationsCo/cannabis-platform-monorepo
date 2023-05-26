import React from "react";
import { Text } from "react-native";
// import Selector from "../../redux/selector";

const DeliveryViewNavigator = () => {
  // const { dispatchOrders, remainingRoute, destinationType } = useSelector(
  //   Selector.socket
  // );
  // let currentOrder = remainingRoute && remainingRoute[0];
  // let currentDestination = currentOrder && currentOrder[destinationType];
  // const Stack = createStackNavigator();
  // return (
  //   <Stack.Navigator
  //     initialRouteName={DeliveryScreens.DELIVERY_ORDER_VIEW}
  //     screenOptions={{
  //       headerShown: false,
  //     }}
  //   >
  //     <Stack.Screen name={DeliveryScreens.DELIVERY_ORDER_VIEW}>
  //       {() => (
  //         <DeliverOrderView
  //           dispatchOrders={dispatchOrders}
  //           remainingRoute={remainingRoute}
  //           destinationType={destinationType}
  //           currentOrder={currentOrder}
  //           currentDestination={currentDestination}
  //         />
  //       )}
  //     </Stack.Screen>
  //     <Stack.Screen name={DeliveryScreens.PICKUP_PRODUCT_VIEW}>
  //       {() => (
  //         <PickupProductView
  //           remainingRoute={remainingRoute}
  //           destinationType={destinationType}
  //           currentOrder={currentOrder}
  //           currentDestination={currentDestination}
  //         />
  //       )}
  //     </Stack.Screen>
  //     <Stack.Screen name={DeliveryScreens.CONTINUE_TO_CUSTOMER_VIEW}>
  //       {() => (
  //         <ContinueToCustomerView
  //           remainingRoute={remainingRoute}
  //           destinationType={destinationType}
  //           currentOrder={currentOrder}
  //           currentDestination={currentDestination}
  //         />
  //       )}
  //     </Stack.Screen>
  //     <Stack.Screen name={DeliveryScreens.FINALIZE_DELIVERY_VIEW}>
  //       {() => (
  //         <FinalizeDeliveryView
  //           remainingRoute={remainingRoute}
  //           destinationType={destinationType}
  //           currentOrder={currentOrder}
  //           currentDestination={currentDestination}
  //         />
  //       )}
  //     </Stack.Screen>
  //   </Stack.Navigator>
  // );
  return (
    <Text>Delivery View Navigator</Text>
  )
};

export default DeliveryViewNavigator;
