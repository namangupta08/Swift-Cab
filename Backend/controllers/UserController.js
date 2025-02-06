const blackListTokenModel = require("../models/blackListToken.model");
const userModel = require("../models/userModel");
const { createUser } = require("../services/userservice");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({email});
    
    if(isUserAlreadyExist){
        return res.status(400).json({message:"User already exists"})
    }

  console.log(req.body)

  const hashedPassowrd = await userModel.hashPassowrd(password);

  const user = await createUser({
    firstname: fullname.firstname,
    lastname : fullname.lastname,
    email,
    password: hashedPassowrd,
  });

  const token = user.generateAuthToken();

  res.status(200).json({ token, user });
};

module.exports.loginUser = async (req,res,next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password')

    if(!user){
        return res.status(401).json({message:"Invalid email or password"});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"});
    }

    const token = user.generateAuthToken();
    res.cookie('token' , token);

    res.status(200).json({token , user});
}

module.exports.getUserProfile = async (req,res,next) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req,res,next) => {
    

    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    await blackListTokenModel.create({token});
    res.clearCookie('token');

    res.status(200).json({message:"logged out"}); 

}