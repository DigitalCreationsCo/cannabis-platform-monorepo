export { 
	isValidDomain,
	copyToClipboard,
	passwordPolicies,
	eventTypes,
	maxLengthPolicies,
	forceConsume,
	generateToken,
	extractAuthToken,
	validateEmail,
	slugify,
	getFirstErrorOrNull
} from './common.util'

export { crypto } from './crypto';

export { debounce } from './debounce';

export {
    checkClientsForUser,
    createRoomId,
    getOrderIdFromRoom
} from './dispatch.util';

export {
    stateMap,
    usStatesList,
    usStatesAbbreviationList,
    getGeoCoordinatesFromAddress,
    getGeoAddressFromCoordinates,
    getCoordinatePairFromCoordinates,
    getGeoJsonPairFromCoordinates,
    setCoordinateRadius,
    coordinatesIsEmpty,
    getHaversineDistanceFromCoordinates,
    getTravelDistanceFromCoordinates,
    getRoutingDetails,
    getOptimizedRouting,
    isValidZipcode,
} from './geo.util';

export type { RoutingDetailsResponse } from './geo.util'

export {
    getProperty,
    normalizeUserData,
    pruneData,
    isEmpty,
    isArray,
    shuffle,
    dateToString,
    addressObjectIntoArray,
    reconcileStateArray
} from './object.util';


export {
	checkIsDispensaryOpen,
	getNextScheduleDay
} from './schedule.util';


export { generateCheckoutLineItemsFromOrderItems } from './stripe.util';

export {
	showDate,
	showTime,
	showDay,
	formatToTimeZone,
	calculateDeliveryDeadline,
	integerToTime,
	TimeZoneMap,
} from './time.util';

export {
	orderStatusList,
	isValidOrderRecord,
	checkOrderIsCompleteOrCanceled,
	calculateSalePrice,
	getCurrencySymbol,
	convertCentsToDollars,
	convertDollarsToWholeNumber,
	calculateTransactionFees,
	calculateTransactionTotal,
	calculateDeliveryFeeFromSubtotal,
	convertMetersToMiles,
	calculateMileageFee,
	calculatePlatformFee,
	buildOrderRecord,
	multiplyAllItemsForOrder,
	// getDailyDealProductsAndCalculateTotal,
	calculateSubtotal,
	calculateProductSaleAtQuantity,
} from './transaction.util';


export { getPhoneWithoutDialCode, prependDialCode } from './phone.util';

export {
    renderAddress,
    renderSchedule,
    truncate,
    truncateWordsAndLeaveN,
    truncateWordsLongerThanNChars,
    getDigitToWord,
    getSelectedOptionValue,
    buildSTFormFields,
    redact,
    redactSensitiveFields,
    renderNestedDataObject
} from './ui.util';


export {
    formatDispensaryUrl,
    parseUrlParameters,
    parseUrlFriendlyStringToObject,
    getDispensaryDomain,
    replaceRelativePath,
    formatBlogUrl,
    getShopSite,
    getDashboardSite,
} from './url.util';


export { urlBuilder } from './urlBuilder';
export { generateWidgetScriptTag } from './widget.util';


export {
	assertType,
	assertValue,
} from './type.util'

export type {
	ValueOf
} from './type.util';

export {
    searchUnsplashPhotoByKeyword,
    triggerUnsplashDownload
} from './unsplash.util';

export {
    dynamicBlurDataUrl,
    getImagePixelData
} from './image.util';
