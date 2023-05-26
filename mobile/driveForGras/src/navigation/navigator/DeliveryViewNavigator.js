import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  DeliverOrderView,
  PickupProductView,
  ContinueToCustomerView,
  FinalizeDeliveryView,
} from "../../views";
import { DeliveryScreens } from "../navigationPaths";
import { useSelector } from "react-redux";
import Selector from "../../redux/selector";

const DeliveryViewNavigator = () => {
  const { dispatchOrders, remainingRoute, destinationType } = useSelector(
    Selector.socket
  );
  let currentOrder = remainingRoute && remainingRoute[0];
  let currentDestination = currentOrder && currentOrder[destinationType];
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={DeliveryScreens.DELIVERY_ORDER_VIEW}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={DeliveryScreens.DELIVERY_ORDER_VIEW}>
        {() => (
          <DeliverOrderView
            dispatchOrders={dispatchOrders}
            remainingRoute={remainingRoute}
            destinationType={destinationType}
            currentOrder={currentOrder}
            currentDestination={currentDestination}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name={DeliveryScreens.PICKUP_PRODUCT_VIEW}>
        {() => (
          <PickupProductView
            remainingRoute={remainingRoute}
            destinationType={destinationType}
            currentOrder={currentOrder}
            currentDestination={currentDestination}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name={DeliveryScreens.CONTINUE_TO_CUSTOMER_VIEW}>
        {() => (
          <ContinueToCustomerView
            remainingRoute={remainingRoute}
            destinationType={destinationType}
            currentOrder={currentOrder}
            currentDestination={currentDestination}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name={DeliveryScreens.FINALIZE_DELIVERY_VIEW}>
        {() => (
          <FinalizeDeliveryView
            remainingRoute={remainingRoute}
            destinationType={destinationType}
            currentOrder={currentOrder}
            currentDestination={currentDestination}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default DeliveryViewNavigator;
