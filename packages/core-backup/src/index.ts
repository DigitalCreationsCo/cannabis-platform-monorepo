export { axios, applicationHeaders } from './axiosInstance'

export type {
	AxiosErrorCustom,
	AxiosConfigCustom,
	AxiosResponseCustom,
	ResponseDataEnvelope
} from './axiosInstance'

export {
	userDispensaryStaff,
	notAdminUser,
	organization,
	products,
	orders,
	variants,
	dailyDealsCreate,
	dailyDeals,
} from './dummyData';

export { ApiError } from './errors';
