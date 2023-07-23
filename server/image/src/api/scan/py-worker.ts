import { spawn } from 'child_process';
import { once } from 'events';

class ImageWorker {
  /**
   * detects text from image
   * @param image
   * @returns
   */
  async parseImageToText(image: Buffer): Promise<string> {
    try {
      let data = image.toString('binary'),
        result: string;

      const ocr = spawn('python3', ['src/ocr/ocr.py', data]);

      ocr.stdout.on('data', (data) => {
        result += data.toString();
        console.debug('data was generated: ', result);
      });

      ocr.stderr.on('data', (error) => {
        console.error(`ocr script error: ${error}`);
        throw new Error(error.message);
      });

      ocr.on('close', (code) => {
        console.info('ocr script exited with result: ', result);
        console.log(`ocr script exited with code ${code}`);
      });

      await once(ocr, 'close');
      return result;
    } catch (error) {
      console.error('Py Worker parseImageToText: ', error);
      throw new Error(error.message);
    }
  }

  async testPy(): Promise<string> {
    try {
      const py = spawn('python3', ['src/ocr/test.py']);

      let result: string = '';

      py.stdout.on('data', async (data) => {
        result += await data.toString();
        console.debug('data was generated: ', result);
      });

      py.stderr.on('data', (error) => {
        console.error(`testPy script error: ${error}`);
        throw new Error(error.message);
      });

      py.on('close', (code) => {
        console.info('testPy exited with result: ', result);
        console.info(`testPy exited with code ${code}`);
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
