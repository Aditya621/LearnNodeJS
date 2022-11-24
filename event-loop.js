const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();

//we can also change the ThreadPool
process.env.UV_THREADPOOL_SIZE = 1;

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

  // some work with ThreadPool which is 4 byDefault in NOde JS
  //Event Loop acure only when clallback is in Asynchronous
  //like

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
  });
});
