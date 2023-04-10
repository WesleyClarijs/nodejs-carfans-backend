var mongoose = require("mongoose");

  var schema = mongoose.Schema(
    {
      car_id: {
        type : String, 
        required : true,
      },
      user_id: {
        type : String, 
        required : true,
      },
      subject: {
        type : String, 
        required : true,
      },
      description: {
        type : String, 
        required : true,
      },
      isMechanicalProblem: {
        type : Boolean, 
        required : true,
      },
      problemSince: {
        type : Date, 
        required : true,
      },
      isRepaired: {
        type : Boolean, 
        required : true,
      },
      costs: {
        type : Number, 
        required : false,
      },
      solution: {
        type : String, 
        required : false,
      },
      problemSolvedAt: {
        type : Date, 
        required : false,
      },
    },
    { timestaps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  // const Repair = mongoose.model("repair", schema);
  // return Repair;

  module.exports = mongoose.model("repair", schema);
