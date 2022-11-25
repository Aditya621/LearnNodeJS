const fs = require('fs');
const superagent = require('superagent');

// make promise to read file
const readFilePro = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) reject('I Could not find that file');
      resolve(data);
    });
  });
};

const writeFilePro = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject('Could not write Data 🥲');
      resolve('success');
    });
  });
};

// now we are using async await for more readable code

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/Asynchronous/dog.txt`);
    console.log(`Breed : ${data}`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro(
      `${__dirname}/Asynchronous/dog-img.txt`,
      res.body.message
    );
    console.log('Random Dog Image Save To File');
  } catch (err) {
    console.log(err);
  }
};

getDogPic();

// this is chaining in promises
// return new promises and make chaninig
// readFilePro(`${__dirname}/Asynchronous/dog.txt`)
//   .then((data) => {
//     console.log(`Breed : ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro(
//       `${__dirname}/Asynchronous/dog-img.txt`,
//       res.body.message
//     );
//   })
//   .then(() => {
//     console.log('Random Dog Image Save To File');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// fs.readFile(`${__dirname}/Asynchronous/dog.txt`, (err, data) => {
//   console.log(`Breed : ${data}`);

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
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile(
//         `${__dirname}/Asynchronous/dog-img.txt`,
//         res.body.message,
//         (err) => {
//           if (err) return console.log('File Not Modified');

//           console.log('Random Dog Image Save To File');
//         }
//       );
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
