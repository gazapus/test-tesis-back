const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.URI;
db.answer = require("./answer.js")(mongoose);
db.question = require("./question.js")(mongoose);
db.user = require("./user.js");

module.exports = db;