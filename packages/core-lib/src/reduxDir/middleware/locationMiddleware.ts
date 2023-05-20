// @ts-nocheck

import { AnyAction, MiddlewareAPI } from "@reduxjs/toolkit";
import { UserWithDetails } from "../../../../data-access/src";
import { locationActions } from "../features";

const locationMiddleware = (store: MiddlewareAPI) => (next) => (action: AnyAction) => {

    next(action);
    try {
        if (action.type === "user/signinUserSync") {
            const 
            user = action.payload as UserWithDetails
            if (user?.address !== undefined) {
                store.dispatch(locationActions.setAllLocations(user.address));
                store.dispatch(locationActions.setHomeAddress(user.address[0]));
                store.dispatch(locationActions.setCurrentAddress(user.address[0]));
            }
        }

        
    } catch (error) {
        console.log("Location Middleware: Caught an exception: ");
        console.log(error); 
        throw error;
    }
  };
  
export default locationMiddleware