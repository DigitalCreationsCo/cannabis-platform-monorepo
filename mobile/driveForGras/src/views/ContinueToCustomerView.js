import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors, Fonts, Sizes } from "../constants";
import { BannerButton } from "../components";
import { useNavigation } from "@react-navigation/native";
import { DeliveryScreens } from "../navigation/navigationPaths";

export default function ContinueToCustomerView({
  remainingRoute,
  currentOrder,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: Sizes.cardWidth,
          }}
        >
          <Text
            style={{
              ...Fonts.h3,
              color: Colors.primary,
              textAlign: "center",
            }}
          >
            You picked up your {remainingRoute.length > 1 ? "orders" : "order"}{" "}
            on time. Nice job!
          </Text>
          {/* possibly show the user avatar here */}
        </View>
        <Text style={{ ...Fonts.body3 }}>
          Deliver the order to {currentOrder.customer.firstName} (
          {currentOrder.customer.userName})
        </Text>
        <Text style={{ ...Fonts.body3 }}>{`${
          currentOrder.customer.location.street
        }, ${currentOrder.customer.location.city}, ${
          currentOrder.customer.location.state
        }, ${currentOrder.customer.location.zipcode.split("-")[0]}`}</Text>
      </View>

      <BannerButton
        text={"Deliver orders"}
        onPress={() => navigation.navigate(DeliveryScreens.DELIVERY_ORDER_VIEW)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
