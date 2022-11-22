const fs = require("fs");
const http = require("http");
const path = require("node:path/win32");
const url = require("url");
//////////////////////////////////////////
// FILES
//this is Synchronous Way of readd a file
// const text = fs.readFileSync("./1-node-farm/starter/txt/input.txt", "utf-8");
// console.log(text);

// const textOut = `This is Added something new : ${text} \n ${Date.now()}`;
// fs.writeFileSync("./1-node-farm/starter/txt/output.txt", textOut);
// console.log("Written successfully !");

// this is a Asynchronous ay of read a file and// which we call it Non-Blocking

// const text2 = fs.readFile(
//   "./1-node-farm/starter/txt/input.txt",
//   "utf-8",
//   (err, data) => {
//     console.log(data);
//   }
// );

// console.log("Reading is Done!");

//////////////////////////////////////////
// SERVER

//i want my data will be called once
// if i am using readFile in callBack then it will called every time when user send a request to SERVER
// so i am using it a top level

const replaceTemplate = (temp_cards, product) => {
  let output = temp_cards.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

const tempOverview = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/dev-data/data.json`,
  "utf-8"
);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // const pathName = req.url;
  // console.log(pathName);
  const { query, pathname } = url.parse(req.url, true);
  // OVERVIEW Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => {
        return replaceTemplate(tempCard, el);
      })
      .join("");
    // console.log(cardsHtml);
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(output);

    //PRODUCT Page
  } else if (pathname === "/product") {
    // console.log(query);
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API Page
  } else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);

    //PAGE NOT FOUND
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page Not Found !<h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on 8000");
});
