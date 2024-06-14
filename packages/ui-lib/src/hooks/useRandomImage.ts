import { useState, useEffect } from 'react';

const useRandomImage = (images, count, shuffleImages = true) => {
	const [randomImages, setRandomImages] = useState([]);

	useEffect(() => {
		const shuffled = shuffleImages
			? [...images].sort(() => Math.random() - 0.5)
			: images;
		const result = [];
		for (let i = 0; i < count; i++) {
			result.push(shuffled[i % shuffled.length]);
		}
		setRandomImages(result.sort(() => Math.random() - 0.5)); // Shuffle the result array again
	}, [images, count]);

	return randomImages;
};

export default useRandomImage;
