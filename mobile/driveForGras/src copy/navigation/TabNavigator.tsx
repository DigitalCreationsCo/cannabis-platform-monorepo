import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import React from "react";
// import { Colors, Icons, Sizes } from "../../constants";
// import { TabScreens } from "../paths";
// import { HistoryScreen, MapScreen, UserSettingScreen } from "../screens";

import { Text } from "react-native";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  // return (
  //   <Tab.Navigator
  //     screenOptions={{
  //       headerShown: false,
  //       tabBarShowLabel: false,
  //       tabBarStyle: {
  //         display: "flex",
  //         borderTopWidth: 0,
  //         elevation: 0,
  //         backgroundColor: "transparent",
  //         marginBottom: 5,
  //       },
  //     }}
  //   >
  //     <Tab.Screen
  //       name={TabScreens.MAP_SCREEN}
  //       component={MapScreen}
  //       options={{
  //         tabBarIcon: ({ focused }) => (
  //           <Icons.flower
  //             size={focused ? Sizes.focused : Sizes.icon}
  //             color={focused ? Colors.primary : Colors.secondary}
  //           />
  //         ),
  //       }}
  //     />
  //     <Tab.Screen
  //       name={TabScreens.HISTORY_SCREEN}
  //       component={HistoryScreen}
  //       options={{
  //         tabBarIcon: ({ focused }) => (
  //           <Icons.search
  //             size={focused ? Sizes.focused : Sizes.icon}
  //             color={focused ? Colors.primary : Colors.secondary}
  //           />
  //         ),
  //       }}
  //     />
  //     <Tab.Screen
  //       name={TabScreens.SETTING_SCREEN}
  //       component={UserSettingScreen}
  //       options={{
  //         tabBarIcon: ({ focused }) => (
  //           <Icons.user
  //             size={focused ? Sizes.focused : Sizes.icon}
  //             color={focused ? Colors.primary : Colors.secondary}
  //           />
  //         ),
  //       }}
  //     />
  //   </Tab.Navigator>
  // );
  return (
    <Text>Tab Navigator</Text>
  )
};

export default TabNavigator;
