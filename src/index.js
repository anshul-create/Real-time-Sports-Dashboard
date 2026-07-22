import express from "express";
import http from 'http';
import { matchRouter } from "../routes/matches.js";
import { attachWebscoket } from "./ws/server.js";


const app = express();
const PORT = Number(process.env.PORT || 8000);
const HOST = Number(process.env.HOST || '0.0.0.0');

app.use(express.json());
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.use('/matches', matchRouter);

const {broadcastMatchCreated} = attachWebscoket(server);
app.locals.broadcastMatchCreated = broadcastMatchCreated;

server.listen(PORT,HOST, () => {
    const baseUrl = HOST === '0.0.0.0' ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;

    console.log(`Server running on ${baseUrl}`);
    console.log(`WebSocket is running on ${baseUrl.replace('http', 'ws')}/ws`);

})