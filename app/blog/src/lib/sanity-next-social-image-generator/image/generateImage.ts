import { loadImage, resize } from '../background';
import { blurFilter, darkenFilter, colorize, brighten } from '../filters';
import { generateLogoPositioning } from '../logo';
import { buildTextSVGBuffer } from '../text';
import { type GenerateOptions } from './types';

export const generateImage = async ({
	width = 1200,
	height = 600,
	fontColor = 'white',
	fontSize = 50,
	backgroundFit = 'cover',
	backgroundImageUrl,
	text,
	fontName = 'Helvetica',
	blur = 0,
	darken = 0,
	lighten = 0,
	logo = '',
	logoPosition = 'bottomRight',
	logoWidth = 200,
	logoHeight = 200,
	logoFit = 'cover',
	filterColor = '',
}: GenerateOptions): Promise<Buffer> => {
	const imageFile = await loadImage(backgroundImageUrl);
	const image = await resize(imageFile, width, height, backgroundFit);

	const composites = [];

	// Blur
	if (blur) await blurFilter(blur, image);

	// Darken
	if (darken) {
		composites.push({
			input: await darkenFilter(darken, width, height),
			left: 0,
			top: 0,
		});
	}

	// Filter color
	if (filterColor) {
		composites.push({
			input: await colorize(filterColor, width, height),
			left: 0,
			top: 0,
		});
	}

	// Brighten
	if (lighten) await brighten(lighten, image);

	// Add text
	if (text) {
		const buffer = await buildTextSVGBuffer({
			width,
			height,
			text,
			color: fontColor,
			fontSize,
			fontName,
		});

		composites.push({ input: buffer, left: 0, top: 0 });
	}

	// Logo
	if (logo) {
		const sharpLogo = await generateLogoPositioning({
			logo,
			logoWidth,
			logoHeight,
			logoFit,
			width,
			height,
			logoPosition,
		});

		composites.push(sharpLogo);
	}

	await image.composite(composites);

	return await image.toBuffer();
};
