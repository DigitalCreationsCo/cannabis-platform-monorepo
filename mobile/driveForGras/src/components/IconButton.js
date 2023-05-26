import Button from "./atomic/Button";
import React from "react";
import { View } from "react-native";
import { Colors, Sizes } from "../constants";

export default function IconButton({ onPress, Icon, value }) {
  return (
    <View style={{ width: 40 }}>
      <Button borderColor={Colors.primary} onPress={onPress}>
        <Icon
          size={Sizes.icon}
          color={value ? Colors.darkgray : Colors.transparent}
        />
      </Button>
    </View>
  );
}
