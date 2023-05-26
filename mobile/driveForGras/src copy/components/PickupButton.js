import { View, Text } from "react-native";
import React from "react";
import BannerButton from "./atomic/BannerButton";
import { Fonts } from "../constants";

export default function PickupButton({ onPress, disabled }) {
  return (
    <View>
      <Text style={{ ...Fonts.body4, textAlign: "center", paddingBottom: 5 }}>
        Press Pickup order when you arrive
      </Text>
      <BannerButton
        onPress={onPress}
        disabled={disabled}
        text={`Pickup order`}
      />
    </View>
  );
}
