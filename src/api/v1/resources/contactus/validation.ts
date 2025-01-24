import Joi from "joi";

export const createMessageValidation = Joi.object({
  first_name: Joi.string().max(100).min(2).required().messages({
    "string.base": "First name should be a string",
    "string.empty": "First name can not be empty",
    "string.min": "First name can not be less than 2 characters",
    "string.max": "First name can not exceed 100 characters",
    "any.required": "First name is required",
  }),
  last_name: Joi.string().max(100).min(2).required().messages({
    "string.base": "Last name should be a string",
    "string.empty": "Last name can not be empty",
    "string.min": "Last name can not be less than 2 characters",
    "string.max": "Last name can not exceed 100 characters",
    "any.required": "Last name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a string",
    "string.empty": "Email can not be empty",
    "string.email": "Email must be a valid email",
    "any.required": "Email is required",
  }),
  phone_number: Joi.string().max(15).min(10).required().messages({
    "string.base": "Phone number should be a string",
    "string.empty": "Phone number can not be empty",
    "string.min": "Phone number can not be less than 10 characters",
    "string.max": "Phone number can not exceed 15 characters",
    "any.required": "Phone number is required",
  }),
  message: Joi.string().max(500).min(10).required().messages({
    "string.base": "Message should be a string",
    "string.empty": "Message can not be empty",
    "string.min": "Message can not be less than 10 characters",
    "string.max": "Message can not exceed 500 characters",
    "any.required": "Message is required",
  }),
});

export const deleteMultipleMessagesValidation = Joi.object({
  ids: Joi.array()
    .items(
      Joi.string().required().messages({
        "string.base": "ID should be a string",
        "string.empty": "ID can not be empty",
        "any.required": "ID is required",
      })
    )
    .required()
    .messages({
      "any.required": "IDs are required",
    }),
});

export const deleteAllMessagesValidation = Joi.object({
  delete_key: Joi.string().required().messages({
    "any.required": "Delete key is required",
  }),
});
