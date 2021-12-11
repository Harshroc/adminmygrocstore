const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const url = 'mongodb://localhost/mygrocstore';
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

mongoose.connect(url)

const contt = mongoose.connection;

contt.on('open', () => {
  console.log("Connected");
})

var indexRouter = require('./routes/index');
var categoriesRouter = require('./routes/categories');
var productsRouter = require('./routes/products');

var app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/categories', categoriesRouter);
app.use('/categories/listcategories', categoriesRouter);
app.use('/handleaddcategories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/handleaddproducts', productsRouter);
app.use('/products/listproducts', productsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
