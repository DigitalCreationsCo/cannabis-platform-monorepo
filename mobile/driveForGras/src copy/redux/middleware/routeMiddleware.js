import { socketActions } from "../features/socket";

const routeMiddleware = (store) => {
  return (next) => (action) => {
    if (socketActions.orderAccepted.fulfilled.match(action)) {
      console.log("route middleware: order accepted action");
      console.log("calling for route sort");
    }

    const result = next(action);
    return result;
  };
};

export default routeMiddleware;
