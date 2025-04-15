const fs = require("fs");
const https = require("https");
const express = require("express");

const app = express();

app.use(express.static("./public"));
app.use("/src", express.static("./src"));


const options = {
  key: fs.readFileSync("openbanking.sandbox.api.pagseguro.com-key.pem"),
  cert: fs.readFileSync("openbanking.sandbox.api.pagseguro.com.pem"),
};

https.createServer(options, app).listen(443, () => {
  console.log("Rodando em https://openbanking.sandbox.api.pagseguro.com");
});
