const Review = require('../models/review');
const User = require('../models/user');
const Post = require('../models/post');

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
	},

	isLoggedIn: (req, res, next) => {
		if (req.isAuthenticated()) return next();
		req.session.error = 'You need to be logged in to do that!';
		req.session.redirectTo = req.originalUrl;
		res.redirect('login');
	},

	isAuthor: async (req, res, next) => {
		 const post = await Post.findById(req.params.id);
		 if(post.author.equals(req.user._id)){
			 // passing in the post we found to the next part in the middleware chain
			 res.locals.post = post;
			 return next();
		 }
		 req.session.error = 'Access denied!';
		 res.redirect('back');
	},

	// check whether or not the password sent from form is valid
	isValidPassword: async (req, res, next) => {
		const { user } = await User.authenticate()(req.user.username, req.body.currentPassword);
		if (user) {
			// add user to res.locals
			res.locals.user = user;
			next();
		} else {
			req.session.error = 'Incorrect current password!';
			return res.redirect('/profile');
		}
	},

	changePassword: async (req, res, next) => {
		const {
			newPassword,
			passwordConfirmation
		} = req.body; 

		if(newPassword && passwordConfirmation) {
			const { user } = res.locals;
			if (newPassword === passwordConfirmation) {
				await user.setPassword(newPassword);
				next();
			} else {
				req.session.error = 'New passwords must match!';
				return res.redirect('/profile');
			}
		} else {
			next();
		}
	}
	
}
