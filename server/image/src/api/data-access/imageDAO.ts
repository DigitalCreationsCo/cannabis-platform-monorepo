import { ImageLike } from "tesseract.js";
import IdCardReader from "../scan/cardReader";
import ImageProcessor, { Input } from "../scan/processor";
import { default as worker } from "../scan/worker";

class ImageDAO {

    imageWorker: typeof worker
    constructor(imageWorker) {
        this.imageWorker = imageWorker;
    }
    // IMPROVEMENTS: this function checks the users state from the uploaded Id Image,
    // in the future, we should check the users state from the users address to confirm the legal age, 
    // and then check the users age from the users record dob

    async checkLegalAgeFromIdImage(image: (ImageLike & Input)): Promise<{ isLegalAge: boolean, scannedDOB: Date }> {
        try {
            await this.imageWorker.detectAndCorrectImage(image);

            const
                nonEnhancedImageText = await this.imageWorker.parseImageToText(image);

            const
                _stateOfIssue = new IdCardReader(nonEnhancedImageText).getIssuedState();

            // apply processing to image depending on state of issue
            const
                enhancedImage = await (await ImageProcessor.enhanceStateIdImage(image, _stateOfIssue)).toBuffer(),

                enhancedImageText = await this.imageWorker.parseImageToText(enhancedImage);

            const
                { isLegalAge, scannedDOB } = new IdCardReader(enhancedImageText).isLegalAge();

            return {
                isLegalAge,
                scannedDOB
            };

        } catch (error: any) {
            console.error(error);
            throw new Error(error.message)
        }
    }
}

const imageDAO = new ImageDAO(worker);
export default imageDAO;