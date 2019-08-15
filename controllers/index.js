const User = require('../models/user');
const Post = require('../models/post');
const passport = require('passport');
const mapBoxToken = process.env.MAPBOX_TOKEN;

//anything inside this object will be exported
module.exports = {
    // GET /
    async landingPage(req, res, next) {
        const posts = await Post.find({});
        res.render('index', {posts, mapBoxToken, title: 'Surf Shop - Home'});
    },
    // GET /register
    getRegister(req, res, next) {
        res.render('register', {title: 'register', username: '', email: ''});
    },

    //create a method that we can use with post register route in user index
    //this is a method of this parent object
    //POST /register
    // async postRegister(req, res, next) {
    //     const newUser = new User({
    //         username: req.body.username,
    //         email: req.body.email,
    //         image: req.body.image
    //     });

    // Better version of making sure user emails are unique
    async postRegister(req, res, next){
        try {
            //user register with a new username and we are pulling the username from the form
            //the we pass the password as the second parameter, which then takes the password
            //hashes and salts it.
            //wait for user.register to finish running until we redirect back
            //home
            //await will not work unless we have a asynch function that it is inside
            //of (await is only valid in async function)
            const user = await User.register(new User(req.body), req.body.password);
            //if(User.find().email)
            //console.log( User.count({ email: req.body.email}));
            if(User.find({"email":req.body.email}).count()!=0){
                err.message = 'duplicate index: email_1 dup key';
                return next(err);
            }
            req.login(user, function(err) {
                const {username, email } = req.body;
                console.log(username+' '+email);
                if(err) return next(err);
                req.session.success = `Welcome to Surf Shop, ${user.username}!`;
                res.redirect('/');
            });
        } catch(err) {
            //console.log('ERROR ERROR ERROR ERROR');
            // passport local mongoose will check for same username
            const {username, email } = req.body; // destructoring som variables
            let error = err.message;
            if (error.includes('duplicate') && error.includes('index: email_1 dup key')){
                error = 'A user with the given email is already registered';
            }
            // re render the register page. Our flash messages currently work by detecting the error
            // variable and displaying a flash message. 
            res.render('register', { title: 'Register', username, email, error});
        }

        
       
        
        
    },

    // GET /login
    getLogin(req, res, next) {
        res.render('login', {title: 'Login' });
    },

    //POST /login
    async postLogin(req, res, next){
       const { usernname, password } = req.body;
       // higher order function that has a function inside of it that it is returning and passing in what it is returning
       const { user, error } = User.authenticate()(username, password);
       if (!user && error) return next(error);
       req.login(user, function(err){
           if (err) return next(err);
           req.seesion.success = `Welcome back, ${username}!`;
           const redirectUrl = req.session.redirectTo || '/';
           delete req.session.redirectTo;
           res.redirect(redirectUrl);
       });
    },

    // GET /logout
    getLogout(req, res, next) {
        req.logout();
        res.redirect('/');
      }

}

/*  if using try catch, we would have to keep writing it over and
    over again, that's why we use promises???

    try {
     await User.register(newUser, req.body.password);
    } catch(err) {
         return next(err);
    }
    res.redirect('/');
*/