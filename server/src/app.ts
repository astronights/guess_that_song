import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import * as CONFIG from "./config";
import router from './api/router';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors({ origin: "*" }));
app.use('/', router);

// Host if in config else default
const HOST = CONFIG.HOST
const PORT = parseInt(CONFIG.PORT);

const httpServer = createServer(app).listen(PORT, () => {
  console.log(`Started server at ${HOST}:${PORT}`);
});