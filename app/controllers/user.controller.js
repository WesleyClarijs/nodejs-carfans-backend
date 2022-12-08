const db = require("../models");
const userModel = require("../models/user.model");
const { user } = require("../models");
const Users = db.user;
const bcrypt = require('bcrypt');
const jwtSecretKey = require('../config/db.config').jwtSecretKey
const jwt = require('jsonwebtoken')
const saltRounds = 10;

//Create and save a new User
exports.create = (req, res) => {

    //Validation with if statements -- TODO

    //Create a new user
    const user = new db.user({
        userName: req.body.userName,
        password: req.body.password,
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

//Update a user by ID
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

//Delete a user by ID
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

    //AUTHENTICATION
exports.login = (req, res) => {
        Users.findOne({
          emailAddress: req.body.email
        }).exec((err, user) => {
          if (err) {
            res.status(500)
              .send({
                message: err
              });
            return;
          }
          if (!user) {
            return res.status(404)
              .send({
                message: "gebruiker niet gevonden."
              });
          }
    
          //comparing passwords
          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );
          // checking if password was valid and send response accordingly
          if (!passwordIsValid) {
            return res.status(401)
              .send({
                accessToken: null,
                message: "Invalid Password!"
              });
          }
          //signing token with user id
          var token = jwt.sign({id: user.id}, jwtSecretKey, { expiresIn: "2h" })
          
          //responding to client request with user profile success message and  access token .
          res.status(200)
            .send({
              user: {
                id: user.id,
                emailAddress: user.emailAddress,
                userName: user.userName,
              },
              message: "Login successfull",
              accessToken: token,
            });
        });

      },
    
    exports.validateToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
          console.log("Authorization header missing!");
          res.status(401).json({
            error: "Authorization header missing!",
            datetime: new Date().toISOString(),
          });
        } else {
          // Strip the word 'Bearer ' from the headervalue
          const token = authHeader.substring(7, authHeader.length);
    
          jwt.verify(token, jwtSecretKey, (err, payload) => {
            if (err) {
              console.log("Not authorized");
              res.status(401).json({
                error: "Not authorized",
                datetime: new Date().toISOString(),
              });
            }
            if (payload) {
              console.log("token is valid", payload);
              // User heeft toegang. Voeg UserId uit payload toe aan
              // request, voor ieder volgend endpoint.
              req.userId = payload.id;
              next();
            }
          });
        }
    }

        exports.register = (req, res) => {
            const user = new db.user({
                userName: req.body.userName,
                password: bcrypt.hashSync(req.body.password, saltRounds),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailAddress: req.body.emailAddress,
                dateOfBirth : req.body.dateOfBirth,
                gender: req.body.gender,
                country: req.body.country
            }) 
            user.save((err, result) => {
                if (result) {
                    res.status(200).json({
                        result: req.body
                    })
                  }
                if (err) {
                    res.status(400).json({
                        message: "Failed getting connection!",
                        error: err,
                      });
                  }
            });
        }


    