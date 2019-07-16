const express = require('express');
// mergeParams: true allows us to pull the id from the app.use 
// /posts/-->:id<--/reviews
const router = express.Router({ mergeParams: true });

/* GET reviews index /posts/:id/reviews */
router.get('/', function(req, res, next) {
    res.send('INDEX /posts/:id/reviews')
});

//no need because we are having the comment section on the same page
// /* GET reviews index /posts/:id/reviews/new */
// router.get('/new', function(req, res, next) {
//     res.send('NEW /posts/:id/reviews/new')
// });
  
/* POST reviews create index /posts/:id/reviews */
router.post('/', function(req, res, next) {
    res.send('CREATE /posts/:id/reviews/')
});

/* GET reviews show /posts/:id/reviews/:review_id */
router.get('/:review_id', function(req, res, next) {
    res.send('SHOW /posts/:id/reviews/:review_id')
});

/* GET reviews edit /reviews/:id/edit */
router.get('/:id/edit', function(req, res, next) {
    res.send('EDIT /posts/:id/reviews/:id/edit')
});

/* PUT reviews update /posts/:id/reviews:id */
router.put('/:id', function(req, res, next) {
    res.send('PUT /posts/:id/reviews/:review_id')
});

/* DELETE reviews destroy /posts/:id/reviews:id */
router.delete('/:id', function(req, res, next) {
    res.send('DELETE /posts/:id/reviews/:review_id')
});


module.exports = router;
  

