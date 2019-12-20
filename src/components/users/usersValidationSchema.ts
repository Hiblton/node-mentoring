import Joi from '@hapi/joi';

export const createUserSchema = Joi.object({
    id: Joi.string()
        .uuid()
        .optional(),
    login: Joi.string().required(),
    password: Joi.string()
        .alphanum()
        .required(),
    age: Joi.number()
        .integer()
        .min(4)
        .max(130),
    isDeleted: Joi.boolean().optional(),
});

export const updateUserSchema = Joi.object({
    id: Joi.string()
        .uuid()
        .required(),
    login: Joi.string().required(),
    password: Joi.string()
        .alphanum()
        .required(),
    age: Joi.number()
        .integer()
        .min(4)
        .max(130),
    isDeleted: Joi.boolean().required(),
});
