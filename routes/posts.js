const express = require('express');
const router = express.Router();

/* GET posts index /posts */
router.get('/', function(req, res, next) {
    res.send('INDEX /posts')
});

/* GET posts index /posts/new */
router.get('/new', function(req, res, next) {
    res.send('NEW /posts/new')
});
  
/* POST posts create index /posts */
router.post('/', function(req, res, next) {
    res.send('CREATE /posts/')
});

/* GET posts show /posts/:id */
router.get('/:id', function(req, res, next) {
    res.send('SHOW /posts/:id')
});

/* GET posts edit /posts/:id/edit */
router.get('/:id/edit', function(req, res, next) {
    res.send('EDIT /posts/:id/edit')
});

/* PUT posts update /posts/:id */
router.put('/:id', function(req, res, next) {
    res.send('PUT /posts/:id')
});

/* DELETE posts destroy /posts/:id */
router.delete('/:id', function(req, res, next) {
    res.send('DELETE /posts/:id')
});


module.exports = router;
  

