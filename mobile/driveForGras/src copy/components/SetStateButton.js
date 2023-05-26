import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Colors, Sizes } from "../constants";

export default function SetStateButton({ setState, bool, children }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.light,
        justifyContent: "center",
        marginHorizontal: Sizes.padding,
        paddingHorizontal: Sizes.padding3,
        borderRadius: Sizes.radius,
      }}
      onPress={() => setState(bool)}
    >
      {children}
    </TouchableOpacity>
  );
}
