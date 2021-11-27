const db = require("../models");
const Users = db.user;


//Create and save a new User
exports.create = (req, res) => {

    //Validation with if statements -- TODO

    //Create a new user
    const user = new db.user({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        dateOfBirth : req.body.dateOfBirth,
        gender: req.body.gender,
        country: req.body.country
    });

    //Save user in the database
    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occured while adding the user to the database!"
            });
        });
    };

exports.findAll = (req, res) => {
    Users.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retreiving all users from database!"          
            })
        })
};

//Find a user by ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Users.findById(id)
        .then(data => {
            if (!data)
            res.status(404).send({ message: "User not found with id " + id});
        else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retreiving User with id " + id + " from database!"});
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

    Users.findByIdAndUpdate(id, req.body, { useFindAndModify : false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot update User with id " + id + ". User not found!"
                });
            } else res.send({ message: "Car was updated successfully!"});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id " + id + "in database!"
            });
        })
};

//Delete a car by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Users.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Can not delete Car with id " + id + ". User was not found!"
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id " + id + "! This is a problem with the database connection!"
            });
        });
};