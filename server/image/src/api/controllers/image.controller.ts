import { ImageFile, ImagePaths } from 'types/image-types';
import ImageDAO from '../data-access/imageDAO';
/* =================================
ImageController - controller class for Image Uploading, and Processing

members:
verifyIdentificationAWS
verifyIdentificationImageFromUpload
verifyIdentificationImageFromUri
================================= */
export default class ImageController {
  // IMPROVEMENTS: set a size limit for the images, and a file type limit, and a number of images limit

  /**
   * Read image text using AWS Rekognition, upload images to object storage, and return the result of legalAge of identification
   * @param req 
   * @param res 
   * @returns 
   */
  static async verifyIdentificationAWS(req, res) {
    try {

      const
        images: ImageFile[] = req.files;

      if (images) {
        const
          idFrontImage = images.find(image => image.fieldname === 'idFrontImage');

        const
          _verified = await ImageDAO.verifyIdentificationImage(idFrontImage.buffer),
          _uploaded: ImagePaths = await ImageDAO.uploadToS3({ files: images, bucket: process.env.ID_VERIFY_BUCKET });

        return res.status(200).json({
          success: true,
          result: {
            isLegalAge: _verified.isLegalAge,
            scannedDOB: _verified.scannedDOB,
            idVerified: !!_verified
          },
          images: _uploaded,
          isUploaded: true,
        });
      }
      else
        throw new Error("The server didn't receive images. Please try again.")
    } catch (error: any) {
      console.error(error);
      res.status(200).json({
        success: false,
        error: error.message,
      });
    }
  }
}

