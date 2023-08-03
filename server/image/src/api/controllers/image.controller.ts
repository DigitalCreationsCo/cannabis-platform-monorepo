import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createId } from '@paralleldrive/cuid2';
// import s3Client from '../../s3/verifyIdClient';
import ImageDAO from '../data-access/imageDAO';
/* =================================
ImageController - controller class for Image Uploading, and Processing

members:
verifyIdentificationImageFromUpload

================================= */
export default class ImageController {

  // IMPROVEMENTS: set a size limit for the images, and a file type limit, and a number of images limit

  // verify Identification could be one function, I keep as two for now, for easier testing, and to not break it. ;P
  static async verifyIdentificationImageFromUpload(req, res) {
    try {

      let
        uploadedImages: ImagePaths,
        isUploaded = false;

      const
        images: File[] = req.files;
      console.info('images uploaded: ', images);

      if (images) {
        const
          idFrontImage = images.find(image => image.fieldname === 'idFrontImage');

        const
          { isLegalAge, scannedDOB } = await ImageDAO.checkLegalAgeFromIdImage(idFrontImage.buffer);

        uploadedImages = await uploadImageToS3ObjectStore(images, process.env.ID_VERIFY_BUCKET);
        isUploaded = true;


        return res.status(200).json({
          success: true,
          result: {
            isLegalAge,
            scannedDOB,
            idVerified: true
          },
          images: uploadedImages,
          isUploaded,
        });
      }
      else
        throw new Error("The server didn't receive images. Please try again.")
    } catch (error: any) {
      console.info('Sorry, we could not verify the image. Please upload a different image.')
      console.info(error);
      res.status(200).json({
        success: false,
        message: error.message,
        error: error.message,
      });
    }
  }

  static async verifyIdentificationImageFromUri(req, res) {
    try {
      let { imgUri } = req.body

      let isLegalAge
      let idVerified

      if (imgUri) {
        isLegalAge = await ImageDAO.checkLegalAgeFromIdImage(imgUri)
        idVerified = true
      }
      return res.status(200).json({
        success: true,
        result: { isLegalAge, idVerified },
        images: [imgUri]
      });
    } catch (error: any) {
      console.info(error);
      res.status(500).json(error.message);
    }
  }
}

function getObjectStorageUri(key: string, bucketName: string, region: string,) {
  const uri = `https://${bucketName}.${region}.linodeobjects.com/${key}`;
  console.info('create object storage uri: ', uri)
  return uri;
}

function getExtensionFromMimeType(mimeType: string) {
  const extensionMap = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/bmp': '.bmp'
  };
  return extensionMap[mimeType] || '';
}

async function uploadImageToS3ObjectStore(files: any[], bucketName: string): Promise<ImagePaths> {
  // IMPROVEMENTS: not awaiting the s3 response, may need to do it to check for upload errors
  try {
    const s3Client = new S3Client({
      endpoint: `https://${process.env.OBJECT_STORAGE_ENDPOINT}`,
      region: process.env.OBJECT_STORAGE_REGION,
      credentials: {
        accessKeyId: process.env.ID_VERIFY_KEY,
        secretAccessKey: process.env.ID_VERIFY_SEC,
      },
    });

    let uploadedFiles = {}
    await Promise.all(files.map(async (file): Promise<ImagePaths> => {

      const fileBuffer = await file.buffer
      const fileExtension = getExtensionFromMimeType(file.mimetype);
      const key = `${createId()}-${file.fieldname}${fileExtension}`
      const putObjectCommand = new PutObjectCommand({
        Bucket: bucketName,
        ACL: "authenticated-read",
        Key: key,
        Body: fileBuffer,
        ContentType: file.mimetype,
      });

      console.info('uploading to s3 object storage..')

      // NOT AWAITING THE RESPONSE, MAY NEED TO DO IT TO CHECK FOR UPLOAD ERRORS
      s3Client.send(putObjectCommand);

      console.info(`Uploaded ${key} to ${bucketName}/${key}`)
      return { [file.fieldname]: getObjectStorageUri(key, bucketName, process.env.OBJECT_STORAGE_REGION) };

    })
    ).then(
      _uploadedFiles => {
        _uploadedFiles.forEach(file => Object.assign(uploadedFiles, file))
      })

    return uploadedFiles

  } catch (error: any) {
    console.error(error)
    throw new Error(error.message)
  }
}

type ImagePaths = Record<string, string>

type File = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}