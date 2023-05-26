import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors, Icons, Sizes } from "../constants";
import { userActions } from "../redux/features/user";

function LocationHeader({ location }) {
  const dispatch = useDispatch();
  // Needs to except isloading State and act accordingly
  const [displayLocation, setDisplay] = useState("location");

  const lookupLocation = (location) => {
    if (location !== null) {
      dispatch(userActions.getLocationLookup(location)).then((loc) => {
        let road = loc.payload.address.road;
        setDisplay(road);
      });
    }
  };

  React.useEffect(async () => {
    lookupLocation(location);
  }, [location]);
  return (
    <TouchableOpacity
      onPress={() => {
        lookupLocation(location);
      }}
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: Colors.light,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: Sizes.radius,
        marginHorizontal: Sizes.padding,
      }}
    >
      <Icons.user size={Sizes.icon} />
      <Text>{displayLocation}</Text>
    </TouchableOpacity>
  );
}

export default LocationHeader;
