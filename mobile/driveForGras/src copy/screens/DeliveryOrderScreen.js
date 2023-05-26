import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import DeliveryViewNavigator from "../navigation/navigator/DeliveryViewNavigator";
import { Fonts } from "../constants";
import { useSelector } from "react-redux";
import Selector from "../redux/selector";

const DeliveryOrderScreen = () => {
  const { destinationType } = useSelector(Selector.remainingRoute);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ ...Fonts.body3 }}>
          {(destinationType === "vendor" &&
            `Pick up from ${currentDestination.publicName}`) ||
            (destinationType === "customer" &&
              `Deliver to ${currentDestination.firstName} (${currentDestination.userName})`)}
        </Text>
      </View>

      <DeliveryViewNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DeliveryOrderScreen;
