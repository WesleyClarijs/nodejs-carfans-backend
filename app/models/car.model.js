const { Schema } = require("mongoose");
const { mongoose } = require(".");

module.exports = mongoose => {
    var schema = mongoose.Schema(
            {
              brand: String,
              model: String,
              colour: String,
              licensePlate: String,
              mileage: Number,
              horsepower: Number,
              productionYear: Number,
              isCurrentlyDriveable: Boolean,
              isDailyCar: Boolean,  
              user: {
                  type: Schema.Types.ObjectId,
                  ref: 'user'
              }
            },
            { timestaps: true}
        );

    schema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Car = mongoose.model("car", schema);
    return Car;
}