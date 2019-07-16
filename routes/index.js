const express = require('express');
const router = express.Router();

// index.js uses es6 formatting 
//The index.js will allow users to sign up or login

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Surf Shop - Home' });
});

/* GET /register home page. */
router.get('/register', (req, res, next) => {
  res.send('GET /register');
});

/* POST /register home page. */
router.post('/register', (req, res, next) => {
  res.send('POST /register');
});

/* POST /login home page. */
router.post('/login', (req, res, next) => {
  res.send('GET /login');
});

//Displays user profile information
/* GET /profile home page. */
router.get('/profile', (req, res, next) => {
  res.send('GET /profile');
});

//Update user profile information
/* PUT /profile/:user_id home page. */
router.put('/profile/:user_id', (req, res, next) => {
  res.send('PUT /profile/:user_id');
});

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
