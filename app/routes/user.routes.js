module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    //Create a new user
    router.post("/users", users.create);

    //Retreive all user
    router.get("/users", users.findAll);

    //Retreive user by id
    router.get("/users/:id", users.findOne);

    //Update user by id
    router.put("/users/:id", users.update);

    //Delete user by id
    router.delete("/users/:id", users.delete);

    //Register User
    router.post("/register", users.register);

    //Login
    router.post("/login", users.login);

    app.use('/api', router);
};