module.exports = app => {
    const cars = require("../controllers/car.controller.js");
    const authenticate = require('../middleware/authenticate.js')    
    var router = require("express").Router();

    //Create a new car
    router.post("/users/:userId/cars", authenticate, cars.create);

    //Retreive all cars
    router.get("/cars", cars.findAll);

    //Retreive car by id
    router.get("/cars/:carId", cars.findOne);

    //Update car by id
    router.put("/users/:userId/cars/:carId", authenticate, cars.update);

    //Delete car by id
    router.delete("/users/:userId/cars/:carId",authenticate, cars.delete);

    app.use('/api', router);
};