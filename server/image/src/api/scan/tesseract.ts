import { createWorker, Worker } from "tesseract.js";

class ImageWorker {
  imageWorker: Worker
    
  constructor(imageWorker) {
    this.imageWorker = imageWorker;
  }

  async buildImageWorker() {
    await this.imageWorker.load();
    await this.imageWorker.loadLanguage("eng");
    await this.imageWorker.initialize("eng");
  }

  async closeImageWorker() {
    await this.imageWorker.terminate();
  }

  async parseImageToText(imgUri:string): Promise<string> {
    try {
      console.log('image worker is parsing image to text: ', imgUri)
      const { data } = await this.imageWorker.recognize(imgUri);
      return data.text
    } catch (error) {
      console.error(error);
      throw new Error("the uri is not a supported image");
    }
  }
}

const imageParseWorker = createWorker({
  // logger: (m) => console.log(m),
});
const imageWorker = new ImageWorker(imageParseWorker);
imageWorker.buildImageWorker();

export default imageWorker;