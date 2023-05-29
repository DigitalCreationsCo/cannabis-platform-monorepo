import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions, Text, View
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector } from "react-redux";
import { BannerButton, Greeting } from "../components";
// import { useLocationWatch } from "../hooks";
import { DriveScreens } from "../navigation/paths";
// import { moduleActions } from "../redux/features/module";
// import { socketActions } from "../redux/features/socket";
// import { userActions } from "../redux/features/user";
import { selectDriverState } from "@cd/core-lib/src/reduxDir/features/driver.reducer";
import { selectUserState } from "@cd/core-lib/src/reduxDir/features/user.reducer";
import { Screen } from '../components';
import { useAppDispatch } from "../redux/store";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// add code to switch onlineStatus to false for unmount.
    // as well as a handler in the auth service to change status
    // from the server side, for disconnected users.
    
// separate the map functionality from the go online functionality
const MapScreen = () => {
  
  // useLocationWatch();
  
  useEffect(() => {
    return () => {
      console.log('unmounting map screen');
      console.log('does minimize trigger unmount?');
    }
  }, []);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  
  const 
  { user } = useSelector(selectUserState),
  isOnline = useSelector(selectDriverState)

  const [updateStatus, setUpdateStatusStatus] = useState(false);
  
  function toggleStatus () { 
    setUpdateStatusStatus(!updateStatus); 
  }

  


  useEffect(() => {

  // UI should show the status marker that matters, 
  // which is the connection status, not the online status.
  // the online status should copy the connection status.
    console.log('onlineStatus: ', updateStatus);
    console.log('isOnline: ', isOnline);
    
    // if (updateStatus !== isOnline)
    // dispatch(driverActions.updateOnlineStatus(updateStatus));
    // add code to switch onlineStatus to false for unmount.
    // as well as a handler in the auth service to change status
    // from the server side, for disconnected users.
    
  }, [updateStatus]);


      // TEST STATE
      const 
      isConnected = true,
      isConnecting = true,
      errorMessage = '';
      
      // const { isEstablishingConnection, isConnected, connectionError, message } =
      //   useSelector(Selector.socket);
      // const location = useSelector(Selector.currentCoordinates);
    // const { newOrder } = useSelector(Selector.incomingOrder);

    
    // useDidMountEffect(() => {
  //   isOnline
  //     ? dispatch(socketActions.openConnection())
  //     : dispatch(socketActions.closeConnection());
  // }, [isOnline]);


  const 
  { newOrder } = { newOrder: null}
  // const { isOnline } = user;

  useEffect(() => {
    if (newOrder) {
      navigation.navigate(DriveScreens.NEW_ORDER_SCREEN);
    }
  }, [newOrder]);

  const
  showDriverStatus = isConnected ? "Looking for deliveries..." : isConnecting ? "Going online..." : "Go Online";

  {/* {isLoading ? (
            <Text style={styles.statusPending}>Loading..</Text>
          ) : isOnline && isEstablishingConnection && !isConnected ? (
            <Text style={styles.statusOnline}>Going Online..</Text>
          ) : isOnline && isConnected ? (
            <Text style={styles.statusOnline}>You are online</Text>
          ) : (
            <Text style={styles.statusOffline}>You are offline</Text>
          )} */}

  return (
    <>
      <>
        <Text> ({isConnected
            ? ` connected to websocket { web socket id } ` 
            : " websocket no connection "})
        </Text>
        <Text> error: {errorMessage || 'null'}</Text>
      </>

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
            onPress={toggleStatus}
            disabled={false}
          >
            { showDriverStatus }
          </BannerButton>

      </View>
      <StatusBar style="inverted" />
    </>
  );
};

export default Screen(MapScreen)