import { createWorker, ImageLike, Worker } from "tesseract.js";

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

  async detectAndCorrectImage(image: ImageLike) {
    try {

      const
        result = await this.imageWorker.detect(image);

      console.info('Detecting image correction');
      // rotate image if needed, return image
      // use image processor to rotate image and adjust image quality

    } catch (error) {
      console.error('Image Worker: detect error: ', error);
      throw new Error("the uri is not a supported image");
    }
  }

  async parseImageToText(image: ImageLike) {
    try {
      const
        result = await this.imageWorker.recognize(image);
      console.info('text: ', result.data.text);

      return result.data.text
    } catch (error) {
      console.error('Image Worker: parse image error: ', error);
      throw new Error("the uri is not a supported image");
    }
  }
}

const imageParseWorker = createWorker({
  // logger: (m) => console.info(m),
});
const imageWorker = new ImageWorker(imageParseWorker);
imageWorker.buildImageWorker();

export default imageWorker;