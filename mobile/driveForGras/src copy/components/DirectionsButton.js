import { View, Text } from "react-native";
import Button from "./atomic/Button";
import React from "react";
import { Colors, Fonts } from "../constants";

export default function DirectionsButton({ onPress }) {
  return (
    <View style={{ marginRight: 10 }}>
      <Button borderColor={Colors.primary} onPress={onPress}>
        <Text style={{ ...Fonts.h4, color: Colors.darkgray }}>Directions</Text>
      </Button>
    </View>
  );
}
