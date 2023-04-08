const db = require("../models");
const userModel = require("../models/user.model");
const { user } = require("../models");
const Users = db.user;
const bcrypt = require('bcrypt');
const jwtSecretKey = require('../config/db.config').jwtSecretKey
const jwt = require('jsonwebtoken');
const neo = require("../../neo");
const saltRounds = 10;

//Create and save a new User
module.exports = {
async create(req, res){

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
    await user
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
    
    },

async findAll(req, res){
    await Users.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retreiving all users from database!"          
            })
        })
},

//Find a user by ID
async findOne(req, res) {
    const id = req.params.id;
    console.log(req.params.id)

    await Users.findById(id)
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
},

//Update a user by ID
async update(req, res){
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty. Nothing to update!"
        });
    }

    const id = req.params.id;

    await Users.findByIdAndUpdate(id, req.body, { useFindAndModify : false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot update User with id " + id + ". User not found!"
                });
            } else res.send({ message: "User was updated successfully!"});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id " + id + "in database!"
            });
        })
},

//Delete a user by ID
async delete(req, res){
    const id = req.params.id;

    await Users.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Can not delete User with id " + id + ". User was not found!"
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
    },

    //AUTHENTICATION
async login(req, res){
        console.log(req.body)
        await Users.findOne({
          emailAddress: req.body.emailAddress
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
                message: "User not found!"
              });
          }
          console.log(user.password)
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
    
    async validateToken(req, res, next){
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
    },

        async register(req, res){
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

            doubleUser = await Users.findOne({emailAddress: req.body.emailAddress})
            
            if (doubleUser != null || doubleUser != undefined) {
              res.status(403).send("An other user already uses this email address")
            } else {

            await user.save((err, result) => {
                if (err) {
                    res.status(400).json({
                        message: "Failed getting connection!",
                        error: err,
                      });
                  }
            });
            try {
              const session = neo.session();
          
              await session.run(neo.create, {
                mongoId : user._id.toString(),
                emailAddress: req.body.emailAddress.toString(),
                userName: req.body.userName.toString()
              });

              session.close();
              res.status(200).send("User created in both databases")
            } catch (err) {
              res.status(500).send("Something went wrong while creating user in Neo")
            }
            }
        }
      }


    