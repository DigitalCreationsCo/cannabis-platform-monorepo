import { Screen, Text, View } from '@components';
// import React, { useRef, useState } from "react";
// import {
//   SafeAreaView, Text, TextInput, TouchableOpacity, View
// } from "react-native";
// import { CountryPicker } from "react-native-country-codes-picker";

// import { useDispatch, useSelector } from "react-redux";
// import { userActions } from "../redux/features/user";

// import { yupResolver } from "@hookform/resolvers/yup";
// import { Controller, useForm } from "react-hook-form";
// import * as Yup from "yup";

// import { BackButton } from "../components";
// import { Colors, Fonts, Icons, Shadow, Sizes } from "../constants";

// export default function SignUpScreen() {
//   // confirmPassword validation is client side.
//   // all other fields are validated server side for now.

//   // what do you suggest I do? escalate or no?
//   // in your experience, will the escalation get this resolved more effectively?

//   const validationSchema = Yup.object().shape({
//     firstName: Yup.string(),
//     lastName: Yup.string(),
//     mobileNumber: Yup.string().required(),
//     email: Yup.string(),
//     userName: Yup.string(),
//     country: Yup.object().required(),
//     password: Yup.string(),
//     confirmPassword: Yup.string()
//       .required()
//       .oneOf([Yup.ref("password")], "Passwords must match"),
//   });
//   const formOptions = { resolver: yupResolver(validationSchema) };
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm(formOptions);

//   const dispatch = useDispatch();

//   const { isFetching, isSuccess, isError, errorMessage } = useSelector(
//     (state) => state.user
//   );

//   // const renderErrorObject = (object) => {
//   //   let errorValues = new Promise((resolve, reject) => {
//   //     resolve(Object.values(object));
//   //   });
//   //   errorValues
//   //     .then((prop) => JSON.stringify(Object.values(prop)))
//   //     .then((obj) => console.info(obj));
//   // };

//   const onSubmit = (data) => {
//     // create a data object with the correct fields,
//     // update the backend to accept these fields,

//     let {
//       firstName,
//       lastName,
//       mobileNumber,
//       email,
//       userName,
//       password,
//       confirmPassword,
//       country,
//     } = data;

//     if (password === confirmPassword) {
//       data = {
//         firstName,
//         lastName,
//         mobileNumber,
//         email,
//         userName,
//         password,
//         dialCode: country.dial_code,
//         country: country.name.en,
//         countryCode: country.code,
//       };

//       dispatch(userActions.clearErrorMessage());
//       dispatch(userActions.signupUser(data));
//     }
//   };

//   React.useEffect(() => {
//     dispatch(userActions.clearErrorMessage());

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

//   const firstNameRef = useRef(null);
//   const lastNameRef = useRef(null);
//   const countryRef = useRef(null);
//   const mobileNumberRef = useRef(null);
//   const emailRef = useRef(null);
//   const userNameRef = useRef(null);
//   const passwordRef = useRef(null);
//   const confirmPasswordRef = useRef(null);

//   const [showCountryPicker, setShowPicker] = useState(false);
//   const [selectedCountry, setCountry] = useState([]);
//   return (
//     <>
//       <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
//         <BackButton />

//         <View
//           style={{
//             flex: 1,
//             paddingVertical: 50,
//             alignContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {/* <Text style={{ ...Fonts.h1Light, alignSelf: 'center', color: Colors.white, marginBottom: Sizes.padding2 }}>
//                     Add your account</Text>

//                 <View style={{ flexDirection: 'row', alignSelf: 'center', }}>

//                     <TouchableOpacity style={{
//                         backgroundColor: Colors.white,
//                         height: 60,
//                         width: 60,
//                         marginHorizontal: Sizes.padding,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         borderRadius: Sizes.radius / 2,
//                         ...Shadow
//                         }}
//                         >
//                         <Text>google</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={{
//                         backgroundColor: Colors.white,
//                         height: 60,
//                         width: 60,
//                         marginHorizontal: Sizes.padding,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         borderRadius: Sizes.radius / 2,
//                         ...Shadow
//                         }}
//                         >
//                         <Text>apple</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={{
//                         backgroundColor: Colors.white,
//                         height: 60,
//                         width: 60,
//                         marginHorizontal: Sizes.padding,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         borderRadius: Sizes.radius / 2,
//                         ...Shadow
//                         }}
//                         >
//                         <Text>facebook</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <View style={{ justifyContent: 'center', alignContent: 'center' }}>
//                 <Text style={{ ...Fonts.h2Light, alignSelf: 'center', color: Colors.white }}>
//                     or</Text>
//                 </View> */}

//           <View
//             style={{
//               flex: 1,
//               justifyContent: "space-between",
//               alignSelf: "center",
//               width: Sizes.cardWidth,
//             }}
//           >
//             <Text
//               style={{
//                 ...Fonts.h1Light,
//                 alignSelf: "center",
//                 color: Colors.white,
//                 marginBottom: Sizes.padding2,
//               }}
//             >
//               Sign Up with email
//             </Text>

//             <View>
//               <View style={{ flexDirection: "row" }}>
//                 <View
//                   onStartShouldSetResponder={() => firstNameRef.current.focus()}
//                   style={{
//                     flex: 1,
//                     backgroundColor: Colors.white,
//                     height: 60,
//                     paddingTop: Sizes.padding,
//                     paddingBottom: Sizes.padding,
//                     paddingHorizontal: Sizes.padding2,
//                     marginBottom: Sizes.padding2,
//                     marginRight: Sizes.padding,
//                     borderRadius: Sizes.radius / 2,
//                     ...Shadow,
//                   }}
//                 >
//                   <Text>{"first name"}</Text>
//                   <Controller
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                       <TextInput
//                         ref={firstNameRef}
//                         autoCapitalize={"words"}
//                         placeholder={""}
//                         onBlur={onBlur}
//                         onChangeText={onChange}
//                         value={value}
//                         style={{
//                           flex: 1,
//                           justifyContent: "flex-end",
//                           color: Colors.black,
//                           ...Fonts.h4,
//                         }}
//                       />
//                     )}
//                     name={"firstName"}
//                   />
//                 </View>

//                 <View
//                   onStartShouldSetResponder={() => lastNameRef.current.focus()}
//                   style={{
//                     flex: 1,
//                     backgroundColor: Colors.white,
//                     height: 60,
//                     paddingTop: Sizes.padding,
//                     paddingBottom: Sizes.padding,
//                     paddingHorizontal: Sizes.padding2,
//                     marginBottom: Sizes.padding2,
//                     marginLeft: Sizes.padding,
//                     borderRadius: Sizes.radius / 2,
//                     ...Shadow,
//                   }}
//                 >
//                   <Text>{"last name"}</Text>
//                   <Controller
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                       <TextInput
//                         ref={lastNameRef}
//                         autoCapitalize={"words"}
//                         placeholder={""}
//                         onBlur={onBlur}
//                         onChangeText={onChange}
//                         value={value}
//                         style={{
//                           flex: 1,
//                           justifyContent: "flex-end",
//                           color: Colors.black,
//                           ...Fonts.h4,
//                         }}
//                       />
//                     )}
//                     name={"lastName"}
//                   />
//                 </View>
//               </View>

//               <View style={{ flexDirection: "row" }}>
//                 <View
//                   onStartShouldSetResponder={() => {
//                     setShowPicker(true);
//                     // countryRef.current.focus();
//                   }}
//                   style={{
//                     backgroundColor: Colors.white,
//                     height: 60,
//                     paddingTop: Sizes.padding,
//                     paddingBottom: Sizes.padding,
//                     paddingHorizontal: Sizes.padding2,
//                     marginBottom: Sizes.padding2,
//                     marginRight: Sizes.padding,
//                     borderRadius: Sizes.radius / 2,
//                     ...Shadow,
//                   }}
//                 >
//                   <Text>{"country"}</Text>

//                   <Text
//                     style={{
//                       flex: 1,
//                       color: Colors.black,
//                       paddingTop: 2,
//                       ...Fonts.h4,
//                     }}
//                   >
//                     {selectedCountry.join(" ")}
//                   </Text>
//                 </View>

//                 <View
//                   onStartShouldSetResponder={() =>
//                     mobileNumberRef.current.focus()
//                   }
//                   style={{
//                     flex: 1,
//                     backgroundColor: Colors.white,
//                     height: 60,
//                     paddingTop: Sizes.padding,
//                     paddingBottom: Sizes.padding,
//                     paddingHorizontal: Sizes.padding2,
//                     marginBottom: Sizes.padding2,
//                     marginLeft: Sizes.padding,
//                     borderRadius: Sizes.radius / 2,
//                     ...Shadow,
//                   }}
//                 >
//                   <Text>{"mobile number"}</Text>
//                   <Controller
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field: { onChange, onBlur, value } }) => (
//                       <TextInput
//                         autoCapitalize={"none"}
//                         ref={mobileNumberRef}
//                         placeholder={""}
//                         onBlur={onBlur}
//                         onChangeText={onChange}
//                         value={value}
//                         style={{
//                           flex: 1,
//                           justifyContent: "flex-end",
//                           color: Colors.black,
//                           ...Fonts.h4,
//                         }}
//                       />
//                     )}
//                     name={"mobileNumber"}
//                   />
//                 </View>
//               </View>

//               <View
//                 onStartShouldSetResponder={() => emailRef.current.focus()}
//                 style={{
//                   backgroundColor: Colors.white,
//                   height: 60,
//                   paddingTop: Sizes.padding,
//                   paddingBottom: Sizes.padding,
//                   paddingHorizontal: Sizes.padding2,
//                   marginBottom: Sizes.padding2,
//                   borderRadius: Sizes.radius / 2,
//                   ...Shadow,
//                 }}
//               >
//                 <Text>{"email"}</Text>
//                 <Controller
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field: { onChange, onBlur, value } }) => (
//                     <TextInput
//                       autoCapitalize={"none"}
//                       ref={emailRef}
//                       placeholder={""}
//                       onBlur={onBlur}
//                       onChangeText={onChange}
//                       value={value}
//                       style={{
//                         flex: 1,
//                         justifyContent: "flex-end",
//                         color: Colors.black,
//                         ...Fonts.h4,
//                       }}
//                     />
//                   )}
//                   name={"email"}
//                 />
//               </View>

//               <View
//                 onStartShouldSetResponder={() => userNameRef.current.focus()}
//                 style={{
//                   backgroundColor: Colors.white,
//                   height: 60,
//                   paddingTop: Sizes.padding,
//                   paddingBottom: Sizes.padding,
//                   paddingHorizontal: Sizes.padding2,
//                   marginBottom: Sizes.padding2,
//                   borderRadius: Sizes.radius / 2,
//                   ...Shadow,
//                 }}
//               >
//                 <Text>{"username"}</Text>
//                 <Controller
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field: { onChange, onBlur, value } }) => (
//                     <TextInput
//                       autoCapitalize={"none"}
//                       ref={userNameRef}
//                       placeholder={""}
//                       onBlur={onBlur}
//                       onChangeText={onChange}
//                       value={value}
//                       style={{
//                         flex: 1,
//                         justifyContent: "flex-end",
//                         color: Colors.black,
//                         ...Fonts.h4,
//                       }}
//                     />
//                   )}
//                   name={"userName"}
//                 />
//               </View>

//               <View
//                 onStartShouldSetResponder={() => passwordRef.current.focus()}
//                 style={{
//                   backgroundColor: Colors.white,
//                   height: 60,
//                   paddingTop: Sizes.padding,
//                   paddingBottom: Sizes.padding,
//                   paddingHorizontal: Sizes.padding2,
//                   marginBottom: Sizes.padding2,
//                   borderRadius: Sizes.radius / 2,
//                   ...Shadow,
//                 }}
//               >
//                 <Text>{"password"}</Text>
//                 <Controller
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field: { onChange, onBlur, value } }) => (
//                     <TextInput
//                       secureTextEntry
//                       autoCapitalize={"none"}
//                       ref={passwordRef}
//                       placeholder={""}
//                       onBlur={onBlur}
//                       onChangeText={onChange}
//                       value={value}
//                       style={{
//                         flex: 1,
//                         justifyContent: "flex-end",
//                         color: Colors.black,
//                         ...Fonts.h4,
//                       }}
//                     />
//                   )}
//                   name={"password"}
//                 />
//               </View>

//               <View
//                 onStartShouldSetResponder={() =>
//                   confirmPasswordRef.current.focus()
//                 }
//                 style={{
//                   backgroundColor: Colors.white,
//                   height: 60,
//                   paddingTop: Sizes.padding,
//                   paddingBottom: Sizes.padding,
//                   paddingHorizontal: Sizes.padding2,
//                   marginBottom: Sizes.padding2,
//                   borderRadius: Sizes.radius / 2,
//                   ...Shadow,
//                 }}
//               >
//                 <Text>{"confirm password"}</Text>
//                 <Controller
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field: { onChange, onBlur, value } }) => (
//                     <TextInput
//                       secureTextEntry
//                       autoCapitalize={"none"}
//                       ref={confirmPasswordRef}
//                       placeholder={""}
//                       onBlur={onBlur}
//                       onChangeText={onChange}
//                       value={value}
//                       style={{
//                         flex: 1,
//                         justifyContent: "flex-end",
//                         color: Colors.black,
//                         ...Fonts.h4,
//                       }}
//                     />
//                   )}
//                   name={"confirmPassword"}
//                 />
//               </View>

//               <Text
//                 style={{
//                   height: 200,
//                   paddingHorizontal: Sizes.padding,
//                   ...Fonts.body3,
//                   color: Colors.white,
//                 }}
//               >
//                 {((errors.firstName ||
//                   errors.lastName ||
//                   errors.country ||
//                   errors.mobileNumber ||
//                   errors.userName ||
//                   errors.email ||
//                   errors.password) &&
//                   "Please enter the empty fields. ") ||
//                   (errors.confirmPassword?.type == "oneOf" &&
//                     "Passwords must match. ") ||
//                   errorMessage}
//               </Text>
//             </View>

//             <TouchableOpacity
//               title="Submit"
//               onPress={handleSubmit(onSubmit)}
//               style={{
//                 flexDirection: "row",
//                 borderColor: Colors.white,
//                 borderWidth: 2,
//                 backgroundColor: Colors.primary,
//                 borderRadius: Sizes.radius / 2,
//                 marginTop: Sizes.padding,
//                 marginBottom: Sizes.padding,
//                 height: 50,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 ...Shadow,
//               }}
//             >
//               {isFetching ? (
//                 <Text style={{ color: Colors.white, ...Fonts.h3 }}>
//                   Signing Up...
//                 </Text>
//               ) : (
//                 <>
//                   <Icons.flower size={Sizes.icon} color={Colors.white} />
//                   <Text style={{ color: Colors.white, ...Fonts.h3 }}>
//                     {" "}
//                     Sign Up
//                   </Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </SafeAreaView>

//       <View
//         style={{
//           position: "absolute",
//           display: showCountryPicker ? "flex" : "none",
//           height: "100%",
//           width: "100%",
//           zIndex: 1,
//           paddingBottom: 100,
//         }}
//       >
//         <Controller
//           control={control}
//           rules={{ required: true }}
//           render={({ field: { onChange, value } }) => (
//             <CountryPicker
//               pickerButtonOnPress={(value) => {
//                 onChange(value);
//                 setCountry([value.flag, value.code]);
//                 setShowPicker(false);
//               }}
//               show={showCountryPicker}
//               style={{
//                 countryButtonStyles: {
//                   height: 60,
//                   marginVertical: Sizes.padding,
//                 },
//                 modal: {
//                   padding: Sizes.padding2,
//                   paddingTop: 70,
//                   paddingBottom: 50,
//                   radius: Sizes.radius,
//                   margin: 0,
//                   height: "100%",
//                   position: "absolute",
//                   top: 0,
//                 },
//                 textInput: {
//                   ...Fonts.body3,
//                   padding: Sizes.padding2,
//                   marginVertical: Sizes.padding,
//                 },
//               }}
//               inputPlaceholder={"search your country"}
//             />
//           )}
//           name={"country"}
//         />
//       </View>
//     </>
//   );
// }

const DriverSignUpScreen = () => {
	return (
		<View>
			<Text>SignUpScreen</Text>
		</View>
	);
};
export default Screen(DriverSignUpScreen);
