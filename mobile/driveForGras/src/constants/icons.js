import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export const flower = ({ size, color }) => (
  <MaterialCommunityIcons name="flower" size={size} color={color} />
);
export const search = ({ size, color }) => (
  <Ionicons name="search-sharp" size={size} color={color} />
);
export const star = ({ size, color }) => (
  <MaterialIcons name="star" size={size} color={color} />
);
export const starOutline = ({ size, color }) => (
  <MaterialIcons name="star-outline" size={size * 1.4} color={color} />
);
export const user = ({ size, color }) => (
  <Entypo name="user" size={size} color={color} />
);
export const back = ({ size, color }) => (
  <Ionicons name="md-chevron-back-sharp" size={size} color={color} />
);
export const fancyBack = ({ size, color }) => (
  <Entypo name="back" size={size} color={color} />
);
export const bag = ({ size, color }) => (
  <MaterialIcons name="shopping-bag" size={size} color={color} />
);
export const groupAdd = ({ size, color }) => (
  <MaterialIcons
    name="group-add"
    size={size * 1.25}
    color={color}
    style={{ marginTop: -1 }}
  />
);
export const call = ({ size, color }) => (
  <Ionicons name="call-sharp" size={size * 0.9} color={color} />
);
export const remove = ({ size, color }) => (
  <Ionicons name="remove-circle-sharp" size={size} color={color} />
);
export const close = ({ size, color }) => (
  <Ionicons name="ios-close" size={size} color={color} />
);
export const phone = ({ size, color }) => (
  <AntDesign name="phone" size={size} color={color} />
);
export const checkmark = ({ size, color }) => (
  <Feather name="check" size={size} color={color} />
);

export default {
  flower,
  search,
  star,
  starOutline,
  user,
  back,
  fancyBack,
  bag,
  groupAdd,
  call,
  remove,
  close,
  phone,
  checkmark,
};
