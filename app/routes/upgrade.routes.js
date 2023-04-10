module.exports = app => {
    const upgrades = require("../controllers/upgrade.controller.js");
    const authenticate = require("../middleware/authenticate.js");

    var router = require("express").Router();

    //Create a new upgrade
    router.post("/users/:userId/cars/:carId/upgrades", authenticate, upgrades.create);

    //Retreive all upgrades
    router.get("/upgrades", upgrades.findAll);

    //Retreive upgrade by id
    router.get("/upgrades/:upgradeId", upgrades.findOne);

    //Update upgrade by id
    router.put("/users/:userId/cars/:carId/upgrades/:upgradeId", authenticate, upgrades.update);

    //Delete upgrade by id
    router.delete("/users/:userId/cars/:carId/upgrades/:upgradeId", authenticate, upgrades.delete);

    app.use('/api', router);
};