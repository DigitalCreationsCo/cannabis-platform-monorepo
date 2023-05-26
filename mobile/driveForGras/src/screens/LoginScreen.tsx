import React, { useRef } from "react";
import {
  SafeAreaView, Text, TextInput, TouchableOpacity, View
} from "react-native";

// import { useDispatch, useSelector } from "react-redux";
// import { userActions } from "../redux/features/user";

import { Controller, useForm } from "react-hook-form";

// import { Images, Fonts, Colors, Sizes, Shadow, Icons } from "../constants";

export default function LoginScreen(
  // { navigation, route }
  ) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const dispatch = useDispatch();

  // const { isFetching, isSuccess, isError, errorMessage } = useSelector(
  //   (state) => state.user
  // );

  const errorMessage = ''
  
  const onSubmit = (data) => {
    dispatch(userActions.clearErrorMessage());
    dispatch(userActions.loginUser(data));
  };

  // React.useEffect(() => {
  //   if (errorMessage) {
  //     dispatch(userActions.clearErrorMessage());
  //   }

  //   return () => {
  //     dispatch(userActions.clearErrorMessage());
  //     dispatch(userActions.clearState());
  //   };
  // }, []);

  // React.useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(userActions.clearState());
  //   }

  //   if (isError) {
  //     dispatch(userActions.clearState());
  //   }
  // }, [isSuccess, isError]);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <SafeAreaView>
      <View>
        <View>
          {/* <Icons.flower size={Sizes.icon} color={Colors.white} /> */}
          <Text>
            {" "}
            Cannabis Delivery
          </Text>
        </View>

        {/* <Image
          source={Images.spinningWeed}
          style={{
            alignSelf: "center",
            width: 170,
            height: 170,
          }}
        /> */}

        <View>
          <View
            // onStartShouldSetResponder={() => emailRef.current.focus()}
            >
            <Text>email</Text>
            <Controller
              name={"email"}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  autoCapitalize={"none"}
                  ref={emailRef}
                  placeholder={""}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

          <View
            // onStartShouldSetResponder={() => passwordRef.current.focus()}
          >
            <Text>password</Text>
            <Controller
              name={"password"}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  autoCapitalize={"none"}
                  secureTextEntry
                  ref={passwordRef}
                  placeholder={""}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

          <Text>
            {((errors.email || errors.password) &&
              "Please enter the empty fields") ||
              errorMessage}
          </Text>

          <TouchableOpacity
            // title="Submit"
            onPress={handleSubmit(onSubmit)}
          >
            {false ? (
              <Text>
                Logging in...
              </Text>
            ) : (
              <Text>
                Login
              </Text>
            )}
          </TouchableOpacity>

          <Text>
            Don't have account?
          </Text>
          <TouchableOpacity
            // onPress={() => navigation.navigate("SignUpScreen")}
          >
            <Text>
              Sign up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          >
            <Text>
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
