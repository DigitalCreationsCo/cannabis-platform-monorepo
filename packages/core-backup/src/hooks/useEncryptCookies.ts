import { type CookieOptions } from 'express';
import { useCookies } from 'react-cookie';
import { crypto } from '../utils';

const useEncryptCookies = (
	cookieKeys: string[]
): [typeof cookies, typeof setCookie, typeof removeCookie] => {
	const [cookies, setCookie, removeCookie] = useCookies(cookieKeys);

	const encryptCookies = cookieKeys.reduce((encrypted, key) => {
		const _cookie = cookies[key];

		if (!_cookie) return encrypted;
		else return { ...encrypted, [key]: crypto.decrypt(_cookie) };
	}, {});

	const setEncryptCookie = (
		cookieArg: string,
		data: string,
		options: CookieOptions | undefined
	) => {
		setCookie(cookieArg, crypto.encrypt(data), options);
	};

	return [encryptCookies, setEncryptCookie, removeCookie];
};

export default useEncryptCookies;
