import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Icons, Colors, Sizes, Fonts, Shadow } from "../constants";

// ?? What even is this ??
// I think an old copy of the homescreen skeleton code...

export default function UiSkeleton() {
  const arr = [1, 2, 3, 4, 5];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGray3 }}>
      <View style={{ paddingHorizontal: Sizes.padding }}>
        <Text style={{ ...Fonts.h1, color: Colors.primary }}>
          Cannabis Delivery
        </Text>

        {/* alternative greeting
                <Text style={{ ...Fonts.largeTitle }}
                    accessibilityLabel={`Hello, ${user?.firstName}`}
                >suuh, {user?.firstName}</Text> */}

        <Text style={{ ...Fonts.h1 }}>{"  "}. . .</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            marginVertical: Sizes.padding,
            height: 50,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: Colors.light,
              height: "100%",
              justifyContent: "center",
              marginHorizontal: Sizes.padding,
              paddingHorizontal: Sizes.padding3,
              borderRadius: Sizes.radius,
            }}
            onPress={() => setPickupViewEnabled(false)}
          >
            <Text style={{ ...Fonts.h5 }}>Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.light,
              height: "100%",
              justifyContent: "center",
              marginHorizontal: Sizes.padding,
              paddingHorizontal: Sizes.padding3,
              borderRadius: Sizes.radius,
            }}
            onPress={() => setPickupViewEnabled(true)}
          >
            <Text style={{ ...Fonts.h5 }}>Pickup</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: Sizes.padding }}>
          <View style={{ marginBottom: Sizes.padding2 }}>
            <View
              style={{
                flexDirection: "row",
                height: 35,
              }}
            ></View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {arr.map((i) => {
                return (
                  <View
                    key={i}
                    style={{
                      marginHorizontal: Sizes.padding2,
                      backgroundColor: Colors.primary,
                      borderRadius: Sizes.radius / 2,
                      ...Shadow,
                    }}
                  >
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        backgroundColor: Colors.lightGray2,
                      }}
                    ></View>
                    <Text
                      style={{
                        height: 30,
                        ...Fonts.h5,
                        paddingVertical: Sizes.padding,
                        paddingLeft: Sizes.padding2,
                        color: Colors.white,
                      }}
                    ></Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View style={{ height: 30 }}></View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                margin: Sizes.padding2,
                padding: Sizes.padding3,
                width: Sizes.cardWidth,
                height: Sizes.cardHeight,
                borderRadius: Sizes.radius,
                backgroundColor: Colors.lightGray,
                ...Shadow,
              }}
            ></View>
            <View
              style={{
                margin: Sizes.padding2,
                padding: Sizes.padding3,
                width: Sizes.cardWidth,
                height: Sizes.cardHeight,
                borderRadius: Sizes.radius,
                backgroundColor: Colors.lightGray,
                ...Shadow,
              }}
            ></View>
          </View>
          <View style={{ height: 30 }}></View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                margin: Sizes.padding2,
                padding: Sizes.padding3,
                width: Sizes.cardWidth,
                height: Sizes.cardHeight,
                borderRadius: Sizes.radius,
                backgroundColor: Colors.lightGray,
                ...Shadow,
              }}
            ></View>
            <View
              style={{
                margin: Sizes.padding2,
                padding: Sizes.padding3,
                width: Sizes.cardWidth,
                height: Sizes.cardHeight,
                borderRadius: Sizes.radius,
                backgroundColor: Colors.lightGray,
                ...Shadow,
              }}
            ></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
