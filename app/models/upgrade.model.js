const { mongoose } = require(".");

module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      car_id:  {
        type : String, 
        required : true,
      },
      user_id: { 
        type: String, 
        required : true, 
      },
      subject: { 
        type: String, 
        required : true, 
      },
      description: { 
        type: String, 
        required : true, 
      },
      category: { 
        type: String, 
        required : true, 
      },
      costs: { 
        type: Number, 
        required : true, 
      },
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
