import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginUserValidator, registerUserValidator } from "../validators/user-validator.js";
import { UserModel } from "../models/user-model.js";
import { sendEmailSignup } from "../utils/mailing.js";


export const registerUser = async (req, res, next) => {
  const {error, value} = registerUserValidator.validate(req.body);
  if(error) {
    return res.status(422).json(error);
  }

  const user = await UserModel.findOne({
    $or: [
      {userName : value.userName},
      {email : value.email}
    ]
  });
  if (user) {
    return res.status(409).json("User already exists")
  }
  const hashedPassword = bcrypt.hashSync(value.password,10);
  const newUser = await UserModel.create({
        firstName : value.firstName,
        lastName : value.lastName,
        userName : value.userName,
        email: value.email,
        role: value.role,
        password : hashedPassword
  }); 
  // send registration email
  const sendWelcomeEmail = sendEmailSignup(newUser.email, "Welcome to the Classifiedad Page 🎉", newUser.userName, newUser.role);
  
  // generate token
  const accessTokenSignup = jwt.sign(
    {id: newUser.id},
    process.env.JWT_SECRET_KEY,
    {expiresIn: "24h"}
  );
 
  // return response
  res.status(201).json({
    message: "User created successfully!",
    accessTokenSignup,
  });
}

export const loginUser =async (req,res, next) => {
  const {error,value} =loginUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  const user = await UserModel.findOne({
    email : value.email
  });
  if (!user) {
    return res.status(409).json("User does not exist");
  }
  const correctPassword = bcrypt.compareSync(value.password, user.password);
  if (!correctPassword) {
    return res.status(401).json("invalid credentials!");
  }
  const accessTokenLogin = jwt.sign(
    {id: user.id},
    process.env.JWT_SECRET_KEY,
    {expiresIn : "24h"}
  );
  res.status(200).json({accessTokenLogin})
};


