import { Middleware } from "redux";

const crashMiddleware = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    console.log("Caught an exception: ", error);
    throw error;
  }
};

export default crashMiddleware;
