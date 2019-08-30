const User = require('../models/user');
const Post = require('../models/post');
const passport = require('passport');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const util = require('util');

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
            // if(User.find({"email":req.body.email}).count()!=0){
            //     err.message = 'duplicate index: email_1 dup key';
            //     return next(err);
            // }
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
            //eval(require('locus'))
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
        // isAuth is from passport
        if(req.isAuthenticated()) return res.redirect('/');
        // if exist then we need to take the url where the request is coming from 
        // and use that in our session so that the user gets redirected back after they
        // successfully login
        if(req.query.returnTo) req.session.redirectTo = req.headers.referer;
        res.render('login', {title: 'Login' });
    },

    //POST /login
    async postLogin(req, res, next){
       const { username, password } = req.body;
       // higher order function that has a function inside of it that it is returning and passing in what it is returning
       const { user, error } = await User.authenticate()(username, password);
       if (!user && error) return next(error);
       req.login(user, function(err){
           if (err) return next(err);
           req.session.success = `Welcome back, ${username}!`;
           // req.session.redirectTo from getLogin 
           const redirectUrl = req.session.redirectTo || '/';
           delete req.session.redirectTo;
           res.redirect(redirectUrl);
       });
    },

    // GET /logout
    getLogout(req, res, next) {
        req.logout();
        res.redirect('/');
      },

    async getProfile(req, res, next) {
        // finds all the posts id's where the post author matches the logged author id
        const posts = await Post.find().where('author').equals(req.user._id).limit(10).exec();
        res.render('profile', { posts });
    },

    async updateProfile(req, res, next) {
        const {
            username,
            email,
        } = req.body;
        const { user } = res.locals;
        if (username) user.username = username;
        if (username) user.email= email;
        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.session.success = 'Profile successfully updated!';
        res.redirect('/profile');
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