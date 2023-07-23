import { ImageFile, ImagePaths } from 'types/image-types';
import ImageDAO from '../data-access/imageDAO';
import pyWorker from '../scan/py-worker';

/* =================================
ImageController - controller class for Image Uploading, and Processing

members:
verifyIdentificationImageFromUpload

================================= */
export default class ImageController {
  // IMPROVEMENTS: set a size limit for the images, and a file type limit, and a number of images limit
  static async verifyIdentificationImageFromUpload(req, res) {
    try {
      const images: ImageFile[] = req.files;
      console.info('images', images);

      if (images) {
        const idFrontImage = images.find(
          (image) => image.fieldname === 'idFrontImage'
        );

        const _verified = await ImageDAO.checkIdForLegalAge(
            idFrontImage.buffer
          ),
          _uploaded: ImagePaths = await ImageDAO.uploadToS3({
            files: images,
            bucket: process.env.ID_VERIFY_BUCKET,
          });

        return res.status(200).json({
          success: true,
          result: {
            isLegalAge: _verified.isLegalAge,
            scannedDOB: _verified.scannedDOB,
            idVerified: !!_verified,
          },
          images: _uploaded,
          isUploaded: true,
        });
      } else
        throw new Error("The server didn't receive images. Please try again.");
    } catch (error: any) {
      console.error(error);
      res.status(200).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async verifyIdentificationImageFromUri(req, res) {
    try {
      let { imgUri } = req.body;

      if (imgUri) {
        const _verified = await ImageDAO.checkIdForLegalAge(imgUri);

        return res.status(200).json({
          success: true,
          result: {
            isLegalAge: _verified.isLegalAge,
            scannedDOB: _verified.scannedDOB,
            idVerified: !!_verified,
          },
          images: [imgUri],
          isUploaded: false,
        });
      }
    } catch (error: any) {
      console.info(error);
      res.status(500).json(error.message);
    }
  }

  static async testOcr(req, res) {
    try {
      const images: ImageFile[] = req.files;

      if (images) {
        const idFrontImage = images.find(
          (image) => image.fieldname === 'idFrontImage'
        );

        const _result = await pyWorker.parseImageToText(idFrontImage.buffer);

        return res.status(200).json({
          success: true,
          result: _result,
        });
      } else
        throw new Error("The server didn't receive images. Please try again.");
    } catch (error: any) {
      console.info(error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async testPy(req, res) {
    try {
      const result = await pyWorker.testPy();
      return res.status(200).json({
        success: true,
        result,
      });
    } catch (error: any) {
      console.info(error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}
