//establish connection with mongodb server

const mongoose = require("mongoose");
const connection = process.env.MONGODB || "mongodb://127.0.0.1:27017/url-shortener";

mongoose.connect(connection);

// {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useFindAndModify: false,
// }
