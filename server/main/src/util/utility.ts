import { compareSync, hashSync } from 'bcryptjs';
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
	try {
		const { password, re_password, ...rest } = data;
		if (!password || !re_password) {
			throw new Error('Password is required');
		}
		return {
			...rest,
			passwordHash: hashSync(password, Number(process.env.PASSWORD_SALT_ROUNDS)),
		};
	} catch (error) {
		console.log('Password hash was not created.', error);
		return data;
	}
}

export const isPasswordMatch = (password: string, passwordHash: string) => {
	return compareSync(password, passwordHash ?? '')
}
