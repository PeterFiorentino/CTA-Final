var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const genresRouter = require('./routes/genres');
const showsRouter = require('./routes/shows');
const commentsRouter = require('./routes/comments')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/genres', genresRouter);
app.use('/shows', showsRouter);
app.use('/comments', commentsRouter);

module.exports = app;
