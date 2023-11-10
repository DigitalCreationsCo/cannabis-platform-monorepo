type FeatureType = 'orders' | 'products' | 'users' | 'delivery_tracking';
type Config = Record<FeatureType, { enabled: boolean }>;
export type FeatureConfigInterface = Readonly<Config>;

const config: Config = Object.freeze({
	orders: {
		enabled: true,
	},
	delivery_tracking: {
		enabled: true,
	},
	products: {
		enabled: false,
	},
	users: {
		enabled: true,
	},
});

const loadFeatureConfig: (arg: Config) => FeatureConfigInterface = (
	config: Config,
) => Object.freeze(config);
const FeatureConfig: FeatureConfigInterface = loadFeatureConfig(config);
export { FeatureConfig, loadFeatureConfig };
