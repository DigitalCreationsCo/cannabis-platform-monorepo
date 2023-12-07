/* eslint-disable @typescript-eslint/no-empty-function */

export default class BaseService {
	private static instance: any;

	protected constructor() {}

	public static getInstance<
		T extends new (...args: ConstructorParameters<T>) => InstanceType<T>,
	>(this: T, ...args: ConstructorParameters<T>) {
		if (!BaseService.instance) {
			BaseService.instance = new this(...args);
		}
		return BaseService.instance as InstanceType<T>;
	}
}
