import Joi from '@hapi/joi';

export const createGroupSchema = Joi.object({
    id: Joi.string()
        .uuid()
        .optional(),
    name: Joi.string().required(),
    permissions: Joi.array().required(),
});

export const updateGroupSchema = Joi.object({
    id: Joi.string()
        .uuid()
        .required(),
    name: Joi.string().required(),
    permissions: Joi.array().required(),
});
