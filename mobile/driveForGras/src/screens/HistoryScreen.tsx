import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

import { useSelector } from "react-redux";

const HistoryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>HistoryScreen</Text>
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

export default HistoryScreen;
