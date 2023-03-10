// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

// just like a simple web server like Apache web server
// we are mapping file system paths to the app's virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/images", express.static("./public/images"));
app.use("/text", express.static("./public/text"));


app.get("/", function (req, res) {
  //console.log(process.env);
  // retrieve and send an HTML document from the file system
  let doc = fs.readFileSync("./app/html/index.html", "utf8");
  res.send(doc);
});

app.get("/home", function (req, res) {
  //console.log(process.env);
  // retrieve and send an HTML document from the file system
  let doc = fs.readFileSync("./app/html/home.html", "utf8");
  res.send(doc);
});

app.get("/eachBus", function (req, res) {
  //console.log(process.env);
  // retrieve and send an HTML document from the file system
  let doc = fs.readFileSync("./app/html/eachBus.html", "utf8");
  res.send(doc);
});

app.get("/login", function (req, res) {
  //console.log(process.env);
  // retrieve and send an HTML document from the file system
  let doc = fs.readFileSync("./app/html/login.html", "utf8");
  res.send(doc);
});

app.get("/search", function (req, res) {
  //console.log(process.env);
  // retrieve and send an HTML document from the file system
  let doc = fs.readFileSync("./app/html/search.html", "utf8");
  res.send(doc);
});

app.get("/prelogin", function (req, res) {
  //console.log(process.env);
  // retrieve and send an HTML document from the file system
  let doc = fs.readFileSync("./app/text/nav_before_login.html", "utf8");
  res.send(doc);
});

app.get("/postlogin", function (req, res) {
  //console.log(process.env);
  // retrieve and send an HTML document from the file system
  let doc = fs.readFileSync("./app/text/nav_after_login.html", "utf8");
  res.send(doc);
});

app.get("/footer", function (req, res) {
  //console.log(process.env);
  // retrieve and send an HTML document from the file system
  let doc = fs.readFileSync("./app/text/footer.html", "utf8");
  res.send(doc);
});



// for resource not found (i.e., 404)
app.use(function (req, res, next) {
  // this could be a separate file too - but you'd have to make sure that you have the path
  // correct, otherewise, you'd get a 404 on the 404 (actually a 500 on the 404)
  res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
  console.log("Example app listening on port " + port + "!");
});