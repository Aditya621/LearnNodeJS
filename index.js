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
const data = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/dev-data/data.json`,
  "utf-8"
);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  console.log(pathName);
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is come from Overview !");
  } else if (pathName === "/product") {
    res.end("This is come from Product !");
  } else if (pathName === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
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