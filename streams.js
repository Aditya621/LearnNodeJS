const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  //Solution 1: get whole data and send it to server
  //   fs.readFile(
  //     `${__dirname}/how-node-js-work/starter/test-file.txt`,
  //     (err, data) => {
  //       console.log('read file');
  //       if (err) console.log(err);
  //       res.end(data);
  //     }
  //   );
  // Solution 2: Streams => Read and write data in chunk
  // problem = read the file from the disk is much much faster than send resilt with respnse writable stream over the network
  // back pressure = when respnse is very low compare to receiving data from file
  //   const readableStream = fs.createReadStream(
  //     `${__dirname}/how-node-js-work/starter/test-file.txt`
  //   );

  //   readableStream.on('data', (chunk) => {
  //     res.write(chunk);
  //   });

  //   readableStream.on('end', () => {
  //     res.end();
  //   });

  //   readableStream.on('error', (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end('file is not found');
  //   });

  // /Solution 3: Pipe
  const readableStream = fs.createReadStream(
    `${__dirname}/how-node-js-work/starter/test-file.txt`
  );
  readableStream.pipe(res);
  //readableSource.pipe(writeabeDest);
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening...');
});
