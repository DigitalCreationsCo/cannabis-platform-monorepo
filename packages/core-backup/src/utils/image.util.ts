const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;

async function dynamicBlurDataUrl(url: string) {
	const base64str = await fetch(
		`${baseUrl}/_next/image?url=${url}&w=16&q=75`
	).then(async (res) =>
		Buffer.from(await res.arrayBuffer()).toString('base64')
	);

	const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='1' />
      </filter>

      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
      href='data:image/avif;base64,${base64str}' />
    </svg>
  `;

	const toBase64 = (str: string) =>
		typeof window === 'undefined'
			? Buffer.from(str).toString('base64')
			: window.btoa(str);

	return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
}

async function getImagePixelData(url: string) {
	const data = await fetch(url).then(async (res) => {
		const blob = await res.blob();
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const img = new Image();
		img.src = URL.createObjectURL(blob);
		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx?.drawImage(img, 0, 0);
		};
	});
}

export {
	dynamicBlurDataUrl,
	getImagePixelData
}