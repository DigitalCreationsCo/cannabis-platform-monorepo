import cors from 'cors';
import express from 'express';
import http from 'http';
import multer from 'multer';
import Supertokens from 'supertokens-node';
import { errorHandler, middleware } from 'supertokens-node/framework/express';
import { imageCtrl } from './api/controllers';
import { backendConfig } from './config/backendConfig';

const shopDomain = process.env.NEXT_PUBLIC_SHOP_APP_URL;
const dashboardDomain = process.env.NEXT_PUBLIC_DASHBOARD_APP_URL;

if (Supertokens) {
  Supertokens.init(backendConfig());
} else throw Error('Supertokens is not available.');

const upload = multer({
  // limits: {
  //     fieldNameSize: 100,
  //     fileSize: 2000000, // 2MB
  //     fieldSize: 2000000, // 2MB
  // },
  // fileFilter: (req, file, cb) => {
  //     if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
  //         cb(null, true);
  //     } else {
  //         cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  //     }
  // }
});

const app = express();
app.use(cors({
  origin: [shopDomain, dashboardDomain],
  allowedHeaders: ['content-type', ...Supertokens.getAllCORSHeaders()],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true,
}));
app.use(middleware());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use('/api/v1/healthcheck', (_, res) => {
  return res.status(200).json({ status: 'ok', server: 'image' });
});

app.post(
  '/api/v1/image/scan-identification-upload',
  upload.any(),
  imageCtrl.verifyIdentificationImageFromUpload
);

app.post(
  '/api/v1/image/scan-identification-uri',
  imageCtrl.verifyIdentificationImageFromUri
);

app.use(errorHandler());
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).send(err.message);
  }
);
app.use('*', (req, res) => res.status(404).json({ error: 'API not found' }));

const server = http.createServer(app);
export default server;
