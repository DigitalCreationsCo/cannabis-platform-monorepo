const accessToken = process.env.LOCATIONIQ_ACCESS_TOKEN;

export const urlTable = {
  UPDATE_ONLINE_STATUS: () => process.env.UPDATE_ONLINE_STATUS_URL,
  UPDATE_SESSION_LOCATION: () => process.env.UPDATE_SESSION_LOCATION_URL,
  UPDATE_ORDER_DRIVER_PATH: () => process.env.UPDATE_ORDER_DRIVER_PATH_URL,
  DISPATCH_CONNECT: () => process.env.DISPATCH_CONNECT_URL,
  LOGIN: () => "http://127.0.0.1:6001/api/v1/user/login",
  SIGNUP: () => "http://127.0.0.1:6001/api/v1/user/register",
  LOGOUT: () => "http://127.0.0.1:6001/api/v1/user/logout",
  REVERSE_GEO_LOOKUP: (longitude, latitude) =>
    `https://us1.locationiq.com/v1/reverse.php?key=${accessToken}&lat=${latitude}&lon=${longitude}&format=json`,
  GET_VENDORS: (coords, searchRadius) =>
    "http://127.0.0.1:6002/api/v1/localize",
  GET_PRODUCTS_BY_VENDOR: (vendorId) =>
    `http://127.0.0.1:6001/api/v1/shop/${vendorId}/products`,
  GET_PRODUCTS: (pageNumber, limit) =>
    `http://127.0.0.1:6001/api/v1/shop/products&_page=${pageNumber}&_limit=${limit}`,
};

export default urlTable;

//fix this url, test it in postman! :)
