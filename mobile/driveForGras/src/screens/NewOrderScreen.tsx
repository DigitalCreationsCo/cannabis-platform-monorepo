// import React, { useRef, useEffect } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
// import { Colors, Sizes, Fonts } from "../constants";
// import { useNavigation } from "@react-navigation/native";
// import { useSelector, useDispatch } from "react-redux";
// import Selector from "../redux/selector";
// import { socketActions } from "../redux/features/socket";
// import apiKeys from "../helpers/apiKey";
// import { DeclineButton } from "../components";

// const { width, height } = Dimensions.get("window");

// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.016;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const NewOrderScreen = () => {
//   const map = useRef();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const { message: orderMessage, newOrder: order } = useSelector(
//     Selector.incomingOrder
//   );
//   const user = useSelector(Selector.user);
//   const location = useSelector(Selector.currentCoordinates);
//   const orderList = useSelector(Selector.dispatchOrders);

//   const driverCoords = { latitude: location[1], longitude: location[0] };
//   const vendorCoords = {
//     latitude: Number(order?.vendor.location.coordinates[1]),
//     longitude: Number(order?.vendor.location.coordinates[0]),
//   };
//   // const vendorCoords = {
//   //   latitude: Number(order?.vendor.location.geoLocation.coordinates[1]),
//   //   longitude: Number(order?.vendor.location.geoLocation.coordinates[0]),
//   // };
//   const customerCoords = {
//     latitude: Number(order?.customer.location.geoLocation.coordinates[1]),
//     longitude: Number(order?.customer.location.geoLocation.coordinates[0]),
//   };

//   const acceptDeliveryOrder = () => {
//     dispatch(socketActions.acceptOrder());
//   };

//   const declineDeliveryOrder = () => {
//     dispatch(socketActions.declineOrder());
//     navigation.goBack();
//   };

//   const fitAllMarkers = () => {
//     map.current.fitToCoordinates([driverCoords, vendorCoords, customerCoords], {
//       edgePadding: {
//         top: 100,
//         left: 60,
//         right: 60,
//         bottom: 100,
//       },
//       animated: false,
//     });
//   };

//   useEffect(() => {
//     if (orderList.length > 0) {
//       navigation.navigate("DeliveryOrderScreen");
//     }
//   }, [orderList]);
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* <View
//         style={{
//           position: "absolute",
//           top: 0,
//           height: 80,
//           width: "100%",
//           backgroundColor: Colors.primary,
//         }}
//       ></View> */}
//       <View>
//         <Text style={{ ...Fonts.h4 }}>{orderMessage}</Text>
//       </View>

//       {order && (
//         <>
//           <View style={{ paddingTop: 20 }}>
//             <Text style={{ ...Fonts.body3 }}>
//               {`${order.customer.userName}`}
//               <Text style={{ ...Fonts.body3 }}> ordered from</Text>
//             </Text>
//             <Text style={{ ...Fonts.h4 }}>{`${order.vendor.vendorName}`}</Text>
//             <Text
//               style={{ ...Fonts.h4 }}
//             >{`${order.vendor.street}, ${order.vendor.city}, ${order.vendor.state}`}</Text>
//           </View>

//           <View
//             style={{
//               flex: 1,
//               width,
//               padding: 10,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <View
//               style={{ position: "absolute", top: 5, right: 5, zIndex: 10 }}
//             >
//               <DeclineButton onPress={declineDeliveryOrder} />
//             </View>
//             {/* <TouchableOpacity
//               onPress={declineDeliveryOrder}
//               style={{
//                 position: "absolute",
//                 top: 5,
//                 right: 5,
//                 zIndex: 10,
//                 flexDirection: "row",
//                 alignItems: "center",
//                 backgroundColor: Colors.lightGray3,
//                 padding: Sizes.padding3,
//                 borderWidth: 2,
//                 borderColor: Colors.red,
//                 borderRadius: Sizes.radius,
//               }}
//             >
//               <Text
//                 style={{
//                   color: Colors.red,
//                   fontSize: 20,
//                 }}
//               >
//                 decline
//               </Text>
//             </TouchableOpacity> */}
//             <MapView
//               ref={map}
//               showsUserLocation
//               region={
//                 location
//                   ? {
//                       longitude: location[0],
//                       latitude: location[1],
//                       longitudeDelta: LONGITUDE_DELTA,
//                       latitudeDelta: LATITUDE_DELTA,
//                     }
//                   : null
//               }
//               onMapReady={fitAllMarkers}
//               style={{ height: "80%", width: "80%" }}
//               provider={PROVIDER_GOOGLE}
//               rotateEnabled={false}
//               scrollEnabled={false}
//               pitchEnabled={false}
//             >
//               <Marker coordinate={vendorCoords} title={"vendor location"} />
//               <Marker coordinate={customerCoords} title={"customer location"} />
//               <MapViewDirections
//                 origin={driverCoords}
//                 waypoints={[vendorCoords]}
//                 destination={customerCoords}
//                 apikey={apiKeys.GOOGLE_MAP_API_KEY()}
//                 strokeColor={Colors.primary}
//                 strokeWidth={4}
//                 precision={"low"}
//                 channel={"driver_mobile_client"}
//               />
//             </MapView>
//           </View>

//           <View>
//             {/* API call to get this distance value, make the call on the client when the new order comes in, save to state, when accepting the order */}
//             <Text style={{ ...Fonts.h4 }}>48 mi away 70 mi trip</Text>
//             <Text>Will you accept the order?</Text>
//             <TouchableOpacity
//               onPress={acceptDeliveryOrder}
//               style={{
//                 margin: 10,
//                 alignItems: "center",
//                 backgroundColor: Colors.lightGray3,
//                 padding: Sizes.padding3,
//                 borderWidth: 2,
//                 borderColor: Colors.primary,
//                 borderRadius: Sizes.radius,
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 24,
//                 }}
//               >
//                 Accept
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default NewOrderScreen;

import { Text, View } from 'react-native';
const NewOrderScreen = () => {
	return (
		<View>
			<Text>NewOrderScreen</Text>
		</View>
	);
};
export default NewOrderScreen;
