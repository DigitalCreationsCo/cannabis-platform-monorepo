import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabScreens } from "../navigationPaths";
import { MapScreen, HistoryScreen, UserSettingScreen } from "../../screens";
import { Icons, Colors, Sizes } from "../../constants";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: "flex",
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: "transparent",
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name={TabScreens.MAP_SCREEN}
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icons.flower
              size={focused ? Sizes.focused : Sizes.icon}
              color={focused ? Colors.primary : Colors.secondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabScreens.HISTORY_SCREEN}
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icons.search
              size={focused ? Sizes.focused : Sizes.icon}
              color={focused ? Colors.primary : Colors.secondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabScreens.SETTING_SCREEN}
        component={UserSettingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icons.user
              size={focused ? Sizes.focused : Sizes.icon}
              color={focused ? Colors.primary : Colors.secondary}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
