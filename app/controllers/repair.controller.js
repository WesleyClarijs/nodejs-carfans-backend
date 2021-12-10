const db = require("../models");
const Repairs = db.repair;

//Create and save a new repair
exports.create = (req, res) => {

    //Create a new repair
    const repair = new db.repair({
        car_id: req.body.car_id,
        subject: req.body.subject,
        description: req.body.description,
        isMechanicalProblem: req.body.isMechanicalProblem ? req.body.isMechanicalProblem : false,
        problemSince: req.body.problemSince,
        isRepaired: req.body.isRepaired ? req.body.isRepaired : false,
        costs: req.body.costs,
        solution: req.body.solution,
        problemSolvedAt: req.body.problemSolvedAt
    });

    //Save repair in the database
    repair
        .save(repair)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                err.message || "Some error occured while adding the repair to the database!"
            });
        });
    };

//Retreive all repairs from the database
exports.findAll = (req, res) => {
    Repairs.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occured while retreiving all repairs!"
            });
        });
};

//Find a repair by ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Repairs.findById(id)
        .then(data => {
            if (!data)
            res.status(404).send({ message: "Repair not found with id " + id});
        else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retreiving Repair with id " + id + " from database!"});
        });
};

//Update a repair by ID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty. Nothing to update!"
        });
    }

    const id = req.params.id;

    Repairs.findByIdAndUpdate(id, req.body, { useFindAndModify : false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot update Repair with id " + id + ". Repair not found!"
                });
            } else res.send({ message: "Repair was updated successfully!"});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating repair with id " + id + "in database!"
            });
        })
};

//Delete a repair by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Repairs.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Can not delete repair with id " + id + ". Repair was not found!"
                });
            } else {
                res.send({
                    message: "Repair was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Repair with id " + id + "! This is a problem with the database connection!"
            });
        });
};