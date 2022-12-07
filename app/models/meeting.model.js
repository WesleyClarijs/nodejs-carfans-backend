const { Schema } = require("mongoose");
const { mongoose } = require(".");

module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      location: String,
      dateAndTime: Date,
      organisator: String,
      registeredCars: [String]
    },
    { timestaps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Meeting = mongoose.model("meeting", schema);
  return Meeting;
};
