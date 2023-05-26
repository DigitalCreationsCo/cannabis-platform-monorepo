// import { useNavigation } from "@react-navigation/native";
// import React from "react";
// import { Text, View } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { BannerButton, DirectionsButton, IconButton } from "../components";
// import { Colors, Fonts, Icons } from "../constants";
// import { DriveScreens } from "../n/navigationPaths";
// import { socketActions } from "../redux/features/socket";
// import { userActions } from "../redux/features/user";
// import Selector from "../redux/selector";
// import { isDestinationNearby } from "../util";

// export default function VendorDeliveryView({
//   destinationType,
//   currentOrder,
//   remainingRoute,
//   currentDestination,
//   getDirections,
//   dialPhone,
// }) {
//   console.log("vendor delivery view render");
//   // console.log("remaining route: ", remainingRoute);
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const currentCoordinates = useSelector(Selector.currentCoordinates);

//   const userIsNearToDestination = () => {
//     return isDestinationNearby(
//       currentCoordinates,
//       currentOrder[destinationType].location.coordinates,
//       50
//     );
//   };

//   // test func
//   const moveToVendorLocation = () => {
//     // move to dynamic vendor coordinates
//     const coordinates = currentOrder[destinationType].location.coordinates;
//     // console.log("coordinates to move: ", coordinates);
//     let geoLocation = {
//       type: "Point",
//       coordinates,
//     };
//     dispatch(userActions.currentLocationUpdate({ geoLocation }));
//   };

//   const arriveToVendor = () => {
//     let { vendorId } = currentOrder.vendor;
//     dispatch(socketActions.arriveToVendor({ vendorId }));
//   };
//   return (
//     <View style={{ flex: 1 }}>
//       <View style={{ flex: 1, padding: 10 }}>
//         <View style={{ paddingBottom: 5 }}>
//           <Text style={{ ...Fonts.body3 }}>
//             {`Pick up ${remainingRoute.length} ${
//               remainingRoute.length > 1 ? "orders" : "order"
//             }`}
//           </Text>
//           {(destinationType === "vendor" && (
//             <Text style={{ ...Fonts.h3 }}>
//               {currentOrder[destinationType].publicName}{" "}
//             </Text>
//           )) ||
//             (destinationType === "customer" && (
//               <Text style={{ ...Fonts.body3 }}>
//                 Deliver to{" "}
//                 <Text style={{ ...Fonts.h3 }}>
//                   {currentOrder[destinationType].userName}
//                 </Text>{" "}
//                 ({currentOrder[destinationType].firstName})
//               </Text>
//             ))}
//           <Text style={{ ...Fonts.body3 }}>{`${
//             currentOrder[destinationType].street
//           }, ${currentOrder[destinationType].city}, ${
//             currentOrder[destinationType].state
//           }, ${currentOrder[destinationType].zipcode.split("-")[0]}`}</Text>
//         </View>
//         <View style={{ flexDirection: "row", padding: 5 }}>
//           <DirectionsButton onPress={getDirections} />
//           <IconButton onPress={dialPhone} Icon={Icons.phone} value={true} />
//         </View>
//         <Text style={{ ...Fonts.body4, color: Colors.darkgray }}>
//           {currentOrder[destinationType].instructions}
//         </Text>
//       </View>
//       <BannerButton
//         text={"Complete delivery"}
//         onPress={() => {
//           navigation.navigate(DriveScreens.COMPLETE_DELIVERY_SCREEN);
//         }}
//       />
//       <BannerButton
//         text={"Move to Vendor"}
//         onPress={() => {
//           moveToVendorLocation();
//         }}
//       />
//       <BannerButton
//         text={"Pickup Order"}
//         onPress={() => {
//           arriveToVendor();
//         }}
//         disabled={!userIsNearToDestination()}
//       />
//     </View>
//   );
// }

import { Text, View } from 'react-native'
export default function VendorDeliveryView() {
  return (
    <View>
      <Text>VendorDeliveryView</Text>
    </View>
  )
}