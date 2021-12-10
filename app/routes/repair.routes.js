module.exports = app => {
    const repairs = require("../controllers/repair.controller.js");

    var router = require("express").Router();

    //Create a new repair
    router.post("/", repairs.create);

    //Retreive all repairs
    router.get("/", repairs.findAll);

    //Retreive repair by id
    router.get("/:id", repairs.findOne);

    //Update repair by id
    router.put("/:id", repairs.update);

    //Delete repair by id
    router.delete("/:id", repairs.delete);

    app.use('/api/repairs', router);
};