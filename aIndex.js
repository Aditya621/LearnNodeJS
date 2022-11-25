const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/Asynchronous/dog.txt`, (err, data) => {
  console.log(`Breed : ${data}`);

  // this is doing HTTP request
  // This is CallBack Hell
  //   superagent
  // .get(`https://dog.ceo/api/breed/${data}/images/random`)
  // .end((err, res) => {
  //   if (err) {
  //     return console.log(err.message);
  //   }
  //   console.log(res.body.message);
  //   // now store that image into another file
  //   fs.writeFile(
  //     `${__dirname}/Asynchronous/dog-img.txt`,
  //     res.body.message,
  //     (err) => {
  //       console.log('Random Dog Image Save To File');
  //     }
  //   );
  // });

  // Resolve Call Back Hell with Promises
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile(
        `${__dirname}/Asynchronous/dog-img.txt`,
        res.body.message,
        (err) => {
          if (err) return console.log('File Not Modified');

          console.log('Random Dog Image Save To File');
        }
      );
    })
    .catch((err) => {
      console.log(err.message);
    });
});
