import React from "react";
import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { VendorCards } from "../components";
import { Sizes } from "../constants";

import { ListBuilder } from "../helpers";

const ASPECT_RATIO = Sizes.width / Sizes.height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function PickupView({ isLoading, vendors }) {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        paddingVertical: Sizes.padding2,
      }}
    >
      <MapView
        style={{ width: "100%", height: Sizes.height - 300 }}
        initialRegion={{
          longitude: location[0],
          latitude: location[1],
          longitudeDelta: LONGITUDE_DELTA,
          latitudeDelta: LATITUDE_DELTA,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <MapView.Marker
          coordinate={{ longitude: location[0], latitude: location[1] }}
        />
        {vendors.map((v, index) => {
          return (
            <View key={index}>
              <MapView.Marker
                key={`vendor-${v.vendorId}`}
                coordinate={{
                  longitude: v.location.coordinates[0],
                  latitude: v.location.coordinates[1],
                }}
              />
            </View>
          );
        })}
      </MapView>
      <View style={{ position: "absolute", bottom: 0 }}>
        <VendorCards
          isLoading={isLoading}
          list={ListBuilder.YOUR_LOCAL_SHOPS(vendors)}
          showTitle={false}
        />
      </View>
    </View>
  );
}
