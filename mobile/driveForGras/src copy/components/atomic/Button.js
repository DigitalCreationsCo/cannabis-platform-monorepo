import { TouchableOpacity } from "react-native";
import React from "react";
import { Colors, Sizes } from "../../constants";

export default function Button({
  height = 40,
  width,
  borderColor,
  onPress,
  children,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height,
        width,
        borderColor,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.lightGray3,
        padding: Sizes.padding,
        borderWidth: 2,
        borderRadius: Sizes.radius,
      }}
    >
      {children}
    </TouchableOpacity>
  );
}
