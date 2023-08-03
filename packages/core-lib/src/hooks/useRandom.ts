import { useState } from 'react';

export default function useRandom(data: any[]) {
	const [random, _] = useState(Math.floor(Math.random() * data.length));

	return data && data[random];
}
