const express = require('express');
// mergeParams: true allows us to pull the id from the app.use 
// /posts/-->:id<--/reviews
const router = express.Router({ mergeParams: true });


//no need because we are having the comment section on the same page
// /* GET reviews index /posts/:id/reviews/new */
// router.get('/new', function(req, res, next) {
//     res.send('NEW /posts/:id/reviews/new')
// });
  
/* POST reviews create index /posts/:id/reviews */
router.post('/', function(req, res, next) {
    res.send('CREATE /posts/:id/reviews/')
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
  

