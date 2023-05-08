import IdCardReader from "../scan/cardReader";
import { default as worker } from "../scan/tesseract";

class ImageDAO {
    
    imageWorker: typeof worker
    constructor(imageWorker) {
        this.imageWorker = imageWorker;
    }
    
    async checkLegalAgeFromIdImage(imgUri): Promise<boolean>{

        // IMPROVEMENTS: this function checks the users state from the uploaded Id Image,
        // in the future, we should check the users state from the users address to confirm the legal age, 
        // and then check the users age from the users record dob
        try {
            console.log('image DAO: imgUri: ', imgUri)
            const text = await this.imageWorker.parseImageToText(imgUri);
            console.log('text: ', text)
            const cardReader = new IdCardReader(text)
            const _isLegalAge = cardReader.isLegalAge()
            return _isLegalAge;
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message)
        }
    }
}

const imageDAO = new ImageDAO(worker);
export default imageDAO;