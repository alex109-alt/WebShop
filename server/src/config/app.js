var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Routes
var indexRouter = require('../routes/index');
var productsRouter = require('../routes/products');

var app = express();

// Settings
// View Engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products', productsRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
});

// Error handler
app.use((err, req, res, next) => {
    // Set locals, only providing error in develoment
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'develoment' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
