import { encode } from 'blurhash';
import sharp from 'sharp';

export const encodeImageToBlurhash = (path: string) => {
	console.info('path ', path);
	return new Promise((resolve, reject) => {
		sharp(path)
			// .raw()
			.ensureAlpha()
			.resize(32, 32, { fit: 'inside' })
			.toBuffer((err, buffer, out) => {
				if (err) {
					console.error('Error encoding image to blurhash', err);
					return reject(err);
				}
				console.info('buffer ', buffer);
				console.info('out ', out);
				const { width, height } = out;
				resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
			});
	});
};
