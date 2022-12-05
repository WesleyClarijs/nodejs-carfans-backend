const { mongoose } = require(".");

module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      car_id: String,
      user_id: String,
      subject: String,
      description: String,
      category: String,
      costs: Number,
      isDone: Boolean,
      date: Date,
    },
    { timestaps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Upgrade = mongoose.model("upgrade", schema);
  return Upgrade;
};
