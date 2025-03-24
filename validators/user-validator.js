import Joi from "joi";

export const registerUserValidator = Joi.object({
  firstName : Joi.string().required(),
  lastName : Joi.string().required(),
  userName: Joi.string().required(),
  email: Joi.string().required(),
  password : Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirmPassword: Joi.ref("password"),
  role: Joi.string().required(),

}).with("password", "confirmPassword");


export const loginUserValidator = Joi.object ({
  email : Joi.string().required(),
  password: Joi.string().required(),
})