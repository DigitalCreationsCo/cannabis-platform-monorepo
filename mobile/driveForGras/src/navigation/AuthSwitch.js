import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../redux/features/user";
import AppContainer from "./AppContainer";
import DriveNavigator from "./navigator/DriveNavigator";
import AuthNavigator from "./navigator/AuthNavigator";
import { InitialLoading } from "../screens";

// component gets the auth token from user state,
// if token is found, render the AppNavigator,
// otherwise, render the authNavigator

export default function AuthSwitch({ authentication }) {
  const dispatch = useDispatch();

  const tokenStore = useSelector((state) => state.user.token);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setToken(tokenStore);
  }, [tokenStore]);

  // useEffect(() => {
  //   if (authentication !== null) {
  //     let { email, password } = authentication;
  //     dispatch(loginUser({ email, password })).then(() => setIsLoading(false));
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, []);

  return false ? (
    <InitialLoading />
  ) : (
    <AppContainer>{true ? <DriveNavigator /> : <AuthNavigator />}</AppContainer>
  );
}
