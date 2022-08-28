var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var DB = require('../myapp/dataManager');
const nunjucks = require('nunjucks');

var DBpath = __dirname + '/DB.json';

var port = 1234;
var app = express();

let users = [];
let userCounter = 0;


function getUserCounter(increment=0) {
  userCounter += increment;
  return userCounter;
};
function getUsers() { // return data
  return users;
};
function pushUser(user) { // insert data
   users.push(user)
};

module.exports = {getUserCounter, getUsers, pushUser};

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// ctrl + c (유저 인터럽트) 발생시 데이터 저장후 종료
process.once('SIGINT', () => { 
  console.log('SIGTERM signal received: closing HTTP server');
  console.log('Data saving..');
  DB.saveUsers(DBpath,getUsers()); // sync
  console.log('SERVER CLOSED!');
  process.exit();
});

// Run Server ( Run listener )
app.listen(port, () => {
  console.log(' INITIALIZING SERVER..');
  console.log('- Data Loading... -');
  DB.loadUsers(DBpath).then((file,err) =>{
    if(file.length == 0 || file == undefined){ // if there is no data
      users = Array();
    } else if(err){ // if there is err 
      console.log('loading Failed!');
      users = Array();
    } else{  
      users = JSON.parse(file);
    }
  }).then(() => {
    console.log(getUsers());
    userCounter = users.length;
    console.log('- Data Loading Success! -');
    console.log(`Server running at http://127.0.0.1:${port}`);
  });
});

// view engine setup
app.set('view engine', 'html');
nunjucks.configure("./views", {
  express: app
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/public'))); // 정적파일 제공 

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 오류처리
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
