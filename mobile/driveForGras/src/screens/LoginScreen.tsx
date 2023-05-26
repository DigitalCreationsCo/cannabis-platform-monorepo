// import React, { useRef } from "react";
// import {
//   SafeAreaView,
//   View,
//   TouchableOpacity,
//   TextInput,
//   Text,
//   Image,
// } from "react-native";

// import { useDispatch, useSelector } from "react-redux";
// import { userActions } from "../redux/features/user";

// import { useForm, Controller } from "react-hook-form";

// import { Images, Fonts, Colors, Sizes, Shadow, Icons } from "../constants";

// export default function LoginScreen({ navigation, route }) {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const dispatch = useDispatch();

//   const { isFetching, isSuccess, isError, errorMessage } = useSelector(
//     (state) => state.user
//   );

//   const onSubmit = (data) => {
//     dispatch(userActions.clearErrorMessage());
//     dispatch(userActions.loginUser(data));
//   };

//   React.useEffect(() => {
//     if (errorMessage) {
//       dispatch(userActions.clearErrorMessage());
//     }

//     return () => {
//       dispatch(userActions.clearErrorMessage());
//       dispatch(userActions.clearState());
//     };
//   }, []);

//   React.useEffect(() => {
//     if (isSuccess) {
//       dispatch(userActions.clearState());
//     }

//     if (isError) {
//       dispatch(userActions.clearState());
//     }
//   }, [isSuccess, isError]);

//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "space-evenly",
//           alignSelf: "center",
//           paddingTop: Sizes.padding2 * 2,
//           width: Sizes.cardWidth,
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Icons.flower size={Sizes.icon} color={Colors.white} />
//           <Text
//             style={{
//               ...Fonts.h2,
//               alignSelf: "center",
//               color: Colors.white,
//               marginVertical: Sizes.padding2,
//             }}
//           >
//             {" "}
//             Cannabis Delivery
//           </Text>
//         </View>

//         <Image
//           source={Images.spinningWeed}
//           style={{
//             alignSelf: "center",
//             width: 170,
//             height: 170,
//           }}
//         />

//         <View>
//           <View
//             onStartShouldSetResponder={() => emailRef.current.focus()}
//             style={{
//               backgroundColor: Colors.white,
//               height: 50,
//               marginTop: Sizes.padding2,
//               paddingTop: Sizes.padding,
//               paddingBottom: Sizes.padding,
//               paddingHorizontal: Sizes.padding2,
//               marginBottom: Sizes.padding2,
//               borderRadius: Sizes.radius / 2,
//               ...Shadow,
//             }}
//           >
//             <Text>{"email"}</Text>
//             <Controller
//               control={control}
//               rules={{ required: true }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   autoCapitalize={"none"}
//                   ref={emailRef}
//                   placeholder={""}
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                   style={{
//                     flex: 1,
//                     justifyContent: "flex-end",
//                     color: Colors.black,
//                     ...Fonts.h4Light,
//                     textDecorationLine: "none",
//                   }}
//                 />
//               )}
//               name={"email"}
//             />
//           </View>

//           <View
//             onStartShouldSetResponder={() => passwordRef.current.focus()}
//             style={{
//               backgroundColor: Colors.white,
//               height: 50,
//               paddingTop: Sizes.padding,
//               paddingBottom: Sizes.padding,
//               paddingHorizontal: Sizes.padding2,
//               marginBottom: Sizes.padding2,
//               borderRadius: Sizes.radius / 2,
//               ...Shadow,
//             }}
//           >
//             <Text>{"password"}</Text>
//             <Controller
//               control={control}
//               rules={{ required: true }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   autoCapitalize={"none"}
//                   secureTextEntry
//                   ref={passwordRef}
//                   placeholder={""}
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                   style={{
//                     flex: 1,
//                     justifyContent: "flex-end",
//                     color: Colors.black,
//                     ...Fonts.h4Light,
//                   }}
//                 />
//               )}
//               name={"password"}
//             />
//           </View>

//           <Text
//             style={{
//               height: 26,
//               paddingHorizontal: Sizes.padding,
//               color: Colors.white,
//               ...Fonts.body4,
//             }}
//           >
//             {((errors.email || errors.password) &&
//               "Please enter the empty fields") ||
//               errorMessage}
//           </Text>

//           <TouchableOpacity
//             title="Submit"
//             onPress={handleSubmit(onSubmit)}
//             style={{
//               flexDirection: "row",
//               borderColor: Colors.white,
//               borderWidth: 2,
//               backgroundColor: Colors.blue,
//               marginTop: Sizes.padding,
//               borderRadius: Sizes.radius / 2,
//               height: 50,
//               alignItems: "center",
//               justifyContent: "center",
//               ...Shadow,
//             }}
//           >
//             {isFetching ? (
//               <Text style={{ color: Colors.white, ...Fonts.h4Light }}>
//                 Logging in...
//               </Text>
//             ) : (
//               <Text style={{ color: Colors.white, ...Fonts.h4Light }}>
//                 Login
//               </Text>
//             )}
//           </TouchableOpacity>

//           <Text
//             style={{
//               textAlign: "center",
//               color: Colors.white,
//               ...Fonts.h5,
//               marginTop: Sizes.padding2,
//             }}
//           >
//             Don't have account?
//           </Text>
//           <TouchableOpacity
//             onPress={() => navigation.navigate("SignUpScreen")}
//             style={{
//               flexDirection: "row",
//               borderColor: Colors.white,
//               borderWidth: 2,
//               backgroundColor: Colors.primary,
//               borderRadius: Sizes.radius / 2,
//               marginTop: Sizes.padding2,
//               height: 50,
//               alignItems: "center",
//               justifyContent: "center",
//               ...Shadow,
//             }}
//           >
//             <Text style={{ color: Colors.white, ...Fonts.h4Light }}>
//               Sign up
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => {}}
//             style={{
//               flexDirection: "row",
//               backgroundColor: Colors.primary,
//               borderRadius: Sizes.radius / 2,
//               marginTop: Sizes.padding,
//               height: 50,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Text style={{ color: Colors.white, ...Fonts.h5 }}>
//               Forgot your password?
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

import { Text, View } from 'react-native'
const LoginScreen = () => {
  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  )
}
export default LoginScreen