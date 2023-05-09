import { PutObjectCommand } from '@aws-sdk/client-s3';
// import { createId } from '@paralleldrive/cuid2';
import s3Client from '../../s3/verifyIdClient';
import ImageDAO from '../data-access/imageDAO';
/* =================================
ImageController - controller class for Image Uploading, and Processing

members:
verifyIdentificationImageFromUpload

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
          
          let uploadedImages
          let isLegalAge
          let idVerified
          
          if (images) {
            uploadedImages = await uploadImageToS3ObjectStore(images, process.env.VERIFY_ID_BUCKET_NAME)
            console.log('uploadedImages: ', uploadedImages)
            // const imgUri = getObjectStorageUri(uploadedImages['idFrontImage'], process.env.VERIFY_ID_BUCKET_NAME, process.env.OBJECT_STORAGE_REGION)

            // console.log('imgUri: ', imgUri)
            // isLegalAge = await checkLegalAgeFromIdImage(imgUri)
            // idVerified = true

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

async function uploadImageToS3ObjectStore(files: any[], bucketName: string)
// : Record<string, string> 
: Promise<void>
{
  try {
    
    await Promise.all(
      files.map(async (file) => {
        console.log('file: ', file)
        
        const fileBuffer = await file.buffer
        console.log('fileBuffer: ', fileBuffer)

        const putObjectCommand = new PutObjectCommand({
          Bucket: bucketName,
          Key: file.fieldname,
          Body: fileBuffer,
          ContentType: file.mimetype,
        });

        await s3Client.send(putObjectCommand);
      })

    );
    // let uploadKeys = {}
    
    // const uploadPromise = files.map(async (file) => {
    //   return new Promise(async (resolve, reject) => {
    //     const extension = getExtensionFromMimeType(file.mimetype);
    //     // const key = `${createId()}-${file.fieldname}${extension}`;
    //     const key = `${file.fieldname}${extension}`;
        
    //     const putObjectCommand = new PutObjectCommand({
    //       // ContentType: object.mimetype,
    //       // ContentEncoding: object.encoding,
    //       ACL: "public-read",
    //       Body: file.buffer,
    //       Bucket: bucketName,
    //       Key: key
    //     })

    //     resolve({ ...await s3Client.send(putObjectCommand), key })
        
    //   }).then(async(upload: PutObjectCommandOutput & {key: string}) => {
    //     console.log('upload: ', upload)
    //     Object.assign(uploadKeys, { [file.fieldname]: upload.key });
    //   }).catch((error) => {
    //     console.error('Error uploading image to object storage: ', error)
    //     throw new Error('Error uploading image to object storage.')
    //   })
    // });
    
    // await Promise.all(uploadPromise);
    
    // return uploadKeys;
    
  } catch (error: any) {
    console.error(error)
    throw new Error(error.message)
  }
}