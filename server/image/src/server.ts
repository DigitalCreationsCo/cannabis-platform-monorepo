import cors from 'cors';
import express from 'express';
import http from 'http';
import multer from 'multer';
import { imageCtrl } from './api/controllers';

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

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.post("/api/v1/image/scan-identification-upload", upload.any(), imageCtrl.verifyIdentificationImageFromUpload);

app.post("/api/v1/image/scan-identification-uri", imageCtrl.verifyIdentificationImageFromUri);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).send(err.message)
})

app.use('*', (req, res) => res.status(404).json({ error: 'API not found' }));

const server = http.createServer(app);
export default server;