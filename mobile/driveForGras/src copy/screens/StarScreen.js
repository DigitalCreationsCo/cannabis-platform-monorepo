import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { ShowBagButton } from "../components";

import { useSelector } from "react-redux";

const StarScreen = () => {
  const { cart } = useSelector((state) => state);

  return (
    <SafeAreaView style={styles.container}>
      <Text>StarScreen</Text>

      {cart.isEmpty ? null : <ShowBagButton />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StarScreen;
