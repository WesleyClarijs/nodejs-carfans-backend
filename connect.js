const neo_driver = require("./neo");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = {
  neo(dbName) {
    try {
      neo_driver.connect(dbName);
      console.log(`connection to neo DB ${dbName} established`);
    } catch (err) {
      console.error(err);
    }
  },
};
