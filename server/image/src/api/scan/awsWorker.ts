import * as AWS from '@aws-sdk/client-rekognition';
import {
	DetectTextCommand,
	RekognitionClient,
} from '@aws-sdk/client-rekognition';

const client = new RekognitionClient({
	region: 'us-east-2',
	credentials: {
		accessKeyId: process.env.REKOGNITION_ACCESS_KEY,
		secretAccessKey: process.env.REKOGNITION_SECRET_KEY,
	},
});

class AWSRekognitionWorker {
	imageWorker: AWS.RekognitionClient;

	constructor(imageWorker: AWS.RekognitionClient) {
		this.imageWorker = imageWorker;
	}

	/**
	 * detects text from image
	 * @param image
	 * @returns
	 */
	async parseImageToText(image: Buffer): Promise<string> {
		try {
			let result: string[] = [];

			const params = {
				Image: {
					Bytes: image,
				},
			};
			const command = new DetectTextCommand(params);

			const promiseText = await this.imageWorker.send(command).then(
				(response) => {
					response.TextDetections.forEach((label) => {
						// console.log(`Detected Text: ${label.DetectedText}`),
						//     console.log(`Type: ${label.Type}`),
						//     console.log(`ID: ${label.Id}`),
						//     console.log(`Parent ID: ${label.ParentId}`),
						//     console.log(`Confidence: ${label.Confidence}`),
						//     console.log(`Polygon: `)
						// console.log(label.Geometry.Polygon);
						result.push(label.DetectedText);
					});
				},
				(error) => {
					console.log(error, error.stack); // handle error if an error occurred
					throw new Error('The image could not be verified. Please try again.');
				},
			);
			Promise.resolve(promiseText);

			return result.join(' ');
		} catch (error) {
			console.error('AWS Image Worker parseImageToText: ', error);
			throw new Error(error.message);
		}
	}
}

export default new AWSRekognitionWorker(client);
