import { Schema } from "mongoose";

export default new Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      maxlength: [100, "Event title can not exceed 100 characters"],
      minlength: [2, "Event title can not be less than 2 characters"],
      unique: true,
    },
    title_slug: {
      type: String,
      required: [true, "Title slug is required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      maxlength: [1000, "Event description can not exceed 1000 characters"],
      minlength: [10, "Event description can not be less than 10 characters"],
    },
    external_link: String,
    start_date: {
      type: Date,
      required: [true, "Event start date is required"],
    },
    end_date: {
      type: Date,
      required: [true, "Event end date is required"],
    },
    event_location: {
      type: String,
      maxlength: [100, "Event location can not exceed 100 characters"],
      minlength: [2, "Event location can not be less than 2 characters"],
    },
    event_thumbnail: {
      type: String,
      required: [true, "Event Thumbnail is required"],
    },
    img_public_id: {
      type: String,
    },
    is_draft: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
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
