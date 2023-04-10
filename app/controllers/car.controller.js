const db = require("../models");
const repairModel = require("../models/repair.model");
const upgradeModel = require("../models/upgrade.model");
const Cars = db.car;
const User = db.user

//Create and save a new Car
module.exports = {
async create(req, res, next) {
 
  //Create a new car
  const car = new db.car({
    user_id: req.params.userId,
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

  const user = await User.findOne({_id : req.params.userId})
  console.log(user)

  if (user == null || user == undefined) {
    res.status(404).send("User does not exist")
  } else {

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

    try {
      await User.updateOne(
        {_id : req.params.userId},
        {
          $push: {
            cars : car,
          },
        },
        {runValidators : true}
      )
    } catch (err) {
      res.status(500).send("Something went wrong");
    }
  }
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
  const id = req.params.carId;

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
  const userId = req.params.userId;
  const id = req.params.carId;
  const car = await Cars.findOne({_id : id})

  console.log(userId)
  console.log(id)
  console.log(car.user_id)

  if (userId != car.user_id) {
    return res.status(403).send("User is not allowed access");
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty. Nothing to update!",
    });
  }

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

    //TODO Fix this
    // try {
    //   await User.updateOne(
    //     { _id : userId },
    //     {
    //       $set : {
    //         cars : req.body
    //       },
    //     },
    //     { runValidators : true }
    //   )
    // } catch (err) {
    //   res.status(500).send("Something went wrong")
    // }
},

//Delete a car by ID
async delete(req, res,next){
  const id = req.params.carId;
  const userId = req.params.userId;
  const car = await Cars.findOne({ _id : id})


  if (userId != car.user_id) {
    return res.status(403).send("User is not allowed access");
  }

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
    try {
      await User.updateOne(
        { _id: userId},
        {
          $pull: {
            Cars: req.body,
          },
        },
        { runValidators: true}
      )
    } catch (err) {
      res.status(500).send("Something went wrong in the query.")
    }
  }
}
