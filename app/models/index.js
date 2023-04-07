const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.car = require("./car.model")(mongoose);
db.user = require("./user.model")(mongoose);
db.repair = require("./repair.model")(mongoose);
db.upgrade = require("./upgrade.model")(mongoose);

module.exports = db;
