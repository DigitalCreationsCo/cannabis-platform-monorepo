import { type User } from '@cd/data-access';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';

export const useIsLegalAge = (user: User) => {
	const is_legal_age = Boolean(getCookie('is_legal_age'));
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	useEffect(() => {}, [user?.is_legal_age, is_legal_age]);
	return { isLegalAge: user?.is_legal_age || is_legal_age };
};
