import mongoose from "mongoose";
import { formatDate, parseDate } from "../utils/date.js";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "category is required"],
      enum: ["Seminer", "Atölye", "Konser", "Spor", "Diğer"],
      trim: true,
    },
    capacity: {
      type: Number,
      default: 0,
      min: [0, "capacity cannot be negative"],
    },
    date: {
      type: Date,
      required: [true, "date is required"],
      set: parseDate,
      get: formatDate,
    },
    time: {
      type: String,
      required: [true, "time is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "location is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true, id: false },
  }
);

export const Event = mongoose.model("Event", eventSchema);