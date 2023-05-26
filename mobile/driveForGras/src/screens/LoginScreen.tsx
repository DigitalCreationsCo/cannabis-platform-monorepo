import TextContent from "@cd/core-lib/src/constants/textContent";
import React, { useRef } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { userActions } from "../redux/features/user";
import RNstyles from '@cd/core-lib/src/constants/RNstyles';
import { Button, Center, H1, H5, Screen } from '@cd/native-ui';
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
// import { Images, Fonts, Colors, Sizes, Shadow, Icons } from "../constants";

function LoginScreen () {
  
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
  
  const onSubmit = (data: any) => {
    // dispatch(userActions.clearErrorMessage());
    // dispatch(userActions.loginUser(data));
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
    <>
        <View>
          {/* <Icons.flower size={Sizes.icon} color={Colors.white} /> */}
          <H1 color="light">
            {TextContent.info.COMPANY_NAME}
          </H1>
          <H5 color="light">
            {TextContent.technical.DRIVER_APP}
          </H5>
        </View>

        {/* <Image
          source={Images.spinningWeed}
          style={{
            alignSelf: "center",
            width: 170,
            height: 170,
          }}
        /> */}

        <Center>
          <View className={twMerge(RNstyles.textfield.inputContainer)}
            // onStartShouldSetResponder={() => emailRef.current.focus()}
            >
            <Text>email</Text>
            <Controller
              name={"email"}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                className={RNstyles.textfield.input}
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

          <View className={twMerge(RNstyles.textfield.inputContainer)}
            // onStartShouldSetResponder={() => passwordRef.current.focus()}
          >
            <Text>password</Text>
            <Controller
              name={"password"}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                className={RNstyles.textfield.input}
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

          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
          <Button
            onPress={handleSubmit(onSubmit)}
            >

          </Button>


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
        </Center>
    </>
  );
}

export default Screen(LoginScreen)