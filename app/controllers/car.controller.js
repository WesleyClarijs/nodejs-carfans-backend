const db = require("../models");
const Cars = db.car;

//Create and save a new Car
exports.create = (req, res) => {

    //Validation on request
    if (!req.body.brand) {
        res.status(400).send({ message: "brand cannot be empty!" });
    }
    //TODO: Add validation for all obligated fields.

    //Create a new car
    const car = new db.car({
        user_id: req.body.user_id,
        brand: req.body.brand,
        model: req.body.model,
        colour: req.body.colour,
        licensePlate: req.body.licensePlate,
        mileage: req.body.mileage,
        horsepower: req.body.horsepower,
        productionYear: req.body.productionYear,
        isCurrentlyDriveable: req.body.isCurrentlyDriveable ? req.body.isCurrentlyDriveable : true,
        isDailyCar: req.body.isDailyCar ? req.body.isDailyCar : true
    });

    //Save car in the database
    car
        .save(car)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                err.message || "Some error occured while adding the car to the database!"
            });
        });
    };

//Retreive all Cars from the database
exports.findAll = (req, res) => {
    Cars.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occured while retreiving all cars!"
            });
        });
};

//Find a car by ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cars.findById(id)
        .then(data => {
            if (!data)
            res.status(404).send({ message: "Car not found with id " + id});
        else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retreiving Car with id " + id + " from database!"});
        });
};

//Update a car by ID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty. Nothing to update!"
        });
    }

    const id = req.params.id;

    Cars.findByIdAndUpdate(id, req.body, { useFindAndModify : false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot update Car with id " + id + ". Car not found!"
                });
            } else res.send({ message: "Car was updated successfully!"});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating car with id " + id + "in database!"
            });
        })
};

//Delete a car by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Cars.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Can not delete Car with id " + id + ". Car was not found!"
                });
            } else {
                res.send({
                    message: "Car was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Car with id " + id + "! This is a problem with the database connection!"
            });
        });
};



