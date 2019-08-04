const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const PostSchema = new Schema({
    title: String,
    price: String,
    description: String,
    // url and public_id are coming from cloudinary. The public_id 
    // allows us to edit or delete that image from cloudinary. The url
    // is going to allow us to easily display images in views and ejs.
    images: [ {url: String, public_id: String}],
    location: String,
    coordinates: Array,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            // because we use mongoose.Schema we don't have to use it 
            // at the top. 
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

PostSchema.pre('remove', async function() {
    await Review.remove({
        _id: {
          $in:  this.reviews
        }
    });
});

module.exports = mongoose.model('Post', PostSchema);


/*
Post
-title -String
-price -String
-description -String
-images -Array of Strings
-location -String
-lat -number
-lng -number
-author -Object id ref user
-reviews -array of objects
*/
