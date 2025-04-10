import Joi from "joi";

export const vacanciesSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    status: Joi.string().valid('ACTIVE', 'INACTIVE').required().messages({
        'any.only': 'El estado debe ser ACTIVE o INACTIVE',
        'any.required': 'El estado es requerido',
      }),
    company_id: Joi.number().integer()
})