import { default as worker } from "../scan/tesseract";

class ImageDAO {
    imageWorker: typeof worker
    constructor(imageWorker) {
        this.imageWorker = imageWorker;
    }
    
    async getDobFromIdentificationImage(uri) {
        try {
        const { text } = await this.imageWorker.getTextFromImage(uri);
        // save any text in db here non-blocking statement
        const dobRegex = /([DOB]+\S\s\d+)/g;
        const dobString = text.match(dobRegex).toString().split(" ")[1].split("");
        console.log("dob string: ", dobString);
        dobString[2] = "-";
        dobString[5] = "-";
        dobString.join("");
        console.log("dob string: ", dobString);

        return { 
            success: true, 
            text: text 
        };
        } catch (error) {
        return { error };
        }
    }
}

const imageDAO = new ImageDAO(worker);
export default imageDAO;