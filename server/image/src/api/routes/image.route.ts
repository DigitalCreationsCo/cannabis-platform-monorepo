import { Router } from 'express';
import { imageCtrl } from '../controllers';

const router = Router();
/* =================================
API Routes for Image Uploading, and Processing

POST    "/scan-identification-uri"      verifyIdentificationImageFromUri

POST    '/upload'                   uploadImage

================================= */
router.route("/scan-identification-uri").post(imageCtrl.verifyIdentificationImageFromUri);

// router.route("/upload").post(imageCtrl.uploadImage);

export default router;
