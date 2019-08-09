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
    //create a method that we can use with post register route in user index
    //this is a method of this parent object
    //POST /register
    async postRegister(req, res, next) {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            image: req.body.image
        });
        //user register with a new username and we are pulling the username from the form
        //the we pass the password as the second parameter, which then takes the password
        //hashes and salts it.
        //wait for user.register to finish running until we redirect back
        //home
        //await will not work unless we have a asynch function that it is inside
        //of (await is only valid in async function)
        await User.register(newUser, req.body.password);
        res.redirect('/');
    },

    //POST /login
    postLogin(req, res, next){
        passport.authenticate('local', 
                { successRedirect: '/',
                failureRedirect: '/login',
               // failureFlash: true 
        })(req, res, next);
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