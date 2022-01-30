const ws = require('ws');

const wss = new ws.Server({
    port: 3001,
}, () => console.log('started websocket server on 3001'));


wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':
                broadcastMessage(message);
                break;
            case 'connection':
                broadcastMessage(message);
                break;
        }
    });
});

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    });
}