import { Schema } from "mongoose";
import { isEmail } from "validator";
import IAdminDoc from "./dto";

export default new Schema<IAdminDoc>(
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
      unique: true,
    },
    phone_number: {
      type: String,
      required: [true, "Phone number is required"],
      maxlength: [15, "Phone number can not exceed 15 characters"],
      minlength: [10, "Phone number can not be less than 10 characters"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: ["Owner", "Super-admin", "Admin"],
        message: "Invalid role value",
      },
    },
    first_account: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_default_password: {
      type: Boolean,
      default: false,
    },
    is_password_changed: {
      type: Boolean,
      default: false,
    },
    is_email_or_phone_number_changed: {
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
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);
