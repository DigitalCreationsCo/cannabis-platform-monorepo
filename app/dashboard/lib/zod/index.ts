import { ApiError } from '@gras/core';
import { type ZodType } from 'zod';
import type z from 'zod';

export * from './schema';

export const validateWithSchema = <ZSchema extends ZodType>(
	schema: ZSchema,
	data: any
) => {
	const result = schema.safeParse(data);

	if (!result.success) {
		throw new ApiError(
			422,
			`Validation Error: ${result.error.errors.map((e: any) => e.message)[0]}`
		);
	}

	return result.data as z.infer<ZSchema>;
};
