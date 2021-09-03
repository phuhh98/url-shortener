const { Router } = require("express");
const ShortURL = require("../models/shortURL.js"); // load ShortURL models
const validator = require("validator");
const { nanoid } = require("nanoid");
const router = new Router(); //create a router instance

//handle post request to post new short url to db via x-www-urlencoded
router.post("/url", async (req, res) => {
  try {
    //validate the URL from x-www-form-urlencoded
    const isURL = validator.isURL(req.body.origin);
    if (!isURL) {
      res.send({ error: "Invalid Url" });
      return;
    }

    //findOne for the exist of that URL
    const exist = await ShortURL.findOne({ origin: req.body.origin });
    if (exist) {
      //if exist rerturn shortURL found

      res.send(exist);
    } else {
      //if doesn't exist, generate random shortID and save to server // stry until shortId is unique
      shortId = nanoid();
      shortURL = `${req.protocol}://${req.hostname}:${process.env.PORT}/url/${shortId}`;
      newURL = new ShortURL({ origin: req.body.origin, shortId, shortURL });
      await newURL.save();
      res.send(newURL); //return json string for { origin, shortURL, shortId }
    }
  } catch (err) {
    console.error(err);
  }
});

//handle get request for shorted url
router.get("/url/:shortId", async (req, res) => {
  try {
    //search for url from db
    let shortURL = await ShortURL.findOne({ shortId: req.params.shortId });
    //if exist => redirect to destination url
    //console.log(shortURL);
    if (shortURL) {
      res.redirect(shortURL.origin);
      return;
    } else {
      //if does not exist => res.render(404 page)
      res.send("404 not found");
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
