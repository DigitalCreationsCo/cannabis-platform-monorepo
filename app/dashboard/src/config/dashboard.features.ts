type FeatureType =
	| 'orders'
	| 'products'
	| 'users'
	| 'delivery_tracking'
	| 'storefront'
	| 'weed_text';

type Config = Record<FeatureType, { enabled: boolean }>;
export type FeatureConfigInterface = Readonly<Config>;

const config: Config = Object.freeze({
	orders: {
		enabled: true,
	},
	delivery_tracking: {
		enabled: false,
	},
	products: {
		enabled: false,
	},
	users: {
		enabled: true,
	},
	storefront: {
		enabled: false,
	},
	weed_text: {
		enabled: true,
	},
});

const loadFeatureConfig: (arg: Config) => FeatureConfigInterface = (
	config: Config,
) => Object.freeze(config);

const FeatureConfig: FeatureConfigInterface = loadFeatureConfig(config);

export { FeatureConfig, loadFeatureConfig };
