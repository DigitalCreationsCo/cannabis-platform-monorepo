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

  async getTextFromImage(uri) {
    try {
      let isImageUri;
      switch (true) {
        case uri.endsWith(".jpeg"):
          isImageUri = true;
        case uri.endsWith(".jpg"):
          isImageUri = true;
        case uri.endsWith(".png"):
          isImageUri = true;
        case uri.endsWith(".bmp"):
          isImageUri = true;
        case uri.endsWith(".pbm"):
          isImageUri = true;
      }
      console.log("isImage ? ", isImageUri);
      if (isImageUri) {
        const {
          data: { text },
        } = await this.imageWorker.recognize(uri);
        return { text };
      } else throw new Error("the uri is not a supported image");
    } catch (error) {
      return { error };
    }
  }
}

const imageParseWorker = createWorker({
  // logger: (m) => console.log(m),
});
const imageWorker = new ImageWorker(imageParseWorker);
imageWorker.buildImageWorker();

export default imageWorker;