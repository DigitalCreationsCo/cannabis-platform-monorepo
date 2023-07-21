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
            const ocr = spawn('python3', ['src/ocr/ocr.py']);

            ocr.stdout.on('data', (data) => {
                console.log(`ocr script output: ${data}`);
            });

            ocr.stderr.on('data', (data) => {
                console.error(`ocr script error: ${data}`);
            });

            ocr.on('close', (code) => {
                console.log(`ocr script exited with code ${code}`);
            });

        } catch (error) {
            console.error('Py Worker parseImageToText: ', error);
            throw new Error(error.message);
        }
    }

    async testPy() {
        try {
            const pythonScript = spawn('python3', ['src/ocr/test.py']);

            pythonScript.stdout.on('data', (data) => {
                console.log(`testPy script output: ${data}`);
            });

            pythonScript.stderr.on('data', (data) => {
                console.error(`testPy script error: ${data}`);
            });

            pythonScript.on('close', (code) => {
                console.log(`testPy script exited with code ${code}`);
            });

        } catch (error) {
            console.error('Py Worker testPy: ', error);
            throw new Error(error.message);
        }
    }
}

const imageWorker = new ImageWorker();

export default imageWorker;