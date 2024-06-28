import { useState, useEffect } from 'react';

const useRandomImage = (images, count, shuffleImages = true) => {
	console.info('images: ', images);
	const [randomImages, setRandomImages] = useState<
		{
			src: string;
			alt: string;
		}[]
	>([]);

	useEffect(() => {
		const shuffled = shuffleImages
			? [...images].sort(() => Math.random() - 0.5)
			: images;
		const result = [];
		for (let i = 0; i < count; i++) {
			console.info('i % shuffled.length: ', i % shuffled.length);
			result.push(shuffled[i % shuffled.length]);
		}
		setRandomImages(result.sort(() => Math.random() - 0.5)); // Shuffle the result array again
	}, [images, count]);

	console.info('randomImages: ', randomImages);
	return randomImages;
};

export default useRandomImage;
