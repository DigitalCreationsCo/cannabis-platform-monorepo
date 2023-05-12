// @ts-nocheck

import { MiddlewareAPI } from "@reduxjs/toolkit";

const locationMiddleware = (store: MiddlewareAPI) => (next) => (action) => {
    try {
        console.log(' *** location middleware ***')
        if (action.type = user/signinUserSync) {
            const { user } = action.payload;
            if ( user.address) {
                store.dispatch(locationActions.setAllLocations(user.address));
                store.dispatch(locationActions.setHomeAddress(user.address[0]));
            }

        }


        return next(action);
    } catch (error) {
        console.log("Location Middleware: Caught an exception: ");
        console.log(error); 
        throw error;
    }
  };
  
export default locationMiddleware