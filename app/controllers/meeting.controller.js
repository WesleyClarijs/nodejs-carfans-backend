const db = require("../models");
const Meetings = db.meeting;

//Create and save a new meetings
module.exports = {
async create(req, res,next){
  //Create a new meetings
  const meeting = new db.meeting({
    location: req.body.location,
    dateAndTime: req.body.dateAndTime,
    organisator: req.body.organisator,
  });

  await meeting
    .save(meeting)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while adding the meeting to the database!",
      });
    });
},

//Retreive all meetingss from the database
async findAll(req, res, next){
  await Meetings.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retreiving all meetings!",
      });
    });
},

//Find a meetings by ID
async findOne(req, res, next){
  const id = req.params.id;

  await Meetings.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Meeting not found with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retreiving meeting with id " + id + " from database!",
      });
    });
},

async update(req, res, next) {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty. Nothing to update!",
    });
  }

  const id = req.params.id;

  await Meetings.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot update meetings with id " + id + ". meetings not found!",
        });
      } else res.send({ message: "meetings was updated successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating meetings with id " + id + "in database!",
      });
    });
},

//Delete an meetings by ID
async delete(req, res, next){
  const id = req.params.id;

  await Meetings.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Can not delete meetings with id " +
            id +
            ". meetings was not found!",
        });
      } else {
        res.send({
          message: "meetings was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Could not delete meetings with id " +
          id +
          "! This is a problem with the database connection!",
      });
    });
}
}
