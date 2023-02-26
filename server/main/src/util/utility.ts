import { hashSync } from 'bcryptjs';
import { customAlphabet } from 'nanoid';
import { createHash } from 'node:crypto';

/**
 * @param input String to hash
 * @returns Input hashed with SHA265 in hexadecimal form
 */
export function sha265hex(input: string) {
	return createHash('sha256').update(input).digest('hex');
}

const alphanumericChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Create a random alphanumberic string (of default length 128 characters)
 */
export const createToken = customAlphabet(alphanumericChars, 128);

/**
 * Add passwordHash field to object, and remove password and re_password fields
 */
export const createPasswordHash = (data: any) => {
	const { password, re_password, ...rest } = data;
	return {
		...rest,
		passwordHash: hashSync(password, Number(process.env.PASSWORD_SALT_ROUNDS)),
	};
}