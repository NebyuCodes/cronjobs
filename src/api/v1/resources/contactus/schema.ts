import { Schema } from "mongoose";
import { isEmail } from "validator";

export default new Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      maxlength: [100, "First name can not exceed 100 characters"],
      minlength: [2, "First name can not be less than 2 characters"],
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      maxlength: [100, "Last name can not exceed 100 characters"],
      minlength: [2, "Last name can not be less than 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: () => {
          isEmail;
        },
        message: "Invalid email address",
      },
    },
    phone_number: {
      type: String,
      required: [true, "Phone number is required"],
      maxlength: [15, "Phone number can not exceed 15 characters"],
      minlength: [10, "Phone number can not be less than 10 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      maxlength: [500, "Message can not exceed 500 characters"],
      minlength: [10, "Message can not be less than 10 characters"],
    },
    is_read: {
      type: Boolean,
      default: false,
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
    },
    timestamps: true,
  }
);
