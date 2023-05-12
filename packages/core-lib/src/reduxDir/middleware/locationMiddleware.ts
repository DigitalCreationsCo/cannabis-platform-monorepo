// @ts-nocheck

const locationMiddleware = (store) => (next) => (action) => {
    try {
        console.log(' *** location middleware ***')
        console.log('action: ', action);
        // if (action.type = )
        return next(action);
    } catch (error) {
        console.log("Location Middleware: Caught an exception: ");
        console.log(error); 
        throw error;
    }
  };
  
export default locationMiddleware