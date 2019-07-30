const Post = require('../models/post');
const Review = require('../models/review');


// We don't need an index edit or show because the reviews are going to
// exist on the show page of the post.
module.exports = {
    
    // Reviews Create
    async reviewCreate(req, res, next) {
        
    },
    // Reviews Update
    async reviewUpdate(req, res, next) {
       
    },
    // Reviews Destroy
    async reviewDestroy(req, res, next) {
        
    }

    
}