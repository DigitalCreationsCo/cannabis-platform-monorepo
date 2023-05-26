import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Icons, Sizes, Colors, Fonts, Shadow } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function ShowBagButton() {
  const totalItems = useSelector((state) => state.cart.totalItems);
  const navigation = useNavigation();

  return (
    <View
      style={{
        marginTop: Sizes.padding2,
        marginBottom: Sizes.padding,
        width: Sizes.width,
      }}
    >
      <TouchableOpacity
        style={{
          width: "95%",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.primary,
          borderRadius: Sizes.radius / 2,
          marginHorizontal: Sizes.padding3,
          padding: Sizes.padding3 * 2,
          ...Shadow,
        }}
        onPress={() => navigation.navigate("BagScreen")}
      >
        <Text style={{ ...Fonts.h2, color: Colors.white }}>
          View Bag ( {totalItems} )
        </Text>
      </TouchableOpacity>
    </View>
  );
}
