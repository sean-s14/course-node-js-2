require("../models/User");
require("../models/Blog");
require("dotenv").config();

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

afterAll(async () => {
  await mongoose.disconnect();
});
