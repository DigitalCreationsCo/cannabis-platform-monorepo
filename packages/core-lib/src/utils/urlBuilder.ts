const shop = process.env.NEXT_PUBLIC_SHOP_APP_URL;
const dashboard = process.env.NEXT_PUBLIC_DASHBOARD_APP_URL;
const mainUrl = process.env.NEXT_PUBLIC_SERVER_MAIN_URL;
const locationUrl = process.env.NEXT_PUBLIC_SERVER_LOCATION_URL;
const paymentUrl = process.env.NEXT_PUBLIC_SERVER_PAYMENTS_URL;
const imageUrl = process.env.NEXT_PUBLIC_SERVER_IMAGE_URL;
const dispatchUrl = process.env.NEXT_PUBLIC_SERVER_DISPATCH_URL;

const urlBuilder = {
  shop,

  dashboard,

  main: {
    baseUrl: mainUrl + '/api/v1',

    getOTP: () => urlBuilder.main.baseUrl + '/signinup/code',
    submitOTP: () => urlBuilder.main.baseUrl + '/signinup/code/consume',

    healthCheck: () => urlBuilder.main.baseUrl + '/healthcheck',

    getSession: () => urlBuilder.main.baseUrl + '/session',

    ordersByOrgId: (id: any) =>
      urlBuilder.main.baseUrl + `/shop/orders/org/${id}`,
    orderById: (id: any) => urlBuilder.main.baseUrl + `/shop/orders/${id}`,
    orders: () => urlBuilder.main.baseUrl + `/shop/orders`,
    fulfillOrder: () => urlBuilder.main.baseUrl + `/shop/orders-fulfill`,

    productsByOrgId: (id: any) =>
      urlBuilder.main.baseUrl + `/shop/products/org/${id}`,
    productById: (id: any) => urlBuilder.main.baseUrl + `/shop/products/${id}`,
    products: () => urlBuilder.main.baseUrl + '/shop/products',
    productUpdate: (id: any) =>
      urlBuilder.main.baseUrl + `/organization/product/${id}/update`,
    productsByMultipleOrgs: (page: number, limit: number) =>
      urlBuilder.main.baseUrl + `/shop/products&_page=${page}&_limit=${limit}`,

    organization: () => urlBuilder.main.baseUrl + `/organization`,
    organizationById: (id: any) =>
      urlBuilder.main.baseUrl + `/organization/${id}`,
    organizationsByZipCode: (zipcode: number, limit: number, radius: number) =>
      urlBuilder.main.baseUrl +
      `/organization/zipcode/${zipcode}&_${limit}&_${radius}`,

    categoryList: (id: any) =>
      urlBuilder.main.baseUrl + `/organization/${id}/categories`,

    user: () => urlBuilder.main.baseUrl + `/user`,
    admin: () => urlBuilder.main.baseUrl + `/user/admin`,
    userById: (id: any) => urlBuilder.main.baseUrl + `/user/${id}`,
    usersByOrg: (id: any) =>
      urlBuilder.main.baseUrl + `/organization/${id}/users`,

    address: () => urlBuilder.main.baseUrl + '/auth/address',
    addressByIdAndUser: (addressId: any, id: any) =>
      urlBuilder.main.baseUrl + `/auth/user/${id}/address/${addressId}`,

    driverById: (id: any) => urlBuilder.main.baseUrl + `/driver/${id}`,
    driverUpdateStatus: () => urlBuilder.main.baseUrl + `/driver/status`,

    blog: () => urlBuilder.main.baseUrl + `/blog`,
    blogById: (id: string) => urlBuilder.main.baseUrl + `/blog/${id}`,
  },

  location: {
    baseUrl: locationUrl + '/api/v1',
    organizationsLocal: () =>
      urlBuilder.location.baseUrl + '/serve-local/organizations',
    organizationLocationRecord: () =>
      urlBuilder.location.baseUrl + '/serve-local/organizations/record',
    getOrganizationRecord: (id: string) =>
      urlBuilder.location.baseUrl + `/serve-local/organizations/${id}`,
  },

  payment: {
    baseUrl: paymentUrl + '/api/v1',
    purchase: () => urlBuilder.payment.baseUrl + '/payment/purchase',
    createStripe: () => urlBuilder.payment.baseUrl + `/accounts/create`,
    connectStripe: () => urlBuilder.payment.baseUrl + `/accounts/connect`,
    checkOnboard: () => urlBuilder.payment.baseUrl + '/accounts/check-onboard',
    checkout: () => urlBuilder.payment.baseUrl + '/payment/checkout',
  },

  image: {
    baseUrl: imageUrl + '/api/v1',
    verifyIdentificationImageUpload: () =>
      urlBuilder.image.baseUrl + '/image/scan-identification-upload',
    verifyIdentificationImageUri: () =>
      urlBuilder.image.baseUrl + '/image/scan-identification-uri',
  },

  dispatch: {
    // baseUrl: dispatchUrl + '/api/v1',
    // newOrder: () => urlBuilder.dispatch.baseUrl + '/dispatch/order/new',
    // connect: () => urlBuilder.dispatch.baseUrl + '/dispatch/connect',
    connect: () => `${dispatchUrl}`,
  },
};

export { urlBuilder };
