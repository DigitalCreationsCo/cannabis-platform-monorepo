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
      console.log('parse this uri: ', imgUri)
      const { data } = await this.imageWorker.recognize('https://gras-verify.us-east-1.linodeobjects.com/zd6zduk85aiwnwj0wnadihw6-idFrontImage.png');
      console.log('it worked')
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