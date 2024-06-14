import { useState, useCallback } from 'react';

const useImageCycler = (images: { src: string; alt: string }[]) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	return useCallback(() => {
		const nextIndex = (currentIndex + 1) % images.length;
		setCurrentIndex(nextIndex);
		return images[nextIndex];
	}, [currentIndex, images]);
};

export default useImageCycler;
