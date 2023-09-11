const { Schema, model } = require("mongoose");
const levelSchema = require('./Level');
const bcrypt = require('bcrypt');

// Create a schema for user goals
const goalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// establish user schema blueprint
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    // set min username length to 4 characters
    minlength: 4,
    // set max username length to 10 characters
    maxlength: 10,
    // trim white space from front and end of string
    trim: true,
  },
  email: {
    type: String,
    // checks is email is unique
    unique: true,
    required: true,
    trim: true,
  },
  password: { type: String,
    required: true,
    minlength: 8,
  },
  // reference Levels schema
  level: [levelSchema],
  // Add goals field referencing the goalSchema
  goals: [goalSchema],
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
    // if password is new or modified, salt and hash password
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
