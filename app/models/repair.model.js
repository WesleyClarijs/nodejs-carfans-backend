const { Schema } = require("mongoose");
const { mongoose } = require(".");

module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      car_id: String,
      user_id: String,
      subject: String,
      description: String,
      isMechanicalProblem: Boolean,
      problemSince: Date,
      isRepaired: Boolean,
      costs: Number,
      solution: String,
      problemSolvedAt: Date,
    },
    { timestaps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Repair = mongoose.model("repair", schema);
  return Repair;
};
