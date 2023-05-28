import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions, View
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { BannerButton, Greeting } from "../components";
// import { useLocationWatch } from "../hooks";
import { DriveScreens } from "../navigation/paths";
// import { moduleActions } from "../redux/features/module";
// import { socketActions } from "../redux/features/socket";
// import { userActions } from "../redux/features/user";
import { selectUserState } from "@cd/core-lib/src/reduxDir/features/user.reducer";
import { Screen } from '../components';

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// separate the map functionality from the go online functionality
const MapScreen = () => {
  
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  // useLocationWatch();
  
  const [updateStatus, setUpdateStatus] = useState(false);
  
    // const { isEstablishingConnection, isConnected, connectionError, message } =
    //   useSelector(Selector.socket);

  // const isLoading = useSelector(Selector.isLoading);
  const 
  { user, isOnline } = useSelector(selectUserState) as any;

  // const location = useSelector(Selector.currentCoordinates);

  // const { newOrder } = useSelector(Selector.incomingOrder);
  const 
  { newOrder } = { newOrder: null}
  // const { isOnline } = user;

  // const toggleStatus = () => {
  //   setUpdateStatus((status) => !status);
  // };

  // useEffect(() => {
  //   dispatch(userActions.updateOnlineStatus(updateStatus)).then(() => {
  //     console.log("updated status. finishing loading");
  //     dispatch(moduleActions.finishLoading());
  //   });
  //   // add code to switch onlineStatus to false for unmount.
  //   // as well as a handler in the auth service to change status
  //   // from the server side, for disconnected users.
  // }, [updateStatus]);

  // useDidMountEffect(() => {
  //   isOnline
  //     ? dispatch(socketActions.openConnection())
  //     : dispatch(socketActions.closeConnection());
  // }, [isOnline]);

  useEffect(() => {
    if (newOrder) {
      navigation.navigate(DriveScreens.NEW_ORDER_SCREEN);
    }
  }, [newOrder]);

  return (
    <>
      <View className="grow">
      <Greeting isLoading={true} />
        <MapView
        className='grow' 
          showsUserLocation
          followsUserLocation
          showsMyLocationButton={true}
          // region={{
          //   longitude: location[0],
          //   latitude: location[1],
          //   longitudeDelta: LONGITUDE_DELTA,
          //   latitudeDelta: LATITUDE_DELTA,
          // }}
          provider={PROVIDER_GOOGLE}
        />

          <BannerButton
            // onPress={toggleStatus}
            disabled={false}
          >
            {updateStatus ? "Go Offline" : "Go Online"}
          </BannerButton>
      </View>

      <View className="">
        {/* <Text>
          {isConnected
            ? " connected to websocket server"
            : " websocket not connected."}
        </Text>
        <Text>{connectionError}</Text> */}

        <View>

          {/* {isLoading ? (
            <Text style={styles.statusPending}>Loading..</Text>
          ) : isOnline && isEstablishingConnection && !isConnected ? (
            <Text style={styles.statusOnline}>Going Online..</Text>
          ) : isOnline && isConnected ? (
            <Text style={styles.statusOnline}>You are online</Text>
          ) : (
            <Text style={styles.statusOffline}>You are offline</Text>
          )} */}

          
          
        </View>
      </View>
      <StatusBar style="inverted" />
    </>
  );
};

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


export default Screen(MapScreen)