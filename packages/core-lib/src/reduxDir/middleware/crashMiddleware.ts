// @ts-nocheck

const crashMiddleware = (store) => (next) => (action) => {
    try {
      return next(action);
    } catch (error) {
      console.log("Crash Middleware: Caught an exception: ");
      console.log(error); 
      throw error;
    }
  };
  
export default crashMiddleware