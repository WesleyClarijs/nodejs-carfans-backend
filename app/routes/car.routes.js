module.exports = app => {
    const cars = require("../controllers/car.controller.js");

    var router = require("express").Router();

    //Create a new car
    router.post("/", cars.create);

    //Retreive all cars
    router.get("/", cars.findAll);

    //Retreive car by id
    router.get("/:id", cars.findOne);

    //Update car by id
    router.put("/:id", cars.update);

    //Delete car by id
    router.delete("/:id", cars.delete);

    app.use('/api/cars', router);
};