const mongoose = require("mongoose");
const { Schema } = mongoose;

//url documents will have to be unique in baseURL and shortURL to avoid db flood
const ShortURLSChema = new Schema(
  {
    origin: {
      type: String,
      required: true,
      unique: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    shortURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//limit expose data to remote user
ShortURLSChema.methods.toJSON = function () {
  const shortURL = this;
  const shortURLObject = shortURL.toObject();

  delete shortURLObject.shortId;
  delete shortURLObject._id;
  delete shortURLObject.createdAt;
  delete shortURLObject.updatedAt;
  delete shortURLObject.__v;
  //console.log(shortURLObject);
  return shortURLObject;
};

const ShortURL = new mongoose.model("ShortURL", ShortURLSChema);

module.exports = ShortURL;
