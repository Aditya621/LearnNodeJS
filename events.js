const EventEmitter = require('events');

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
