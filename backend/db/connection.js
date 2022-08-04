const mongoose = require("mongoose");

module.exports = {
  reConnectMongoose: async () => {
    try {
      mongoose.connect(process.env.DBURL, {
        useNewUrlParser: true, useUnifiedTopology: true,retryWrites:true
      });
      console.log("Database connected successfully");
    } catch (err) {
      console.log("Database invalid connection!");
      setTimeout(() => {
        module.exports.reConnectMongoose();
      }, 5000);
    }
  }
}