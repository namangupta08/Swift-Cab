const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be 3 character long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be 3 character long"],
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    minlength: [5, "Email must be 5 character long"],
  },
  password:{
    type: String,
    required: true,
    select: false,
  },
  status:{
    type: String,
    enum: ["active" , "inactive"],
    default: "inactive",
  },
  socketId: {
        type: String,
  },

  vehicle:{
    color:{
        type: String,
        required: true,
        minlength: [ 3 ,"Color must be atleast 3 characters long"],
    },
    plate:{
        type: String,
        required: true,
        minlength: [ 3 ,"Plate must be atleast 3 characters long"],
    },
    capacity:{
        type: Number,
        required: true,
        minlength: [ 1 ,"Capacity must be atleast 1"],
    }, 
    vehicleType:{
        type: String,
        required: true,
        enum: [ "car" , "auto" , "motorcycle"],
    },
  },
  location:{
    ltd:{
        type: Number,
    },
    lng:{
        type: Number,
    },
  },
  
});

captainSchema.index({ 'location.lng': '2dsphere', 'location.ltd': '2dsphere' });


captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET , {expiresIn:'24h'});
    return token;
};
  
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
  
captainSchema.statics.hashPassowrd = async function (password) {
    return await bcrypt.hash(password, 10);
};
  
const captainModel = mongoose.model("captain", captainSchema);
  
module.exports = captainModel;
