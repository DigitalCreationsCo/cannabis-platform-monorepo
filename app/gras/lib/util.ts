import { type User } from '@cd/data-access';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export const useIsLegalAge = (user: User) => {
	const [isLegalAge, setIsLegalAge] = useState(false);

	useEffect(() => {
		const is_legal_age_cookie = Boolean(getCookie('is_legal_age'));
		console.info('is_legal_age_cookie', is_legal_age_cookie);
		setIsLegalAge(user?.is_legal_age || is_legal_age_cookie === true);
	});

	return { isLegalAge, setIsLegalAge };
};
