const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const repairModel = require("./repair.model");
const upgradeModel = require("./upgrade.model");

module.exports = (mongoose) => {
  var schema = new Schema(
    {
      user_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref : "User"
      },
      brand: String,
      model: String,
      colour: String,
      licensePlate: String,
      mileage: Number,
      horsepower: Number,
      productionYear: Number,
      isCurrentlyDriveable: Boolean,
      isDailyCar: Boolean,
      repairs: { type: [repairModel.Schema], required: false},
      upgrades: { type: [upgradeModel.Schema], required: false }
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
}

