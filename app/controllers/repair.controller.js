const db = require("../models");
const Repairs = db.repair;
const Cars = db.car;
const Repair = require("../models/repair.model")

//Create and save a new repair
module.exports = {
async create(req, res,next) {
  //Create a new repair
  const repair = new Repair({
    car_id: req.params.carId,
    user_id: req.params.userId,
    subject: req.body.subject,
    description: req.body.description,
    isMechanicalProblem: req.body.isMechanicalProblem
      ? req.body.isMechanicalProblem
      : false,
    problemSince: req.body.problemSince,
    isRepaired: req.body.isRepaired ? req.body.isRepaired : false,
    costs: req.body.costs,
    solution: req.body.solution,
    problemSolvedAt: req.body.problemSolvedAt,
  });

  //Save repair in the database

  carInRepair = await Cars.findOne({_id : req.params.carId})

  if (carInRepair == undefined || carInRepair == null) {
    res.status(404).send("Car not found")
  }
  else if (carInRepair.user_id != req.params.userId) {
    res.status(403).send("User is not allowed to use this car")
  } else {

  await repair
    .save(repair)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while adding the repair to the database!",
      });
    });

    try {
      await Cars.updateOne(
        {_id : req.params.carId},
        {
          $push: {
            repairs: repair,
          },
        },
      )
    } catch (err) {
      res.status(500).send("Something went wrong");
    }
  }
},

//Retreive all repairs from the database
async findAll(req, res, next){
  await Repair.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retreiving all repairs!",
      });
    });
},

//Find a repair by ID
async findOne(req, res, next){
  const id = req.params.repairId;

  await Repair.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Repair not found with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message: "Error retreiving Repair with id " + id + " from database!",
        });
    });
},

//Update a repair by ID
async update(req, res, next){
  const userId = req.params.userId;
  const repairId = req.params.repairId;
  const car = await Cars.findOne({_id: id});

  if (userId != car.user_id) {
    return res.status(403).send("User is not allowed access");
  }

  else if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty. Nothing to update!",
    });
  } else {

  await Repair.findByIdAndUpdate(repairId, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update Repair with id " + repairId + ". Repair not found!",
        });
      } else res.send({ message: "Repair was updated successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating repair with id " + repairId + "in database!",
      });
    });
  }
},

//Delete a repair by ID
async delete(req, res){
  const id = req.params.repairId;
  const userId = req.params.userId;
  const carId = req.params.carId;
  const car = await Cars.findOne({_id: carId});

  if (car == null || car == undefined) {
    return res.status(404).send("Car not found")
  }

  if (userId != car.user_id) {
    return res.status(403).send("User is not allowed access");
  } else {

  await Repair.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Can not delete repair with id " + id + ". Repair was not found!",
        });
      } else {
        res.send({
          message: "Repair was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Could not delete Repair with id " +
          id +
          "! This is a problem with the database connection!",
      });
    });
  }
},
}
