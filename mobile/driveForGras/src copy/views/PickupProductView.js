// // import { ScrollView, View, Text, StyleSheet } from "react-native";
// // import React, { useEffect, useState } from "react";
// // import { Colors, Sizes, Fonts, Shadow, Icons } from "../constants";
// // import { IconButton } from "../components";
// import { useNavigation } from "@react-navigation/native";
// import React, { useEffect, useState } from "react";
// import {
//     Dimensions, ScrollView, StyleSheet, Text, View
// } from "react-native";
// import { useDispatch } from "react-redux";
// import { BannerButton, IconButton } from "../components";
// import { Colors, Fonts, Icons, Shadow, Sizes } from "../constants";
// import { DeliveryScreens } from "../n/navigationPaths";
// import { socketActions } from "../redux/features/socket";
// const { width, height } = Dimensions.get("window");
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.016;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const PickupProductCard = ({ value, index, order, handleCheckBox }) => {
//   return (
//     <View key={`order-${index}`} style={styles.window}>
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Text
//           style={{ ...Fonts.h3 }}
//         >{`${order.customer.firstName} ${order.customer.lastName[0]}.`}</Text>
//         <Text
//           key={`product-${index}`}
//           style={{ ...Fonts.body3 }}
//         >{`${order.products.length} items`}</Text>
//       </View>
//       <View
//         style={{
//           flex: 1,
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <View>
//           {order.products.map((item, index) => (
//             <Text
//               key={`product-${index}`}
//               style={{ ...Fonts.body4 }}
//             >{`${item.quantity}x ${item.productName}`}</Text>
//           ))}
//         </View>
//         <View style={{ flexDirection: "row", padding: 5 }}>
//           <IconButton
//             onPress={() => handleCheckBox(index)}
//             Icon={Icons.checkmark}
//             value={value[index]}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default function PickupProductView({
//   destinationType,
//   remainingRoute,
//   currentOrder,
//   currentDestination,
// }) {
//   const navigation = useNavigation();

//   // const orderIdList = remainingRoute.map((order) => order.orderId);
//   const ordersMatchCurrentVendor = remainingRoute.reduce(
//     (ordersMatch, order) => {
//       if (order.vendor.vendorId === currentOrder.vendor.vendorId) {
//         return ordersMatch.concat(order);
//       }
//       return ordersMatch;
//     },
//     []
//   );

//   const orderIdList = ordersMatchCurrentVendor.map((order) => order.orderId);
//   console.log("pickup order view orderIdList: ", orderIdList);

//   const isPickedUpState = ordersMatchCurrentVendor.map(
//     (order) => (order.isPickedUp = false)
//   );
//   const [isPickedUp, setIsPickedUp] = useState(isPickedUpState);
//   const [allPickedUp, setAllPickedUp] = useState(false);

//   useEffect(() => {
//     setAllPickedUp(false);
//     if (isPickedUp.every((value) => value === true)) {
//       setAllPickedUp(true);
//     }
//   }, [isPickedUp]);

//   const handleCheckBox = (index) => {
//     const newIsPickedUpState = [...isPickedUp];
//     newIsPickedUpState[index] = !newIsPickedUpState[index];
//     setIsPickedUp(newIsPickedUpState);
//   };

//   const dispatch = useDispatch();
//   const pickupProducts = (orderIdList) => {
//     dispatch(socketActions.pickupProducts({ orderIdList }));
//     // dispatch(socketActions.updateDestinationType("customer"));
//   };
//   return (
//     <View style={styles.container}>
//       <Text style={{ ...Fonts.body4, padding: 10 }}>{`${
//         currentOrder.vendor.street
//       }, ${currentOrder.vendor.city}, ${currentOrder.vendor.state}, ${
//         currentOrder.vendor.zipcode.split("-")[0]
//       }`}</Text>
//       <View
//         style={{
//           flex: 1,
//           alignItems: "center",
//         }}
//       >
//         <Text style={{ ...Fonts.body3 }}>
//           Pick up{" "}
//           {ordersMatchCurrentVendor.length === 1
//             ? "1 order"
//             : `${ordersMatchCurrentVendor.length} orders`}
//         </Text>
//         <Text style={{ ...Fonts.body4, color: Colors.darkgray }}>
//           {currentOrder[destinationType].instructions}
//         </Text>

//         {/* display subsequent orders for this vendor to show the driver all pickups */}
//         {/* they are making in this delivery */}
//         <ScrollView>
//           {ordersMatchCurrentVendor.map((order, index) => (
//             <PickupProductCard
//               handleCheckBox={handleCheckBox}
//               value={isPickedUp}
//               order={order}
//               index={index}
//               key={`pickup-order-${index}`}
//             />
//           ))}
//         </ScrollView>
//         <BannerButton
//           text={"I've picked up the orders"}
//           disabled={!allPickedUp}
//           onPress={() => {
//             pickupProducts(orderIdList);
//             navigation.navigate(DeliveryScreens.CONTINUE_TO_CUSTOMER_VIEW);
//           }}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     width: "100%",
//   },
//   window: {
//     width: Sizes.cardWidth,
//     backgroundColor: Colors.primary,
//     margin: 10,
//     padding: 10,
//     borderRadius: Sizes.radius,
//     ...Shadow,
//   },
// });

import { Text, View } from 'react-native'
export default function PickupProductView() {
  return (
    <View>
      <Text>PickupProductView</Text>
    </View>
  )
}