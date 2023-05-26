// import { useNavigation } from "@react-navigation/native";
// import React, { useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { useDispatch } from "react-redux";
// import { BannerButton, IconButton } from "../components";
// import { Colors, Fonts, Icons, Sizes } from "../constants";
// import { socketActions } from "../redux/features/socket";
// const FinalizeDeliveryView = ({ remainingRoute, currentOrder }) => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const [isDelivered, setIsDelivered] = useState(false);
//   const handleCheckBox = () => {
//     setIsDelivered((prevState) => !prevState);
//   };

//   const completeDelivery = async () => {
//     try {
//       let { orderId } = currentOrder;
//       dispatch(socketActions.completeDeliveryOrder({ orderId }));
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       {/* possibly show the user avatar here */}
//       <View
//         style={{
//           flex: 1,
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Text style={{ ...Fonts.body3 }}>You made it</Text>
//         <Text
//           style={{
//             ...Fonts.h3,
//             color: Colors.primary,
//             textAlign: "center",
//           }}
//         >
//           Deliver the order to {currentOrder.customer.firstName} (
//           {currentOrder.customer.userName})
//         </Text>
//         <Text style={{ ...Fonts.body3 }}>{`${
//           currentOrder.customer.location.street
//         }, ${currentOrder.customer.location.city}, ${
//           currentOrder.customer.location.state
//         }, ${currentOrder.customer.location.zipcode.split("-")[0]}`}</Text>
//         <Text
//           style={{ ...Fonts.body4 }}
//         >{`Follow the instructions to deliver ${currentOrder.customer.firstName}'s order`}</Text>
//         <View
//           style={{
//             width: Sizes.cardWidth,
//             margin: Sizes.padding,
//             padding: Sizes.padding2,
//             backgroundColor: Colors.light,
//           }}
//         >
//           <Text style={{ ...Fonts.body4, color: Colors.darkgray }}>
//             {currentOrder.customer.instructions}
//           </Text>
//         </View>
//       </View>
//       <TouchableOpacity
//         style={{
//           flexDirection: "row",
//           padding: Sizes.padding3,
//           margin: Sizes.padding2,
//           justifyContent: "flex-end",
//           borderWidth: 1,
//         }}
//         onPress={() => handleCheckBox()}
//       >
//         <Text
//           style={{
//             ...Fonts.body3,
//             paddingRight: Sizes.padding2,
//             alignSelf: "center",
//           }}
//         >
//           I delivered the order
//         </Text>
//         <IconButton
//           onPress={() => handleCheckBox()}
//           Icon={Icons.checkmark}
//           value={isDelivered}
//         />
//       </TouchableOpacity>
//       <BannerButton
//         text={"Complete delivery"}
//         disabled={!isDelivered}
//         onPress={() => {
//           completeDelivery();
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default FinalizeDeliveryView;


import { Text, View } from 'react-native'
export default function FinalizeDeliveryScreen() {
  return (
    <View>
      <Text>FinalizeDeliveryScreen</Text>
    </View>
  )
}