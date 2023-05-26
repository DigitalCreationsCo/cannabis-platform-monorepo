// import { useNavigation } from "@react-navigation/native";
// import React, { useEffect } from "react";
// import { Text, View } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { BannerButton, DirectionsButton, IconButton } from "../components";
// import { Colors, Fonts, Icons } from "../constants";
// import { socketActions } from "../redux/features/socket";
// import { currentLocationUpdate } from "../redux/features/user";
// import Selector from "../redux/selector";

// export default function CustomerDeliveryView({
//   dispatchOrders,
//   destinationType,
//   currentOrder,
//   currentDestination,
//   remainingRoute,
//   getDirections,
//   dialPhone,
// }) {
//   useEffect(() => {
//     console.log(" DeliverOrderView currentOrder changed");
//   }, [currentOrder]);
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const currentCoordinates = useSelector(Selector.currentCoordinates);

//   const userIsNearToDestination = () => {
//     return isDestinationNearby(
//       currentCoordinates,
//       currentOrder[destinationType].location.geoLocation.coordinates,
//       50
//     );
//   };

//   const orderSequenceNumber = dispatchOrders.length - remainingRoute.length + 1;
//   const lastStopText =
//     orderSequenceNumber === dispatchOrders.length ? "last stop" : "";

//   // test func
//   const moveToCustomerLocation = () => {
//     console.log(" current order: ", currentOrder);
//     let customerCoordinates =
//       currentOrder[destinationType].location.geoLocation.coordinates;
//     console.log(" customer coordinates: ", customerCoordinates);
//     let geoLocation = {
//       type: "Point",
//       coordinates: customerCoordinates,
//     };
//     dispatch(currentLocationUpdate({ geoLocation }));
//   };

//   const arriveToCustomer = () => {
//     // console.log("customer delivery view order: ", currentOrder);
//     let { orderId } = currentOrder;
//     console.log("customer delivery view orderId: ", orderId);
//     dispatch(socketActions.arriveToCustomer({ orderId }));
//   };
//   return (
//     <View style={{ flex: 1 }}>
//       <View style={{ flex: 1, padding: 10 }}>
//         <View style={{ paddingBottom: 5 }}>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//             }}
//           >
//             <Text style={{ ...Fonts.body3 }}>
//               {`Order ${orderSequenceNumber} of ${dispatchOrders.length}`}
//             </Text>
//             <Text style={{ ...Fonts.h4, color: Colors.primary }}>
//               {lastStopText}
//             </Text>
//           </View>
//           <Text style={{ ...Fonts.body3 }}>
//             Deliver to{" "}
//             <Text style={{ ...Fonts.h4 }}>
//               {currentOrder[destinationType].userName}
//             </Text>{" "}
//             ({currentOrder[destinationType].firstName})
//           </Text>
//           <Text style={{ ...Fonts.body3 }}>{`${
//             currentOrder[destinationType].location.street
//           }, ${currentOrder[destinationType].location.city}, ${
//             currentOrder[destinationType].location.state
//           }, ${
//             currentOrder[destinationType].location.zipcode.split("-")[0]
//           }`}</Text>
//         </View>
//         <View style={{ flexDirection: "row", padding: 5 }}>
//           <DirectionsButton onPress={getDirections} />
//           <IconButton onPress={dialPhone} value={true} Icon={Icons.phone} />
//         </View>
//         <Text style={{ ...Fonts.body4, color: Colors.darkgray }}>
//           {currentOrder[destinationType].instructions}
//         </Text>
//       </View>
//       <BannerButton
//         text={"Move to Customer Point"}
//         onPress={() => {
//           moveToCustomerLocation();
//         }}
//       />
//       <BannerButton
//         text={"Deliver Order"}
//         onPress={() => {
//           arriveToCustomer();
//         }}
//         disabled={!userIsNearToDestination}
//       />
//     </View>
//   );
// }

import { Text, View } from 'react-native'
export default function CustomerDeliveryView() {
  return (
    <View>
      <Text>CustomerDeliveryView</Text>
    </View>
  )
}