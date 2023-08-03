import { PutObjectCommand } from '@aws-sdk/client-s3';
import { createId } from '@paralleldrive/cuid2';
import { ImageLike } from 'tesseract.js';
import { ImageFile, ImagePaths } from 'types/image-types';
import s3 from '../../s3/s3Client';
import { default as worker } from '../scan/awsWorker';
import IdCardReader from '../scan/cardReader';
import ImageProcessor, { Input } from '../scan/processor';

class ImageDAO {
	imageWorker: typeof worker;

	constructor(imageWorker) {
		this.imageWorker = imageWorker;
	}

	/**
	 * IMPROVEMENTS: this function checks the users state from the uploaded Id Image,
	 * in the future, we should check the users state from the users address to confirm the legal age requirement,
	 * ( WHY? because the age requirement is dependant on where the user resides, not where the id is issued from )
	 * Then check the users age from the users record dob
	 *
	 * @param image
	 * @returns
	 */
	async verifyIdentificationImage(
		image: ImageLike & Input,
	): Promise<{ isLegalAge: boolean; scannedDOB: Date }> {
		try {
			await ImageProcessor.getMetaData(image);

			const _text = await this.imageWorker.parseImageToText(image as Buffer);

			const { isLegalAge, scannedDOB } = new IdCardReader(_text).isLegalAge();

			return {
				isLegalAge,
				scannedDOB,
			};
		} catch (error: any) {
			console.error(error);
			throw new Error(error.message);
		}
	}

	getObjectStorageLocation(key: string, bucket: string) {
		const uri = `${process.env.OBJECT_STORAGE_ENDPOINT}/${bucket}/${key}`;
		return uri;
	}

	getExtensionFromMimeType(mimeType: string) {
		const extensionMap = {
			'image/jpeg': '.jpg',
			'image/png': '.png',
			'image/gif': '.gif',
			'image/bmp': '.bmp',
		};
		return extensionMap[mimeType] || '';
	}

	/**
	 * IMPROVEMENTS: not awaiting the s3 response, may need to do it to check for upload errors
	 *
	 * @param files
	 * @param bucket
	 * @returns
	 */
	async uploadToS3({
		files,
		bucket,
	}: {
		files: ImageFile[];
		bucket: string;
	}): Promise<ImagePaths> {
		try {
			let uploadedFiles = {};
			const tag = createId();

			await Promise.all(
				files.map(async (file): Promise<ImagePaths> => {
					const fileExtension = this.getExtensionFromMimeType(file.mimetype),
						key = `${tag}-${file.fieldname}${fileExtension}`,
						data = file.buffer;

					const putObjectCommand = new PutObjectCommand({
						Bucket: bucket,
						// ACL: "public-read",
						Key: key,
						Body: data,
						ContentType: file.mimetype,
					});

					// NOT AWAITING THE RESPONSE, MAY NEED TO DO IT TO CHECK FOR UPLOAD ERRORS
					s3.send(putObjectCommand);
					console.info(` uploaded ${key} to ${bucket}.`);
					return {
						[file.fieldname]: this.getObjectStorageLocation(key, bucket),
					};
				}),
			).then((_uploadedFiles) => {
				_uploadedFiles.forEach((file) => Object.assign(uploadedFiles, file));
			});
			return uploadedFiles;
		} catch (error: any) {
			console.error(error);
			throw new Error(error.message);
		}
	}
}

const imageDAO = new ImageDAO(worker);
export default imageDAO;
