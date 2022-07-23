const mongoose = require("mongoose");

// let connectionArr = [];
// try {
//   if (connectionArr.length > 0) return connectionArr[0];
//   else {
//     let uri = process.env.DBURL;
//     mongoose.createConnection(uri, {
//       useNewUrlParser: true, useUnifiedTopology: true
//     }).asPromise().then(dbConnection => {
//       connectionArr.push(dbConnection);
//       console.log("Database connected successfully");
//       return callback(null, dbConnection);
//     }).catch(err => {
//       console.log("Database invalid connection!");
//       setTimeout(() => {
//         module.exports.getMongooseConnection(() => { });
//       }, 5000);
//       return callback(err, null);

//     })
//   }
// } catch (err) {
//   console.log("Database invalid connection!");
//   setTimeout(() => {
//     module.exports.getMongooseConnection(() => { });
//   }, 5000);
//   return callback(err, null);
// }

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