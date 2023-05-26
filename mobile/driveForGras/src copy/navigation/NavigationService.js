import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

const navigate = (routename, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(routename, params);
  }
};

const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
};

export default {
  navigate,
  goBack,
};
