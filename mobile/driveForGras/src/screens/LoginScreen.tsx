import TextContent from "@cd/core-lib/src/constants/textContent";
import React, { useRef } from "react";
import { Text, TextInput, View } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { userActions } from "../redux/features/user";
import RNstyles from '@cd/core-lib/src/constants/RNstyles';
import Icons from '@cd/native-ui/src/icons';
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Button, Center, FlexBox, H1, H5, Screen } from '../components';

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
          <FlexBox className="flex-row items-center">
          <H1 color="light">
            {TextContent.info.COMPANY_NAME}
          </H1>
          <Icons.Flower color="white" />
          </FlexBox>
          <H5 color="light">
            {TextContent.technical.DRIVER_APP}
          </H5>
        </View>

        {/* <FastImage source={{ uri: "../../public/images/weed.gif" }} className='border h-24 w-24' /> */}
        <Center>
          <View className={twMerge(RNstyles.textfield.inputContainer)}
            onStartShouldSetResponder={() => emailRef.current.focus()}
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
            onStartShouldSetResponder={() => passwordRef.current.focus()}
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
                {TextContent.ui.SIGNIN}
              </Text>
            )}
          </TouchableOpacity> */}
          
          <Button
          className="bg-accent-soft rounded"
          loading={false}
          size='lg'
          hover="primary"
          transparent={false}
            onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-xl text-dark">
                {TextContent.ui.SIGNIN}
              </Text>
          </Button>



          {/* V NOT NEEDED, USING ONE TIME PASSCODE SIGNIN FOR NOW */}
          {/* <Text>
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
          </TouchableOpacity> */}

        </Center>
    </>
  );
}

export default Screen(LoginScreen)