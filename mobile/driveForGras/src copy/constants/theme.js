import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const Shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 1,
};

export const Colors = {
  // base colors
  primary: "#62bd6d", // mantis green
  secondary: "#7A7978", // sonic silver
  light: "#90FFDC", // aquamarine green
  aqua: "#8DE4FF", // aqua blue
  blue: "#8AC4FF", // aero blue
  red: "#E63946",

  // shades
  black: "#1E1F20",
  white: "#FFFFFF",

  lightGray: "#F8F8F9",
  lightGray2: "#F6F6F7",
  lightGray3: "#EFEFF1",
  transparent: "transparent",
  darkgray: "#898C95",
};

export const Sizes = {
  // global sizes
  base: 8,
  font: 14,
  radius: 10,
  padding: 5,
  padding2: 10,
  padding3: 14,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 24,
  h3: 22,
  h4: 18,
  h5: 16,
  body1: 28,
  body2: 22,
  body3: 18,
  body4: 14,
  body5: 12,

  // icon sizes
  icon: 28,
  focused: 32,

  // app dimensions
  width,
  height,

  // component dimensionc
  cardWidth: width * 0.65,
  cardHeight: height * 0.25,

  cardSpacingInset: width * 0.1 - 10,
};

export const Fonts = {
  largeTitle: {
    fontFamily: "Rubik-Medium",
    fontSize: Sizes.largeTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: "Rubik-Medium", fontSize: Sizes.h1, lineHeight: 36 },
  h1Light: { fontFamily: "Rubik-Light", fontSize: Sizes.h1, lineHeight: 36 },
  h2: { fontFamily: "Rubik-Medium", fontSize: Sizes.h2 },
  h2Light: { fontFamily: "Rubik-Regular", fontSize: Sizes.h2 },
  h3: { fontFamily: "Rubik-Medium", fontSize: Sizes.h3 },
  h3Light: { fontFamily: "Rubik-Regular", fontSize: Sizes.h3 },
  h4: { fontFamily: "Rubik-Medium", fontSize: Sizes.h4 },
  h4Light: { fontFamily: "Rubik-Regular", fontSize: Sizes.h4 },
  h5: { fontFamily: "Rubik-Regular", fontSize: Sizes.h5 },
  body1: { fontFamily: "Rubik-Light", fontSize: Sizes.body1, lineHeight: 36 },
  body2: { fontFamily: "Rubik-Light", fontSize: Sizes.body2, lineHeight: 30 },
  body3: { fontFamily: "Rubik-Light", fontSize: Sizes.body3, lineHeight: 22 },
  body4: { fontFamily: "Rubik-Light", fontSize: Sizes.body4, lineHeight: 20 },
  body5: { fontFamily: "Rubik-Light", fontSize: Sizes.body5, lineHeight: 20 },
};

const appTheme = { Shadow, Colors, Sizes, Fonts };

export default appTheme;
