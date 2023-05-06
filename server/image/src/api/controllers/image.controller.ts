import { PutObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { createId } from '@paralleldrive/cuid2';
import s3Client from '../../s3/verifyIdClient';
/* =================================
ImageController - controller class for Image Uploading, and Processing

members:
verifyIdentificationImage

================================= */
export default class AccountController {

    static async verifyIdentificationImage(req, res) {
        try {
          const images = req.files

          let uploaded
          if (images) {
            uploaded = await uploadImageToS3ObjectStore(images, process.env.VERIFY_ID_BUCKET_NAME)
          }
          // if (imgUri) text = await ImageDAO.getDobFromIdentificationImage(imgUri);
          // console.log("successfully parsed text from image: ", text);
          // // format text here, get date of birth
          // // may need a class to get fields from ids, or handle formats in different states/ countries
          // let imageDob = "text";
    
          // // check id image text against date of birth from user input
          // // also check imageDob against computed time
          // // formatting needs to be the same
    
          // // let { dob } = user;
          // // if (dob === imageDob) {
          // // flag isDobVerified = true in database
          // res.status(200).json({
          //   success: true,
          //   // , text
          // });
          // // }
          res.status(200).json({
              success: true, 
              uploaded
          })
        } catch (error) {
          console.log(error);
          res.status(500).json({ error });
        }
    }
}

async function uploadImageToS3ObjectStore(body: any[], bucketName: string): Promise<Record<string, string>> {
  try {
    let uploadKeys = {}
    
    const uploadPromise = body.map(async (object) => new Promise(async (resolve, reject) => {
      const key = `${createId()}-${object.fieldname}`;

      const putObjectCommand = new PutObjectCommand({
        ACL: "public-read",
        Body: object.buffer,
        Bucket: bucketName,
        Key: key
      })

      resolve({ ...s3Client.send(putObjectCommand), key })
      console.info(`Uploaded ${key} to ${bucketName}`);
      
    }).then(async(upload: PutObjectCommandOutput & {key: string}) => {
      Object.assign(uploadKeys, { [object.fieldname]: upload.key });
    }));
    await Promise.allSettled(uploadPromise);

    return uploadKeys;
    
  } catch (error: any) {
    throw new Error(error.message)
  }
}