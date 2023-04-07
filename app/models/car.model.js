const { Schema } = require("mongoose");
const { mongoose } = require(".");
const repairModel = require("./repair.model");
const upgradeModel = require("./upgrade.model");

module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      user_id: String,
      brand: String,
      model: String,
      colour: String,
      licensePlate: String,
      mileage: Number,
      horsepower: Number,
      productionYear: Number,
      isCurrentlyDriveable: Boolean,
      isDailyCar: Boolean,
      repairs: { type: [repairModel.Schema], default: [] },
      upgradeModel: { type: [upgradeModel.Schema], default: [] },
    },
    { timestaps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Car = mongoose.model("car", schema);
  return Car;
};
