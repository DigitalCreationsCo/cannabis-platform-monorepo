import { spawn } from "child_process";
import { once } from "events";
import { ImageLike } from "tesseract.js";

class ImageWorker {

    /**
     * detects text from image
     * @param image 
     * @returns 
     */
    async parseImageToText(image: ImageLike): Promise<string> {
        try {

            let result: string;
            // const ocr = spawn('python3', ['src/py/ocr/test.py', image]);
            const ocr = spawn('python3', ['src/ocr/ocr.py']);

            ocr.stdout.on('data', (data) => {
                process.send(data.toString());
            })

            ocr.stderr.on('data', (data) => {
                console.error(`ocr script error: ${data}`);
            });

            ocr.on('close', (code) => {
                console.log(`ocr script exited with code ${code}`);
            });
            return result;
        } catch (error) {
            console.error('Py Worker parseImageToText: ', error);
            throw new Error(error.message);
        }
    }

    async testPy(): Promise<string> {
        try {
            const py = spawn('python3', ['src/ocr/test.py']);

            let result: string = "";
            py.stdout.on('data', async (data) => {
                result += await data.toString();
                console.debug('data was generated: ', result);
            });

            py.stderr.on('data', (error) => {
                console.error(`testPy script error: ${error}`);
                throw new Error(error.message);
            });

            py.on('close', (code) => {
                console.debug('testPy exited with result: ', result);
                console.log(`testPy exited with code ${code}`);
            });

            await once(py, 'close');
            return result;
        } catch (error) {
            console.error('Py Worker testPy: ', error);
            throw new Error(error.message);
        }
    }
}

const imageWorker = new ImageWorker();

export default imageWorker;