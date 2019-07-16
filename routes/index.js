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

module.exports = router;
