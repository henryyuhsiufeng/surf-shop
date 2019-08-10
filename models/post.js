const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');
const mongoosePaginate = require('mongoose-paginate');

const PostSchema = new Schema({
    title: String,
    price: String,
    description: String,
    // url and public_id are coming from cloudinary. The public_id 
    // allows us to edit or delete that image from cloudinary. The url
    // is going to allow us to easily display images in views and ejs.
    images: [ {url: String, public_id: String}],
    location: String,
    geometry: {
        type:  {
            type: String,
            enum: [],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    // helps us put a pop on each of the markers
    properties: {
        description: String
    },
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
    ],
    avgRating: { type: Number, default: 0 }
});


// in the controllers any time the post.remove gets called then the prehook middleware gets called
// we are using a function instead of an arrow because we need access to
// this
PostSchema.pre('remove', async function() {
    await Review.remove({
        _id: {
          // gets any review id included in the post array
          $in:  this.reviews
        }
    });
});

// Instance method: Any instance of the PostSchema can call calculateAvgRating
PostSchema.methods.calculateAvgRating = function() {
    let ratingsTotal = 0;
	if(this.reviews.length) {
		this.reviews.forEach(review => {
			ratingsTotal += review.rating;
		});
		this.avgRating = Math.round((ratingsTotal / this.reviews.length) * 10) / 10;
	} else {
		this.avgRating = ratingsTotal;
	}
	const floorRating = Math.floor(this.avgRating);
	this.save();
	return floorRating;
}

// enable mongoosePagination in our application so we can now use the 
// paginate method to query the database instead of .find
PostSchema.plugin(mongoosePaginate); 
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

module.exports = mongoose.model('Post', PostSchema);