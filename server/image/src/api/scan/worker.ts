import { createWorker, ImageLike, Worker } from "tesseract.js";
import { Input } from "../scan/processor";

class ImageWorker {
  imageWorker: Worker

  constructor(imageWorker) {
    this.imageWorker = imageWorker;
  }

  async buildImageWorker() {
    await this.imageWorker.load();
    await this.imageWorker.loadLanguage("eng");
    await this.imageWorker.initialize("eng");
    await this.imageWorker.setParameters({
      user_defined_dpi: "70",
    })
  }

  async closeImageWorker() {
    await this.imageWorker.terminate();
  }

  /**
   * detects image properties, and processes the image to correct for best results
   * @param image
   */
  async detectAndCorrectImage(image: ImageLike & Input) {
    try {
      const
        detectData = await this.imageWorker.detect(image);
      console.info(' detected image data: ', detectData);
      console.info(' applying image corrections..');

      // if needed, use image processor to rotate image and apply corrections
      return image;
    } catch (error) {
      console.error('Image Worker: detectAndCorrectImage: ', error);
      throw new Error("The image is not supported.");
    }
  }

  /**
   * detects text from image
   * @param image 
   * @returns 
   */
  async parseImageToText(image: ImageLike): Promise<string> {
    try {
      const
        result = await this.imageWorker.recognize(image);
      return result.data.text
    } catch (error) {
      console.error('Image Worker parseImageToText: ', error);
      throw new Error("The image is not supported.");
    }
  }
}

const imageParseWorker = createWorker({
  // logger: (m) => console.info(m),
});
const imageWorker = new ImageWorker(imageParseWorker);
imageWorker.buildImageWorker();

export default imageWorker;