const express = require('express');
// mergeParams: true allows us to pull the id from the app.use 
// /posts/-->:id<--/reviews
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler,
        isReviewAuthor
    } = require('../middleware');
const {
    reviewCreate,
    reviewUpdate,
    reviewDestroy
} = require('../controllers/reviews');


//no need because we are having the comment section on the same page
// /* GET reviews index /posts/:id/reviews/new */
// router.get('/new', function(req, res, next) {
//     res.send('NEW /posts/:id/reviews/new')
// });
  
/* POST reviews create index /posts/:id/reviews */
router.post('/', asyncErrorHandler(reviewCreate));

/* PUT reviews update /posts/:id/reviews:id */
router.put('/:review_id', isReviewAuthor, asyncErrorHandler(reviewUpdate));

/* DELETE reviews destroy /posts/:id/reviews:id */
router.delete('/:id', asyncErrorHandler(reviewDestroy));


module.exports = router;
  

