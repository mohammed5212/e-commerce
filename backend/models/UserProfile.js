
const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    phone: String,
    dob: Date,
    gender: { type: String, enum: ["male", "female", "other"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", userProfileSchema);
