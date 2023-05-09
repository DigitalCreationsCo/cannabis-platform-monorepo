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
      let images = req.files
      
      let uploadedImages
      let isLegalAge
      let idVerified
      
      if (images) {
        uploadedImages = await uploadImageToS3ObjectStore(images, process.env.VERIFY_ID_BUCKET_NAME)
        
        console.log('uploadedImages: ', uploadedImages)
        const idFrontImage = getObjectStorageUri(uploadedImages['idFrontImage'], process.env.VERIFY_ID_BUCKET_NAME, process.env.OBJECT_STORAGE_REGION)

        isLegalAge = await checkLegalAgeFromIdImage(idFrontImage)
        idVerified = true
      } else {
        throw new Error("The server didn't receive images.")
      }
      return res.status(200).json({
          success: true,
          result: { isLegalAge, idVerified },
          images: uploadedImages
      });
    } catch (error:any) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }

  static async verifyIdentificationImageFromUri(req, res) {
    try {
      let { imgUri } = req.body

      let isLegalAge
      let idVerified

      if (imgUri) {
        isLegalAge = await checkLegalAgeFromIdImage(imgUri)
        idVerified = true
      }
      return res.status(200).json({
        success: true,
        result: { isLegalAge, idVerified },
        images: imgUri
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
}


function getObjectStorageUri (key: string, bucketName: string, region: string, ) { 
  const uri = `https://${bucketName}.${region}.linodeobjects.com/${key}`; 

  console.log('image uri: ', uri)
  return uri;
}

async function checkLegalAgeFromIdImage(imgUri: string): Promise<{ isLegalAge: boolean }> {
  // NEXT: Pass the images to tesseract to process  the text, and return a boolean value to database,
  // and response to front end :)
  // return idscan response, and uploaded links to front end, to add to formdata, and save in user signup :)
  try {
    const isLegalAge = await ImageDAO.checkLegalAgeFromIdImage(imgUri)
    return { isLegalAge }
  } catch (error: any) {
    console.error(error.message)
    throw new Error(error.message)
  }
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

async function uploadImageToS3ObjectStore(files: any[], bucketName: string): Promise<ImagePath> {
  // IMPROVEMENTS: not awaiting the s3 response, may need to do it to check for upload errors
  try {
    const s3Client = new S3Client({
      endpoint: `http://${process.env.OBJECT_STORAGE_ENDPOINT}`,
      region: process.env.OBJECT_STORAGE_REGION,
      credentials: {
        accessKeyId: process.env.OSTORE_KEY,
        secretAccessKey: process.env.OSTORE_SEC,
      },
    });
    
    let uploadedFiles 
    await Promise.all(files.map(async (file) => {
      
        const fileBuffer = await file.buffer
        const fileExtension = getExtensionFromMimeType(file.mimetype);
        const key = `${createId()}-${file.fieldname}${fileExtension}`
        const putObjectCommand = new PutObjectCommand({
          Bucket: bucketName,
          ACL: "public-read",
          Key: key,
          Body: fileBuffer,
          ContentType: file.mimetype,
        });

        s3Client.send(putObjectCommand);
        return { [file.fieldname]: key };
        
      })
    )
    // .then(Object.assign())
    
    return uploadedFiles

  } catch (error: any) {
    console.error(error)
    throw new Error(error.message)
  }
}

type ImagePath = Record<string, string>