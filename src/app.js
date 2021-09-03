//require("dotenv").config(); // load env var from .env for dev test
require("./db/mongoose.js"); //establish connect with mongodb
const express = require("express");
const shortURL = require("./routers/shortURL.js");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const viewsPath = path.join(__dirname, "../templates/views");
const publicDirectoryPath = path.join(__dirname, "../public");

app.set("view engine", "pug");
app.set("views", viewsPath);
//Set up static files directory to serve
app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(shortURL); // /url/ router

app.get("/", (req, res) => {
  //render index view with a form
  res.render("index");
});

app.get("/:shortId", (req, res) => {
  //console.log(req.params.shortId);
  if (req.params.shortId) {
    res.redirect(`/url/${shortId}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
