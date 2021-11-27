module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    //Create a new car
    router.post("/", users.create);

    //Retreive all cars
    router.get("/", users.findAll);

    //Retreive car by id
    router.get("/:id", users.findOne);

    //Update car by id
    router.put("/:id", users.update);

    //Delete car by id
    router.delete("/:id", users.delete);

    app.use('/api/users', router);
};