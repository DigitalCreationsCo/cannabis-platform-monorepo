import { useState } from 'react';

/**
 * Returns a random item from an array
 * @param data
 * @returns
 * @example
 * const data = ['a', 'b', 'c', 'd', 'e'];
 * const random = useRandom(data);
 * console.log(random); // 'c'
 * console.log(random); // 'd'
 **/
export default function useRandom(data: any[]) {
	const [random] = useState(Math.floor(Math.random() * data.length));

	return data && data[random];
}
