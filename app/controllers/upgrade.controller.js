const e = require("express");
const db = require("../models");
const Upgrades = db.upgrade;
const Cars = db.car;

//Create and save a new upgrade
module.exports = {
async create(req, res){

    //Create a new upgrade
    const upgrade = new db.upgrade({
        car_id: req.params.carId,
        user_id: req.params.userId,
        subject: req.body.subject,
        description: req.body.description,
        category: req.body.category,
        costs: req.body.costs,
        isDone: req.body.isDone ? req.body.isDone : false,
        date: req.body.date
    });

    carInUpgrade = await Cars.findOne({ _id : req.params.carId})

  if (carInUpgrade == undefined || carInUpgrade == null) {
    res.status(404).send("Car not found")
  }
  if (carInUpgrade.user_id != req.params.userId) {
    res.status(403).send("User is not allowed access")
  }

    //Save upgrade in the database
    await upgrade
        .save(upgrade)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                err.message || "Some error occured while adding the upgrade to the database!"
            });
        });

        try {
            await Cars.updateOne(
              {_id : req.params.carId},
              {
                $push: {
                  upgrades: upgrade,
                },
              },
            )
          } catch (err) {
            res.status(500).send("Something went wrong");
          }
    },

    //Retreive all upgrades from the database
async findAll(req, res){
    await Upgrades.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occured while retreiving all upgrades!"
            });
        });
},

//Find a upgrade by ID
async findOne(req, res){
    const id = req.params.id;

    await Upgrades.findById(id)
        .then(data => {
            if (!data)
            res.status(404).send({ message: "Upgrade not found with id " + id});
        else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retreiving upgrade with id " + id + " from database!"});
        });
},

//Update an upgrade by ID
async update(req, res){
    const userId = req.params.userId;
    const upgradeId = req.params.upgradeId;
    const carId = req.params.carId;
    const car = await Cars.findOne({_id: carId});

    if (car == null || car == undefined) {
        return res.status(404).send("car not found")
    }

    if (userId != car.user_id) {
        return res.status(403).send("User is not allowed access");
    }

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty. Nothing to update!"
        });
    } else {

    await Upgrades.findByIdAndUpdate(upgradeId, req.body, { useFindAndModify : false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot update upgrade with id " + upgradeId + ". Upgrade not found!"
                });
            } else res.send({ message: "Upgrade was updated successfully!"});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating upgrade with id " + id + "in database!"
            });
        })
    }
},

//Delete an upgrade by ID
async delete(req, res){
    const id = req.params.upgradeId;
    const userId = req.params.userId;
    const carId = req.params.carId;
    const car = await Cars.findOne({_id: carId});
    const upgrade = await Upgrades.findOne({_id: id});

    if (car == null || car == undefined) {
        return res.status(404).send("The car was not found")
    }

    if (upgrade.car_id != car._id) {
        return res.status(403).send("The upgrade you want to delete is not for this car")
    }

    if (userId != car.user_id) {
        return res.status(403).send("User is not allowed access");
    }

    await Upgrades.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Can not delete upgrade with id " + id + ". Upgrade was not found!"
                });
            } else {
                res.send({
                    message: "Upgrade was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Upgrade with id " + id + "! This is a problem with the database connection!"
            });
        });
},
}
