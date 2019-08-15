require('dotenv').config();

const createError             = require('http-errors'),
      express                 = require('express'),
      engine                  = require('ejs-mate'),
      path                    = require('path'),
      cookieParser            = require('cookie-parser'),
      favicon                 = require('serve-favicon'),
      logger                  = require('morgan'),
      bodyParser              = require('body-parser'),
      passport                = require('passport'),
      User                    = require('./models/user'),
      session                 = require('express-session'),
      mongoose                = require('mongoose'),
      methodOverride          = require('method-override');
      seedPosts               = require('./seeds');
      seedPosts();


      

// Require routes
const indexRouter   = require('./routes/index');
const postsRouter   = require('./routes/posts');
const reviewsRouter = require('./routes/reviews');


const app = express();

// connect to the database
mongoose.connect('mongodb://localhost:27017/surf-shop', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we\'re connected');
});

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// setup piblic assets directory. Static files will contain images, sounds, etc
app.use(express.static('public'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// session has to come before you configure passport
// Configure Passport and Sessions
app.use(session({
  secret: 'hang ten dude',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

// passport.serializeUser is from passport
// User.serializeUser comes from passport local mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set local variables middleware
app.use(function(req, res, next) {
  // req.user = {
  //   '_id' : '5d4af616521ea7156eca5800',
  //   'username' : 'bob3'
  // }
  // for any views that gets rendered we will have access to currentUser object 
  res.locals.currentUser = req.user;
  // will be overwritten if title does exist 
  // set default page title
  res.locals.title = 'Surf Shop';
  // set success flash message
  res.locals.success = req.session.success || '';
  //console.log(req.sessions.success + 'FROM APP.JS');
  //console.log(req.locals.success + 'FROM APP.JS');
  // once done dealing with session we delete success property of req.session object
  delete req.session.success; 
  // set error flash message
  //console.log('error from middleware local variables');
  res.locals.error = req.session.error || '';
  //console.log(res.session.error);
  delete req.session.error; 
  // continue on to next function in middleware chain
  next();
});

//mount routes
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  console.log(err);
  req.session.error = err.message;
  // will run set local vairables middleware
  res.redirect('back');
});

module.exports = app;
