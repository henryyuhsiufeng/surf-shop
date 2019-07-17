const User = require('../models/user');

//anything inside this object will be exported
module.exports = {
    //create a method that we can use with post register route in user index
    //this is a method of this parent object
    postRegister(req, res, next) {
        //user register with a new username and we are pulling the username from the form
        //the we pass the password as the second parameter, which then takes the password
        //hashes and salts it.
        User.register(new User({username: req.body.username}), req.body.password, (err) => {
          if (err) {
            console.log('error while user register!', err);
            return next(err);
          }
      
          console.log('user registered!');
      
          res.redirect('/');
        });
      
    }

}