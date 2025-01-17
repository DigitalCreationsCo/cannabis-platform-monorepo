const fs = require('fs-extra');
const path = require('path');

const copyAssetsAndCSS = async () => {
	try {
		// Get the current working directory
		const targetDir = process.cwd();
		console.info('Target directory:', targetDir);

		// Define source paths relative to the script location
		const scriptDir = path.resolve(__dirname);
		const tailwindConfigFile = path.resolve(scriptDir, 'tailwind.config.cjs');
		console.info('Tailwind config file:', tailwindConfigFile);

		const fontsSrcDir = path.resolve(scriptDir, 'font');
		console.info('Browser Fonts source directory:', fontsSrcDir);

		const cssSrcDir = path.resolve(scriptDir, '..', 'src', 'css');
		console.info('CSS source directory:', cssSrcDir);

		// Define destination paths relative to the current working directory
		const publicTgtDir = path.resolve(targetDir, 'public');
		console.info('Public directory:', publicTgtDir);

		const stylesTgtDir = path.resolve(targetDir, 'styles');
		await fs.ensureDir(stylesTgtDir);

		const fontsTgtDir = path.resolve(publicTgtDir, 'fonts');
		await fs.ensureDir(fontsTgtDir);

		// Copy assets
		console.info('Copying tailwind config file to', targetDir);
		await fs.copy(tailwindConfigFile, targetDir);

		// Copy fonts
		await fs.copy(fontsSrcDir, fontsTgtDir);

		// Copy CSS files
		await fs.copy(cssSrcDir, cssDestDir);
		console.log('CSS files copied successfully to', cssDestDir);

		console.log('Assets copied successfully.');
	} catch (err) {
		console.error('Error copying files:', err);
	}
};

// Run the copy function
copyAssetsAndCSS();
