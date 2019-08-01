const Review = require('../models/review');

module.exports = {
    asyncErrorHandler: (fn) =>
        //callback anonymous function 
		(req, res, next) => {
			Promise.resolve(fn(req, res, next))
						 .catch(next);
		},

	isReviewAuthor: async (req, res, next) => {
		// find the review
		let review = await Review.findById(req.params.review_id);
		// check to see if the author of the review is the same as the person logged in
		if(review.author.equals(req.user._id)) {
			// if true, short circuit out to let them edit
			return next();
		}
		req.session.error = "Bye Bye";
		return res.redirect('/');
	}
}
