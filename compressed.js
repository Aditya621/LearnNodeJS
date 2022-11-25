const fs = require('fs');
const zlib = require('zlib');

fs.createReadStream(`${__dirname}/how-node-js-work/starter/test-file.txt`)
  .pipe(zlib.createGzip())
  .pipe(
    fs.createWriteStream(
      `${__dirname}/how-node-js-work/starter/test-file.txt.gz`
    )
  );

console.log('file commpressed');
