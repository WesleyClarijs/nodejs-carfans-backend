module.exports = app => {
    const repairs = require("../controllers/repair.controller.js");
    const authenticate = require("../middleware/authenticate.js")
    var router = require("express").Router();

    //Create a new repair
    router.post("/users/:userId/cars/:carId/repairs", authenticate, repairs.create);

    //Retreive all repairs
    router.get("/repairs", repairs.findAll);

    //Retreive repair by id
    router.get("/:id", repairs.findOne);

    //Update repair by id
    router.put("/users/:userId/cars/:carId/repairs/:id", repairs.update);

    //Delete repair by id
    router.delete("/users/:userId/cars/:carId/repairs/:id", repairs.delete);

    app.use('/api', router);
};

