module.exports = app => {
    const cars = require("../controllers/car.controller.js");
    const authenticate = require('../middleware/authenticate.js')    
    var router = require("express").Router();

    //Create a new car
    router.post("/users/:userId/cars", authenticate, cars.create);

    //Retreive all cars
    router.get("/cars", cars.findAll);

    //Retreive car by id
    router.get("/cars/:id", cars.findOne);

    //router.get("/users/:id/cars", cars.findAll)

    //Update car by id
    router.put("/users/:userId/cars/:id", authenticate, cars.update);

    //Delete car by id
    router.delete("users/:userId/cars:id",authenticate, cars.delete);

    app.use('/api', router);
};