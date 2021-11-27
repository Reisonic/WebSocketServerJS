const WebSocket = require('ws');
const wsServer = new WebSocket.WebSocketServer({ port: 9000 });

wsServer.on('connection', onConnect);

function onConnect(wsClient) {

    console.log('User connect');

    let message = {
      message: 'Join in',
      user: 'System',
      system: true
    };

    let json = JSON.stringify(message);

    wsClient.send(json);
    
    console.log(wsServer.clients);

    wsClient.on('close', function() {
        console.log('User disconnect');
    });

    wsClient.on('message', function(messageParse) {
        console.log(messageParse);
        try {
            const jsonMessage = JSON.parse(messageParse);
            console.log(jsonMessage);
            console.log(jsonMessage.message);
            console.log(jsonMessage.user);
            let messageResponse = {
              message: jsonMessage.message,
              user: jsonMessage.user,
              system: false
            };
            let jsonResponse = JSON.stringify(messageResponse);
            wsServer.clients.forEach(function each(client) {
                client.send(jsonResponse);
            });
        } catch (error) {
            console.log('Error', error);
        }
    });
}

console.log('Server start on 9000 port');
