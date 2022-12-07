module.exports = (app) => {
  const meetings = require("../controllers/meeting.controller.js");

  var router = require("express").Router();

  //Create a meeting car
  router.post("/", meetings.create);

  //Retreive meeting cars
  router.get("/", meetings.findAll);

  //Retreive meeting by id
  router.get("/:id", meetings.findOne);

  //Update meeting by id
  router.put("/:id", meetings.update);

  //Delete meeting by id
  router.delete("/:id", meetings.delete);

  app.use("/api/meetings", router);
};
