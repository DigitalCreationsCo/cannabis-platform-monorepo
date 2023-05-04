import { PutObjectCommand } from '@aws-sdk/client-s3';
import { createId } from '@paralleldrive/cuid2';
/* =================================
ImageController - controller class for Image Uploading, and Processing

members:
verifyIdentificationImage

================================= */
export default class AccountController {

    static async verifyIdentificationImage(req, res) {
        try {
          const images = req.files

          if (images) {
            const uploaded = uploadImageToS3ObjectStore(images, process.env.VERIFY_ID_BUCKET_NAME)
            console.log('images uploaded: ', uploaded)
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
          })
        } catch (error) {
          console.log(error);
          res.status(500).json({ error });
        }
    }
}

function uploadImageToS3ObjectStore(body: any[], bucketName: string) {
  console.log('bucketName: ', bucketName)
  console.log('process bucketname? ', process.env.VERIFY_ID_BUCKET_NAME)
  try {
    const upload = body.map(object => new PutObjectCommand({
        ACL: "public-read",
        Body: object.buffer,
        Bucket: bucketName,
        Key: `${createId()}-${object.fieldname}`
      })
    );

    console.info('upload: ', upload)

    return upload;
  } catch (error: any) {
    throw new Error(error.message)
  }
}