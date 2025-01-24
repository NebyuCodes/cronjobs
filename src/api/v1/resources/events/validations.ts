import Joi, { CustomHelpers } from "joi";

const dateValidation = (value: Date, helpers: CustomHelpers<any>) => {
  if (new Date(value) < new Date(Date.now())) {
    return helpers.error("Date must not be in the past");
  }
  return value;
};

export const createEventValidation = Joi.object({
  title: Joi.string().min(2).max(100).required().messages({
    "string.base": "Event title should be a string",
    "string.empty": "Event title can not be empty",
    "string.min": "Event title can not be less than 2 characters",
    "string.max": "Event title can not exceed 100 characters",
    "any.required": "Event title is required",
  }),
  description: Joi.string().min(10).max(1000).required().messages({
    "string.base": "Event description should be a string",
    "string.empty": "Event description can not be empty",
    "string.min": "Event description can not be less than 10 characters",
    "string.max": "Event description can not exceed 1000 characters",
    "any.required": "Event description is required",
  }),
  start_date: Joi.date().required().messages({
    "date.base": "Event start date should be a date",
    "date.empty": "Event start date can not be empty",
    "any.required": "Event start date is required",
  }),
  end_date: Joi.date().required().messages({
    "date.base": "Event end date should be a date",
    "date.empty": "Event end date can not be empty",
    "any.required": "Event end date is required",
  }),
  event_location: Joi.string().min(2).max(100).optional().messages({
    "string.base": "Event Location should be a string",
    "string.empty": "Event Location can not be empty",
    "string.min": "Event Location can not be less than 2 characters",
    "string.max": "Event Location can not exceed 100 characters",
  }),
  external_link: Joi.string().optional().messages({
    "string.base": "External Link should be a string",
    "string.empty": "External Link can not be empty",
  }),
  event_thumbnail: Joi.string().required().messages({
    "string.base": "Event Thumbnail should be a string",
    "string.empty": "Event Thumbnail can not be empty",
    "any.required": "Event Thumbnail is required",
  }),
  img_public_id: Joi.string().optional().messages({
    "string.base": "Image Secure URL should be a string",
    "string.empty": "Image Secure URL can not be empty",
  }),
  is_draft: Joi.boolean().optional().messages({
    "boolean.base": "Draft Status should be a boolean",
  }),
});

export const updateEventValidation = Joi.object({
  title: Joi.string().min(2).max(100).optional().messages({
    "string.base": "Event title should be a string",
    "string.empty": "Event title can not be empty",
    "string.min": "Event title can not be less than 2 characters",
    "string.max": "Event title can not exceed 100 characters",
  }),
  description: Joi.string().min(10).max(1000).optional().messages({
    "string.base": "Event description should be a string",
    "string.empty": "Event description can not be empty",
    "string.min": "Event description can not be less than 10 characters",
    "string.max": "Event description can not exceed 1000 characters",
  }),
  event_location: Joi.string().min(2).max(100).optional().messages({
    "string.base": "Event Location should be a string",
    "string.empty": "Event Location can not be empty",
    "string.min": "Event Location can not be less than 2 characters",
    "string.max": "Event Location can not exceed 100 characters",
  }),
  external_link: Joi.string().optional().messages({
    "string.base": "External Link should be a string",
    "string.empty": "External Link can not be empty",
  }),
  start_date: Joi.date().custom(dateValidation).optional().messages({
    "date.base": "Event start date should be a date",
    "date.empty": "Event start date can not be empty",
  }),
  end_date: Joi.date().custom(dateValidation).optional().messages({
    "date.base": "Event end date should be a date",
    "date.empty": "Event end date can not be empty",
  }),
  is_draft: Joi.boolean().optional().messages({
    "boolean.base": "Draft Status should be a boolean",
  }),
});

export const updateEventImageValidation = Joi.object({
  event_thumbnail: Joi.string().required().messages({
    "string.base": "Event Thumbnail should be a string",
    "string.empty": "Event Thumbnail can not be empty",
    "any.required": "Event Thumbnail is required",
  }),
  img_public_id: Joi.string().optional().messages({
    "string.base": "Public ID should be a string",
    "string.empty": "Public ID can not be empty",
  }),
});

export const updateEventStatusValidation = Joi.object({
  is_active: Joi.boolean().required().messages({
    "boolean.base": "Event status should be a boolean",
    "boolean.empty": "Event status can not be empty",
    "any.required": "Event status is required",
  }),
});

export const deleteMultipleEventsValidation = Joi.object({
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

export const deleteAllEventsValidation = Joi.object({
  delete_key: Joi.string().required().messages({
    "any.required": "Delete key is required",
  }),
  state: Joi.string().optional().valid("all").messages({
    "string.base": "Delete state should be a string",
    "string.empty": "Delete state can not be empty",
  }),
});
