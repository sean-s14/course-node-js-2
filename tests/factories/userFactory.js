const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = {
  createUser: async () => {
    return new User({}).save();
  },
  deleteUser: async (user) => {
    return User.findByIdAndDelete(user._id);
  },
};
