import { Router } from 'express';
import { imageCtrl } from '../controllers';

const router = Router();
/* =================================
API Routes for Image Uploading, and Processing

POST    '/scan-identification'      verifyIdentificationImage

POST    '/upload'                   uploadImage

================================= */
router.route("/scan-identification").post(imageCtrl.verifyIdentificationImage);

// router.route("/upload").post(imageCtrl.uploadImage);

export default router;
