const express = require('express');
const router = express.Router();
//Object destructuring
//plug in the method you want to destruct out of the object
//when we require controllers/index it exports the object from module
//exports and we can pull any of the keys from that object.
//--- (es6 destructuring format)
const {landingPage, 
      getRegister,
      postRegister, 
      postLogin, 
      getLogin,
      getLogout,
      getProfile,
      updateProfile
    } = require('../controllers');
    //an equivalent to ^^^^ that takes two lines
    //const indexObj = require('../controllers/index');
    //const postRegister = indexObj.postRegister;
const { asyncErrorHandler,
        isLoggedIn,
        isValidPassword,
        changePassword
   } = require('../middleware');


// index.js uses es6 formatting 
//The index.js will allow users to sign up or login

/* GET home/landing page. */
router.get('/', asyncErrorHandler(landingPage));

/* GET /register home page. */
router.get('/register', getRegister);

/* POST /register home page. */
//postRegister has access to req, res, and next (look at code)
router.post('/register', asyncErrorHandler(postRegister));

/* GET /login */
router.get('/login',getLogin);

/* POST /login home page. */
router.post('/login', asyncErrorHandler(postLogin));

/* GET /logout */
router.get('/logout', getLogout);

//Displays user profile information
/* GET /profile home page. */
router.get('/profile', isLoggedIn, asyncErrorHandler(getProfile));

//Update user profile information
/* PUT /profile/ */
router.put('/profile/',
            isLoggedIn,
            asyncErrorHandler(isValidPassword),
            asyncErrorHandler(changePassword),
            asyncErrorHandler(updateProfile));

/* GET /forgot home page. */
router.get('/forgot', (req, res, next) => {
  res.send('GET /forgot');
});

// :id won't be necessary because the user would be typing in a 
// unique email. We will use that email to look up that specific 
// user. 
/* PUT /forgot home page. */
router.put('/forgot', (req, res, next) => {
  res.send('PUT /forgot');
});

/* GET /reset/:token home page. */
router.get('/reset/:token', (req, res, next) => {
  res.send('GET /reset/:token');
});

/* PUT /reset/:token home page. */
router.put('/reset-pw/:token', (req, res, next) => {
  res.send('PUT /reset/:token');
});

module.exports = router;
