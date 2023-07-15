// import React, { useEffect } from "react";
// import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import Selector from "../redux/selector";
// import { Colors, Fonts, Icons, Sizes } from "../constants";
// import { BannerButton } from "../components";
// import { useNavigation } from "@react-navigation/native";
// import { DeliveryScreens, DriveScreens } from "../navigation/navigationPaths";
// import Table from "../components/atomic/Table";
// import TableBuilder, { TableDataList } from "../helpers/TableBuilder";
// import { socketActions } from "../redux/features/socket";

// const CompleteDeliveryScreen = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const { dispatchOrders, isActiveDelivery, destinationType } = useSelector(
//     Selector.socket
//   );
//   const { vendor } = dispatchOrders[0];
//   const completeDeliveries = async () => {
//     try {
//       navigation.popToTop();
//     } catch (E) {
//       console.info(E);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       console.info(" unmount CompleteDeliveryScreen");
//       dispatch(socketActions.resetDeliveryState());
//     };
//   }, []);
//   return (
//     <SafeAreaView style={styles.container}>
//       {isActiveDelivery ? (
//         <>
//           <View
//             style={{
//               flex: 1,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Text style={{ ...Fonts.body3 }}>
//               You still have orders to complete!
//             </Text>
//           </View>
//           <BannerButton text={"go back"} onPress={() => navigation.goBack()} />
//         </>
//       ) : (
//         <>
//           <View
//             style={{
//               flex: 1,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Text style={{ ...Fonts.body3 }}>
//               {`You delivered ${dispatchOrders.length} ${
//                 dispatchOrders.length > 1 ? "orders" : "order"
//               } for ${vendor.publicName}`}
//             </Text>
//             <View
//               style={{
//                 flex: 0.5,
//                 justifyContent: "center",
//               }}
//             >
//               <Text
//                 style={{
//                   ...Fonts.body3,
//                   color: Colors.primary,
//                   textAlign: "center",
//                 }}
//               >
//                 delivery breakdown
//               </Text>
//               <TableBuilder TableDataList={TableDataList.DELIVERY_STATS()} />
//               <Text style={{ ...Fonts.body4, color: Colors.darkgray }}>
//                 * pay is based on distance traveled{" "}
//               </Text>

//               {/* add total  */}
//             </View>
//             <Text style={{ ...Fonts.h3 }}>Great job!</Text>
//             <Text style={{ ...Fonts.body3 }}>
//               you may receive more pay from tips
//             </Text>
//           </View>
//           <BannerButton
//             text={"Keep moving"}
//             onPress={() => {
//               completeDeliveries();
//             }}
//           />
//         </>
//       )}

//       {/* {isActiveDelivery ? (
//         <BannerButton
//           text={"Keep moving"}
//           onPress={() => {
//             completeDeliveries();
//           }}
//         />
//       ) : (
//         <BannerButton text={"go back"} onPress={() => navigation.goBack()} />
//       )} */}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//   },
// });

// export default CompleteDeliveryScreen;

import { Text, View } from 'react-native'
const CompleteDeliveryScreen = () => {
  return (
    <View>
      <Text>CompleteDeliveryScreen</Text>
    </View>
  )
}
export default CompleteDeliveryScreen