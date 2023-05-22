import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { accountRoutes, paymentRoutes } from './api/routes';
import StripeService from './api/stripe';

const app = express();
app.use(
    cors()
);

app.post('/webhook', express.raw({type: '*/*'}), async (req, res) => {
    
    const 
    payload = req.body

    const
    sig = req.headers['stripe-signature'];

    try {

        let event;

        event = 
        StripeService.constructStripeEvent(payload, sig);
        
        await 
        StripeService.handleWebhookEvents(event);

        res.status(200).end();
    } catch (error: any) {
        console.error('stripe weebook error: ', error.message);
        return res.status(400).json({ error: `Webhook Error: ${error.message}` });
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/healthcheck', (req, res) => {
    return res.status(200).json('OK');
});

app.use("/api/v1/payment", paymentRoutes);

app.use("/api/v1/accounts", accountRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).send(err.message)
})

app.use('*', (req, res) => res.status(404).json({ error: 'API not found' }));

const server = http.createServer(app);
export default server;