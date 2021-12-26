require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
// const url = 'mongodb://localhost/mygrocstore';
const url = 'mongodb+srv://harshroc:0qj9LZRSXiB5tzjw@cluster0.ednoc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


mongoose.connect(url)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

var indexRouter = require('./routes/index');
var categoriesRouter = require('./routes/categories');
var productsRouter = require('./routes/products');
var usersRouter = require('./api/routes/users');
var getCategoriesRouter = require('./api/routes/categories');
var getProductsRouter = require('./api/routes/products');
var ordersRouter = require('./api/routes/orders');
var adminOrdersRouter = require('./routes/orders');

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
app.use('/products', productsRouter);
app.use('/orders', adminOrdersRouter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if(req.method === "OPTIONS")
  {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use('/users', usersRouter);
app.use('/api/getcategories', getCategoriesRouter);
app.use('/api/getproducts', getProductsRouter);
app.use('/api/orders', ordersRouter);


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
