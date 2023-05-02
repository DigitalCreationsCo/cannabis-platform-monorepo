import ImageDAO from '../data-access';

/* =================================
ImageController - controller class for Image Uploading, and Processing

members:
verifyIdentificationImage

================================= */
export default class AccountController {

    static async verifyIdentificationImage(req, res) {
        try {
          let { imgUri } = req.body;
          let text;

          if (imgUri) text = await ImageDAO.getDobFromIdentificationImage(imgUri);
          console.log("successfully parsed text from image: ", text);
          // format text here, get date of birth
          // may need a class to get fields from ids, or handle formats in different states/ countries
          let imageDob = "text";
    
          // check id image text against date of birth from user input
          // also check imageDob against computed time
          // formatting needs to be the same
    
          // let { dob } = user;
          // if (dob === imageDob) {
          // flag isDobVerified = true in database
          res.status(200).json({
            success: true,
            // , text
          });
          // }
        } catch (error) {
          console.log(error);
          res.status(500).json({ error });
        }
    }
}
