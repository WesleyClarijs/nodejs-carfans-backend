const { mongoose } = require(".");
const carModel = require("./car.model");

module.exports = mongoose => {
    var schema = mongoose.Schema(
            {
              userName: { type: String, required: false},
              password: { type: String, required: false},  
              firstName: String,
              lastName: String,
              emailAddress: { type: String, required: false},
              dateOfBirth: String,
              gender: String,
              country: String,
              cars: { type: [carModel.Schema], default: [] },
            },
            { timestaps: true}
        );

    schema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("user", schema);
    return User;
}