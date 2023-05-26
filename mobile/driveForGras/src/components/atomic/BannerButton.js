import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Sizes, Fonts } from "../../constants";

export default function BannerButton({
  height = 60,
  backgroundColor = Colors.primary,
  disabledBgColor = Colors.light,
  onPress,
  disabled,
  text,
}) {
  return (
    <View style={styles.bottom}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
          height,
          marginHorizontal: Sizes.padding3,
          borderRadius: Sizes.radius / 2,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: disabled ? disabledBgColor : backgroundColor,
          shadowColor: Colors.darkgray,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 5,
          shadowOpacity: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            ...Fonts.h2,
            color: disabled ? Colors.darkgray : Colors.white,
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    width: Sizes.width,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
});
