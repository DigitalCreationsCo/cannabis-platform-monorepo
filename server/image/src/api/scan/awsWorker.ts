import * as AWS from "@aws-sdk/client-rekognition";
import { DetectTextCommand, RekognitionClient } from "@aws-sdk/client-rekognition";

const client = new RekognitionClient({ region: "REGION" });

class AWSRekognitionWorker {
    imageWorker: AWS.RekognitionClient

    constructor(imageWorker: AWS.RekognitionClient) {
        this.imageWorker = imageWorker;
    }

    /**
     * detects text from image
     * @param image 
     * @returns 
     */
    async parseImageToText(image: Buffer) {
        try {

            const result: string[] = []

            const params = {
                Image: {
                    Bytes: image
                },
            }
            const command = new DetectTextCommand(params);

            this.imageWorker.send(command, function (err, response) {
                if (err) {
                    console.log(err, err.stack); // handle error if an error occurred
                    throw new Error('The image could not be verified. Please try again.');
                } else {
                    console.log('detect response: ', response);
                    response.TextDetections.forEach(label => {
                        console.log(`Detected Text: ${label.DetectedText}`),
                            console.log(`Type: ${label.Type}`),
                            console.log(`ID: ${label.Id}`),
                            console.log(`Parent ID: ${label.ParentId}`),
                            console.log(`Confidence: ${label.Confidence}`),
                            console.log(`Polygon: `)
                        console.log(label.Geometry.Polygon);
                        result.push(label.DetectedText);
                    }
                    )
                }
            });

            console.info('Returned the result: ', result);

            return "TEST";
        } catch (error) {
            console.error('AWS Image Worker parseImageToText: ', error);
            throw new Error(error.message);
        }
    }
}

export default new AWSRekognitionWorker(client);