import express from 'express';
import expressWebsockets from 'express-ws';
import { Server } from '@hocuspocus/server';

// Configure hocuspocus
const server = Server.configure({
	port: 8000,
	debounce: 10000,
	maxDebounce: 30000,
});

// Setup your express instance using the express-ws extension
const { app } = expressWebsockets(express());

// A basic http route
app.get('/', (request, response) => {
	response.send('Hello World!');
});

// Add a websocket route for hocuspocus
// Note: make sure to include a parameter for the document name.
// You can set any contextual data like in the onConnect hook
// and pass it to the handleConnection method.
app.ws('/collaboration/:document', (websocket, request) => {
	server.handleConnection(websocket, request, request.params.document);
});

// Start the server
app.listen(1234, () => console.log('Listening on http://127.0.0.1:1234'));
