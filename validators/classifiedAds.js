import Joi, { required } from "joi";

export const addClassifiedAdValidator = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    pictures: Joi.array().items(Joi.string()),
    category: Joi.string().required(),
})
