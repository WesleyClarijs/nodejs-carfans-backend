const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");
var corsOptions = {
    // origin:
    origin: "http://localhost:4200"
}

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the databse!", err);
        process.exit();
    });

// Add Access Control Allow Origin headers
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header("Access-Control-Allow-Headers", "append,delete,entries,foreach,get,has,keys,set,values,Authorization")
//     next();
//     });

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.json({message: "Welcome to the CarFans backend!"});
});

require("./app/routes/car.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/repair.routes")(app);
require("./app/routes/upgrade.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});