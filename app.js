require('dotenv').config();

const createError             = require('http-errors'),
      express                 = require('express'),
      engine                  = require('ejs-mate'),
      path                    = require('path'),
      cookieParser            = require('cookie-parser'),
      logger                  = require('morgan'),
      bodyParser              = require('body-parser'),
      passport                = require('passport'),
      User                    = require('./models/user'),
      session                 = require('express-session'),
      mongoose                = require('mongoose'),
      methodOverride          = require('method-override');


      

// Require routes
const indexRouter   = require('./routes/index');
const postsRouter   = require('./routes/posts');
const reviewsRouter = require('./routes/reviews');


const app = express();

// connect to the database
mongoose.connect('mongodb://localhost:27017/surf-shop-mapbox', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we\'re connected');
});

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

//mount routes
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter);

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
