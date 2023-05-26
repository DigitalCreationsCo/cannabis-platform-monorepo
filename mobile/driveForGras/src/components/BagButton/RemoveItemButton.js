import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Icons, Colors, Sizes, Fonts, Shadow } from "../../constants";

import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { removeItem } from "../../redux/features/cart";

export default function RemoveItemButton({ item }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View
      style={{
        marginVertical: Sizes.padding3 * 2,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.lightGray3,
          padding: Sizes.padding3,
          borderRadius: Sizes.radius,
        }}
        onPress={() => {
          dispatch(removeItem(item));
          navigation.goBack();
        }}
      >
        <Icons.remove size={Sizes.icon} color={Colors.red} />
        <Text style={{ ...Fonts.h5, marginLeft: Sizes.padding }}>
          Remove item
        </Text>
      </TouchableOpacity>
    </View>
  );
}
