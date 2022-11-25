const EventEmitter = require('events');
const http = require('http');

const myEmitter = new EventEmitter();

//registered an event
myEmitter.on('event', () => {
  console.log('event Listener');
});

myEmitter.on('event', (size) => {
  console.log(`Event is held with size = ${size}`);
});

myEmitter.on('event', (size) => {
  setImmediate(() =>
    console.log(`Asynchronous event is done with size = ${size}`)
  );
});

// myEmitter.emit('event');
myEmitter.emit('event', 9);

// create a web server

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('request received');
  res.end('Request Received');
});

server.on('request', (req, res) => {
  console.log('another request received');
  //   res.end('Another Request Received 😁');
});

server.on('close', () => {
  console.log('Server closed');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for request ...');
});
