import { spawn } from "child_process";

class ImageWorker {

    /**
     * detects text from image
     * @param image 
     * @returns 
     */
    // async parseImageToText(image: ImageLike): Promise<string> {
    async parseImageToText() {
        try {
            // const ocr = spawn('python3', ['src/py/ocr/test.py', image]);
            const ocr = spawn('python3', ['test.py']);

            ocr.stdout.on('data', (data) => {
                console.log(`Python script output: ${data}`);
            });

            ocr.stderr.on('data', (data) => {
                console.error(`Python script error: ${data}`);
            });

            ocr.on('close', (code) => {
                console.log(`Python script exited with code ${code}`);
            });

        } catch (error) {
            console.error('Image Worker parseImageToText: ', error);
            throw new Error(error.message);
        }
    }
}

const imageWorker = new ImageWorker();

export default imageWorker;