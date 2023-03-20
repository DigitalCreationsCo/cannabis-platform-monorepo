import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import paymentRoutes from "./api/routes/payment.route";

const app = express();
app.use(
    cors()
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/healthcheck', (req, res) => {
    return res.status(200).json('OK');
});

app.use("/api/v1/payment", paymentRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // if (err.message === 'Invalid password') {
    //     return res.status(401).send(err.message)
    // }
    res.status(500).send(err.message)
})

app.use('*', (req, res) => res.status(404).json({ error: 'API not found' }));

const server = http.createServer(app);
export default server;