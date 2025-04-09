import Joi from "joi";

export const companiesSchema = Joi.object({
    name: Joi.string().min(3).required(),
    location: Joi.string().min(3).required(),
    constact: Joi.string().min(3).required(),
})