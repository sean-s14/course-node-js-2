const mongoose = require("mongoose");
const User = mongoose.model("User");
const Blog = mongoose.model("Blog");

module.exports = {
  createUser: async () => {
    return new User({}).save();
  },
  deleteUser: async (user) => {
    return User.findByIdAndDelete(user._id);
  },
  deleteUserBlogs: async (user) => {
    return Blog.deleteMany({ _user: user._id });
  },
};
