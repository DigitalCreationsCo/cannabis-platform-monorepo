import type sharp from 'sharp';

export const brighten = async (
	lighten: number,
	image: sharp.Sharp,
): Promise<sharp.Sharp> => {
	return await image.modulate({ brightness: lighten });
};
