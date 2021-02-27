const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    locations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
    phoneNumber: {
      type: Number,
      require: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
