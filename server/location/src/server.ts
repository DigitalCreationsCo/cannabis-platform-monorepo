import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { serveLocal } from './api/routes';

console.log('Starting server...');
console.log('node env: ', process.env.NODE_ENV);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/healthcheck', (req, res) => {
    return res.status(200).json('OK');
});

app.use('/api/v1/serveLocal', serveLocal);

app.use('*', (req, res) => res.status(404).json({ error: 'API not found' }));

const server = http.createServer(app);
export default server;
