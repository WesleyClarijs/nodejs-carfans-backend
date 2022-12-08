const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");
// var corsOptions = {
//     origin: "http://nodejs-carfans-backend.herokuapp.com/"
//     //origin: "http://localhost:4200"
// }

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the databse!", err);
    process.exit();
  });

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the CarFans backend!" });
});

require("./app/routes/car.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/repair.routes")(app);
require("./app/routes/upgrade.routes")(app);
require("./app/routes/meeting.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
