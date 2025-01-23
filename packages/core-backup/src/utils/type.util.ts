function assertValue<T>(v: T | undefined, errorMessage: string): T {
	if (v === undefined) {
		throw new Error(errorMessage);
	}

	return v;
}

function assertType<T>(
	v: unknown,
	errorMessage: string
): asserts v is T {
	if (!(v instanceof Object)) {
		throw new Error(errorMessage);
	}
}

type ValueOf<T> = T[keyof T];

export {
	assertType,
	assertValue,
}

export type {
	ValueOf
}