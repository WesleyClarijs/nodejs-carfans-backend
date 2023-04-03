const db = require("../models");
const Cars = db.car;

//Create and save a new Car
module.exports = {
async create(req, res, next) {
 
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
    isCurrentlyDriveable: req.body.isCurrentlyDriveable
      ? req.body.isCurrentlyDriveable
      : true,
    isDailyCar: req.body.isDailyCar ? req.body.isDailyCar : true,
  });

  //Save car in the database
  await car
    .save(car)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while adding the car to the database!",
      });
    });
},

//Retreive all Cars from the database
async findAll(req, res, next){
  console.log("findAll");
  await Cars.find()
    .then((data) => {
      console.log("returning data", data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log("Error!, err.message");
      res.status(500).send({
        message: err.message || "Some error occured while retreiving all cars!",
      });
    });
  },

//Find a car by ID
async findOne(req, res, next){
  const id = req.params.id;

  await Cars.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Car not found with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message: "Error retreiving Car with id " + id + " from database!",
        });
    });
},

//Update a car by ID
async update(req, res, next){
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty. Nothing to update!",
    });
  }

  const id = req.params.id;

  await Cars.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update Car with id " + id + ". Car not found!",
        });
      } else res.send({ message: "Car was updated successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating car with id " + id + "in database!",
      });
    });
},

//Delete a car by ID
async delete(req, res,next){
  const id = req.params.id;

  await Cars.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Can not delete Car with id " + id + ". Car was not found!",
        });
      } else {
        res.send({
          message: "Car was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Could not delete Car with id " +
          id +
          "! This is a problem with the database connection!",
      });
    });
  }
}
