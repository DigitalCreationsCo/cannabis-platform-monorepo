// import React, { useEffect } from "react";
// import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { userActions } from "../redux/features/user";
// import { Colors, Fonts, Sizes } from "../constants";

// const UserSettingScreen = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.user);

//   const logoutHandle = () => {
//     dispatch(userActions.logoutUser({ token, email }));
//   };

//   return (
//     <SafeAreaView>
//       <View
//         style={{
//           height: 50,
//           backgroundColor: Colors.primary,
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <Text
//           style={{
//             ...Fonts.h3,
//             color: Colors.white,
//             paddingHorizontal: Sizes.padding * 2,
//             alignSelf: "center",
//           }}
//         >
//           User
//         </Text>
//         <TouchableOpacity
//           onPress={logoutHandle}
//           style={{
//             alignSelf: "center",
//             padding: Sizes.padding * 2,
//             borderRadius: Sizes.radius / 2,
//           }}
//         >
//           <Text style={{ ...Fonts.h3Light, color: Colors.white }}>logout</Text>
//         </TouchableOpacity>
//       </View>
//       <View>
//         <Text>{`driverId: ${user.driverId}`}</Text>
//         <Text>{`${user.firstName} ${user.lastName}`}</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default UserSettingScreen;

import { Text, View } from 'react-native'
import { Screen } from '../components'

function UserSettingScreen() {
  return (
    <View>
      <Text>UserSettingScreen</Text>
    </View>
  )
}

export default Screen(UserSettingScreen)