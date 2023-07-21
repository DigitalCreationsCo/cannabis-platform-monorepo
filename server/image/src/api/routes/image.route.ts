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

router.route("/scan-identification-uri").post(imageCtrl.verifyIdentificationImageFromUri);

router.route("/scan-identification-upload").post(upload.any(), imageCtrl.verifyIdentificationImageFromUpload);

router.route('/test-ocr').get(imageCtrl.testOcr);

export default router;

