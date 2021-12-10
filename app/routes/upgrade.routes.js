module.exports = app => {
    const upgrades = require("../controllers/upgrade.controller.js");

    var router = require("express").Router();

    //Create a new upgrade
    router.post("/", upgrades.create);

    //Retreive all upgrades
    router.get("/", upgrades.findAll);

    //Retreive upgrade by id
    router.get("/:id", upgrades.findOne);

    //Update upgrade by id
    router.put("/:id", upgrades.update);

    //Delete upgrade by id
    router.delete("/:id", upgrades.delete);

    app.use('/api/upgrades', router);
};