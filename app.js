var createError = require("http-errors");
var express = require("express");
var app = express();
// const passport = require("passport");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const core = require("cors");
app.use(core());
// app.use(express.urlencoded);
// app.use(
//   require("express-session")({
//     secret: "keyboard cat",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.get("/oauth/redirect", (req, res) => {
//   axios({
//     method: "POST",
//     url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
//     headers: {
//       Accept: "application/json",
//     },
//   }).then((response) => {
//     res.redirect(
//       `http://localhost:3000?access_token=${response.data.access_token}`
//     );
//   });
// });
require('dotenv').config()

require("./db/connection").reConnectMongoose()
const mailer = require('./helpers/sendMail')

const userRoutes = require('./routes/users.routes');
const categoriesRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');


// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", express.static(path.resolve(__dirname, "client/dist/FadlZad")));
app.use('/api/auth', userRoutes);
app.use('/api/category', categoriesRoutes);
app.use('/api/product', productRoutes);
app.post('/api/contact', (req, res) => {
  try {
    mailer.sendMailCaontactUs(
      req.body.name,
      req.body.email,
      req.body.sub,
      req.body.message
    );
    res.status(200).send({
      apiStatus: true,
      msg: "send message successfully!",
      data: req.body.message,
    });
  }
  catch (e) {
    res.status(500).send({
      apiStatus: false,
      msg: "send message faild!",
      data: e.messgae
    })
  }
})
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'client/dist/FadlZad', 'index.html'));
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(500).json({
    message: err.message,
    error: err
  });
});

module.exports = app;
