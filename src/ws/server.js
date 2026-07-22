import { match } from "node:assert";
import { type } from "node:os";
import { WebSocket, WebSocketServer } from "ws";

function sendJson(socket, payload) {
  if (socket.readyState !== WebSocket.OPEN) return;

  socket.send(JSON.stringify(payload));
}

function broadCast(wss, payload) {
  for (const client of wss.clients) {
    if (client.readyState !== WebSocket.OPEN) return;

    client.send(JSON.stringify(payload));
  }
}

export function attachWebscoket(server){
    const ws = new WebSocketServer({
        server,
        path:'/ws',
        maxPayload : 1024 * 1024,
    });

    wss.on('conenction', (socket) => {
        sendJson(socket, {type : 'Welcome'});

        socket.on('error', console.error);
    });

    function broadcastMatchCreated(match){
        broadCast(wss, {type : 'match_created', data : match});

    }
    return {broadcastMatchCreated}
}