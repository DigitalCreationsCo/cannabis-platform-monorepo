import { Router } from 'express';
import multer from 'multer';
import { imageCtrl } from '../controllers';

const router = Router();
/* =================================
API Routes for Image Uploading, and Processing

POST    "/scan-identification-uri"      verifyIdentificationImageFromUri

POST    "/scan-identification-upload"   uploadImage

================================= */

const upload = multer();

router.route("/scan-identification-upload").post(upload.any(), imageCtrl.verifyIdentificationAWS);

export default router;
