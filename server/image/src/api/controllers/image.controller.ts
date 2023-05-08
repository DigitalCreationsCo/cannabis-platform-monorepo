import { PutObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { createId } from '@paralleldrive/cuid2';
import s3Client from '../../s3/verifyIdClient';
import ImageDAO from '../data-access/imageDAO';
/* =================================
ImageController - controller class for Image Uploading, and Processing

members:
verifyIdentificationImage

================================= */
export default class AccountController {
  
  // IMPROVEMENTS: set a size limit for the images, and a file type limit, and a number of images limit

  // verify Identification could be one function, I keep as two for now, for easier testing, and to not break it. ;P
    static async verifyIdentificationImageFromUpload(req, res): Promise<{
      success: boolean,
      result: { isLegalAge: boolean, idVerified: boolean },
      images: Record<string, string>
    }> {
        try {
          let images = req.files
          if (!Array.isArray(images)) images = Object.entries(images).flat()
          console.log('images: ', images)
          let uploadedImages
          let isLegalAge
          let idVerified
          
          if (images) {
            uploadedImages = await uploadImageToS3ObjectStore(images, process.env.VERIFY_ID_BUCKET_NAME)
            console.log('uploadedImages: ', uploadedImages)
            const imgUri = getObjectStorageUri(uploadedImages['idFrontImage'], process.env.VERIFY_ID_BUCKET_NAME, process.env.OBJECT_STORAGE_REGION)
            isLegalAge = await checkLegalAgeFromIdImage(imgUri)
            idVerified = true

          } else {
            throw new Error("No images uploaded")
          }
          return res.status(200).json({
              success: true,
              result: { isLegalAge, idVerified },
              images: uploadedImages
          })
        } catch (error:any) {
          console.log(error);
          res.status(500).json(error.message);
        }
    }

    static async verifyIdentificationImageFromUri(req, res): Promise<{
      success: boolean,
      result: { isLegalAge: boolean, idVerified: boolean },
      images: number
    }> {
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
        })
        } catch (error: any) {
          console.log(error);
          res.status(500).json(error.message);
        }
    }
}


function getObjectStorageUri (key: string, bucketName: string, region: string, ) { return `https://${bucketName}.${region}.linodeobjects.com/${key}`; }

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

async function uploadImageToS3ObjectStore(body: any[], bucketName: string): Promise<Record<string, string>> {
  try {
    let uploadKeys = {}
    
    const uploadPromise = body.map(async (object) => new Promise(async (resolve, reject) => {

      console.log('object: ', object)
      const extension = getExtensionFromMimeType(object.mimetype);

      const key = `${createId()}-${object.fieldname}${extension}`;
      console.log('key: ', key)
      const putObjectCommand = new PutObjectCommand({
        ContentType: object.mimetype,
        ACL: "public-read",
        Body: object.buffer,
        Bucket: bucketName,
        Key: key
      })

      console.log('putObjectCommand: ', putObjectCommand)
      const upload = await s3Client.send(putObjectCommand)
      resolve({ ...upload, key })
      console.info(`Uploaded ${key} to ${bucketName}`);
      
    }).then(async(upload: PutObjectCommandOutput & {key: string}) => {
      Object.assign(uploadKeys, { [object.fieldname]: upload.key });
    }).catch((error) => {
      console.error('Error uploading image to object storage: ', error)
      throw new Error('Error uploading image to object storage.')
    }))
    await Promise.allSettled(uploadPromise);

    return uploadKeys;
    
  } catch (error: any) {
    throw new Error(error.message)
  }
}