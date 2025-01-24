import Joi from "joi";

export const createFirstAdminAccountValidation = Joi.object({
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
  password: Joi.string().min(8).required().messages({
    "string.base": "Password should be a string",
    "string.empty": "Password can not be empty",
    "string.min": "Password can not be less than 8 characters",
    "any.required": "Password is required",
  }),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.required": "Password confirm is required",
      "any.only": "Passwords do not match",
    }),
});

export const createAdminValidation = Joi.object({
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
  role: Joi.string().valid("Super-admin", "Admin").required().messages({
    "string.base": "Role should be a string",
    "string.empty": "Role can not be empty",
    "string.valid": "Invalid role",
    "any.required": "Role is required",
  }),
});

export const updateDefaultPasswordValidation = Joi.object({
  default_password: Joi.string().min(8).required().messages({
    "string.base": "Default password should be a string",
    "string.empty": "Default password can not be empty",
    "string.min": "Default password can not be less than 8 characters",
    "any.required": "Default password is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Password should be a string",
    "string.empty": "Password can not be empty",
    "string.min": "Password can not be less than 8 characters",
    "any.required": "Password is required",
  }),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.required": "Password confirm is required",
      "any.only": "Passwords do not match",
    }),
});

export const updatePasswordValidation = Joi.object({
  current_password: Joi.string().min(8).required().messages({
    "string.base": "Current password should be a string",
    "string.empty": "Current password can not be empty",
    "string.min": "Current password can not be less than 8 characters",
    "any.required": "Current password is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Password should be a string",
    "string.empty": "Password can not be empty",
    "string.min": "Password can not be less than 8 characters",
    "any.required": "Password is required",
  }),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.required": "Password confirm is required",
      "any.only": "Passwords do not match",
    }),
});

export const updateEmailOrPhonenumberValidation = Joi.object({
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
});

export const adminLoginValidation = Joi.object({
  email_or_phone_number: Joi.alternatives()
    .try(
      Joi.string().email().required().messages({
        "string.base": "Email should be a string",
        "string.empty": "Email can not be empty",
        "string.email": "Email must be a valid email",
        "any.required": "Email is required",
      }),
      Joi.string().max(15).min(10).required().messages({
        "string.base": "Phone number should be a string",
        "string.empty": "Phone number can not be empty",
        "string.min": "Phone number can not be less than 10 characters",
        "string.max": "Phone number can not exceed 15 characters",
        "any.required": "Phone number is required",
      })
    )
    .required()
    .messages({
      "any.required": "Email or phone number is required",
    }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Password should be a string",
    "string.empty": "Password can not be empty",
    "string.min": "Password can not be less than 2 characters",
    "any.required": "Password is required",
  }),
});

export const updateAdminProfileValidation = Joi.object({
  first_name: Joi.string().max(100).min(2).optional().messages({
    "string.base": "First name should be a string",
    "string.empty": "First name can not be empty",
    "string.min": "First name can not be less than 2 characters",
    "string.max": "First name can not exceed 100 characters",
  }),
  last_name: Joi.string().max(100).min(2).optional().messages({
    "string.base": "Last name should be a string",
    "string.empty": "Last name can not be empty",
    "string.min": "Last name can not be less than 2 characters",
    "string.max": "Last name can not exceed 100 characters",
  }),
  role: Joi.string().valid("Super-admin", "Admin").optional().messages({
    "string.base": "Role should be a string",
    "string.empty": "Role can not be empty",
    "string.valid": "Invalid role",
    "any.required": "Role is required",
  }),
});

export const updateAdminAccountStatusValidation = Joi.object({
  is_active: Joi.boolean().required().messages({
    "boolean.base": "Admin account status should be a boolean",
    "string.empty": "Admin account status can not be empty",
    "any.required": "Admin account status is required",
  }),
});

export const transferOwnershipValidation = Joi.object({
  new_role: Joi.string().valid("Super-admin", "Admin").required().messages({
    "string.base": "Role should be a string",
    "string.empty": "Role can not be empty",
    "string.valid": "Invalid role",
    "any.required": "Role is required",
  }),
});

export const deleteMultipleAdminsValidation = Joi.object({
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

export const deleteAllAdminsValidation = Joi.object({
  delete_key: Joi.string().required().messages({
    "any.required": "Delete key is required",
  }),
});
