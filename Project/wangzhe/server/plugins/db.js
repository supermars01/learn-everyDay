module.exports = app => {
  const mongoose = require("mongoose");

  mongoose.connect("mongodb://localhost:27017/wangzhe", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  });
};
