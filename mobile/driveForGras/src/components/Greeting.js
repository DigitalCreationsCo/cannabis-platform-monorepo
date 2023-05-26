import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { Fonts, Colors, Icons, Sizes } from "../constants";

export default function Greeting({ isLoading }) {
  const userStore = useSelector((state) => state.user.user);
  return (
    <View style={{ paddingVertical: Sizes.padding }}>
      <Text style={{ ...Fonts.h2 }}>
        Good morning{isLoading ? null : `, ${userStore?.userName}`}{" "}
        <Icons.flower size={Sizes.icon} color={Colors.primary} />
      </Text>
    </View>
  );
}
