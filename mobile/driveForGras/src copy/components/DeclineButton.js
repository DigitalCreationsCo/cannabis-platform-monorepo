import { View, Text } from "react-native";
import Button from "./atomic/Button";
import React from "react";
import { Colors } from "../constants";

export default function DeclineButton({ onPress }) {
  return (
    <View>
      <Button color={Colors.red} borderColor={Colors.red} onPress={onPress}>
        <Text style={{ fontSize: 20 }}>decline</Text>
      </Button>
    </View>
  );
}
