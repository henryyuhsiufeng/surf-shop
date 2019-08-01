const Post = require('../models/post');
const Review = require('../models/review');


// We don't need an index edit or show because the reviews are going to
// exist on the show page of the post.
module.exports = {
    
    // Reviews Create
    async reviewCreate(req, res, next) {
        // find the post by its id
        let post = await Post.findById(req.params.id);
        // create the review & review now contains author
         req.body.review.author = req.user._id;
        let review = await Review.create(req.body.review);
        // assign review to post
        post.reviews.push(review);
        // save the post
        post.save();
        // redirect to the post
        // req.session.success = 'Review created successfully!';
        console.log(req.session.success);
        res.redirect(`/posts/${post.id}`);
    },
    // Reviews Update
    async reviewUpdate(req, res, next) {
       await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
        req.session.success = 'Review updated successfully!';
        //console.log(req.session.success);
        res.redirect(`/posts/${req.params.id}`);
    },
    // Reviews Destroy
    async reviewDestroy(req, res, next) {
        // req.params.id will get us the post
        await Post.findByIdAndUpdate(req.params.id, {
            // The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
            // $pull is from mongodb and we are pulling the specific review in the post review array
            $pull: { reviews: req.params.review_id }
        });
        // find the actual review document and remove it
        await Review.findByIdAndRemove(req.params.review_id);
        req.session.success = 'Review Deleted successfully!';
        //console.log(req.session.success);
        res.redirect(`/posts/${req.params.id}`);
    }

    
}