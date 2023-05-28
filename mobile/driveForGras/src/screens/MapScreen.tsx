// import { useNavigation } from "@react-navigation/native";
// import { StatusBar } from "expo-status-bar";
// import React, { useEffect, useState } from "react";
// import {
//   Dimensions,
//   SafeAreaView,
//   StyleSheet, Text, TouchableOpacity, View
// } from "react-native";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import { useDispatch, useSelector } from "react-redux";
// import { Greeting } from "../components";
// import { Colors, Fonts, Sizes } from "../constants";
// import { useDidMountEffect, useLocationWatch } from "../hooks";
// import { DriveScreens } from "../navigation/navigationPaths";
// import { moduleActions } from "../redux/features/module";
// import { socketActions } from "../redux/features/socket";
// import { userActions } from "../redux/features/user";
// import Selector from "../redux/selector";

// const { width, height } = Dimensions.get("window");
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.00922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// // separate the map functionality from the go online functionality
// const MapScreen = () => {
  
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   useLocationWatch();
  
//   const [updateStatus, setUpdateStatus] = useState(false);
  
//     const { isEstablishingConnection, isConnected, connectionError, message } =
//       useSelector(Selector.socket);

//   const isLoading = useSelector(Selector.isLoading);

//   const user = useSelector(Selector.user);

//   const location = useSelector(Selector.currentCoordinates);

//   const { newOrder } = useSelector(Selector.incomingOrder);
//   const { isOnline } = user;

//   const toggleStatus = () => {
//     setUpdateStatus((status) => !status);
//   };

//   useEffect(() => {
//     dispatch(userActions.updateOnlineStatus(updateStatus)).then(() => {
//       console.log("updated status. finishing loading");
//       dispatch(moduleActions.finishLoading());
//     });
//     // add code to switch onlineStatus to false for unmount.
//     // as well as a handler in the auth service to change status
//     // from the server side, for disconnected users.
//   }, [updateStatus]);

//   useDidMountEffect(() => {
//     isOnline
//       ? dispatch(socketActions.openConnection())
//       : dispatch(socketActions.closeConnection());
//   }, [isOnline]);

//   useEffect(() => {
//     if (newOrder) {
//       navigation.navigate(DriveScreens.NEW_ORDER_SCREEN);
//     }
//   }, [newOrder]);

//   return (
//     <SafeAreaView style={{}}>
//       <Greeting isLoading={true} />
//       <View style={{ height: height - 295, padding: 5 }}>
//         <MapView
//           showsUserLocation
//           followsUserLocation
//           showsMyLocationButton={true}
//           region={{
//             longitude: location[0],
//             latitude: location[1],
//             longitudeDelta: LONGITUDE_DELTA,
//             latitudeDelta: LATITUDE_DELTA,
//           }}
//           style={{ height: "100%", width: "100%" }}
//           provider={PROVIDER_GOOGLE}
//         />
//       </View>

//       <View
//         style={{
//           height: 120,
//         }}
//       >
//         <Text>
//           {isConnected
//             ? " connected to websocket server"
//             : " websocket not connected."}
//         </Text>
//         <Text>{connectionError}</Text>
//         {/* <View style={{ alignItems: "center" }}>
//           {message ? <Text>{message}</Text> : <></>}
//         </View> */}
//         <View style={{ alignItems: "center" }}>
//           {isLoading ? (
//             <Text style={styles.statusPending}>Loading..</Text>
//           ) : isOnline && isEstablishingConnection && !isConnected ? (
//             <Text style={styles.statusOnline}>Going Online..</Text>
//           ) : isOnline && isConnected ? (
//             <Text style={styles.statusOnline}>You are online</Text>
//           ) : (
//             <Text style={styles.statusOffline}>You are offline</Text>
//           )}
//           <TouchableOpacity
//             onPress={toggleStatus}
//             disabled={isLoading}
//             style={{
//               margin: 10,
//               flexDirection: "row",
//               alignItems: "center",
//               backgroundColor: Colors.lightGray3,
//               padding: Sizes.padding3,
//               borderWidth: 1.25,
//               borderColor: Colors.primary,
//               borderRadius: Sizes.radius,
//             }}
//           >
//             <Text
//               style={{ ...Fonts.h5, width: width / 2, textAlign: "center" }}
//             >
//               {updateStatus ? "Go Offline" : "Go Online"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );
// };

// export default MapScreen;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   statusPending: {
//     ...Fonts.h5,
//     fontSize: 20,
//     color: "#e04d36",
//   },
//   statusOffline: {
//     ...Fonts.h5,
//     fontSize: 20,
//     color: "#e04d36",
//   },
//   statusOnline: {
//     ...Fonts.h5,
//     fontSize: 20,
//     color: "#11c852",
//   },
// });

import { Text, View } from 'react-native'
import { Screen } from '../components'
function MapScreen() {
  return (
    <View>
      <Text>MapScreen</Text>
    </View>
  )
}

export default Screen(MapScreen)