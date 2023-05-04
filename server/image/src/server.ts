import cors from 'cors';
import express from 'express';
import http from 'http';
import multer from 'multer';
import { imageCtrl } from './api/controllers';

const upload = multer();

const app = express();

app.use(cors());

app.post("/api/v1/image/scan-identification", upload.any(), imageCtrl.verifyIdentificationImage);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).send(err.message)
})

app.use('*', (req, res) => res.status(404).json({ error: 'API not found' }));

const server = http.createServer(app);
export default server;