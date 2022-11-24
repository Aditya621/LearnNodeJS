const fs = require('fs');

setTimeout(() => {
  console.log('timer  1 finished');
}, 0);

setImmediate(() => console.log('timer  2 finished'));

fs.readFile(`${__dirname}/how-node-js-work/starter/test-file`, () => {
  console.log('read file');

  setTimeout(() => {
    console.log('timer  1 finished');
  }, 0);

  setTimeout(() => {
    console.log('timer  2 finished');
  }, 3000);

  setImmediate(() => {
    console.log('timer 3 finished');
  });

  process.nextTick(() => {
    console.log('process.nextTick');
  });
});
