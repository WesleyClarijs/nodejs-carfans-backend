const db = require("../models");
const Upgrades = db.upgrade;

//Create and save a new upgrade
exports.create = (req, res) => {

    //Create a new upgrade
    const upgrade = new db.upgrade({
        car_id: req.body.car_id,
        subject: req.body.subject,
        description: req.body.description,
        category: req.body.category,
        costs: req.body.costs,
        isDone: req.body.isDone ? req.body.isDone : false,
        date: req.body.date
    });

    //Save upgrade in the database
    upgrade
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
    };

    //Retreive all upgrades from the database
exports.findAll = (req, res) => {
    Upgrades.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occured while retreiving all upgrades!"
            });
        });
};

//Find a upgrade by ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Upgrades.findById(id)
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
};

//Update an upgrade by ID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty. Nothing to update!"
        });
    }

    const id = req.params.id;

    Upgrades.findByIdAndUpdate(id, req.body, { useFindAndModify : false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot update upgrade with id " + id + ". Upgrade not found!"
                });
            } else res.send({ message: "Upgrade was updated successfully!"});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating upgrade with id " + id + "in database!"
            });
        })
};

//Delete an upgrade by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Upgrades.findByIdAndRemove(id)
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
};
