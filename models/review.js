const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        // author stores the id of the user model and ref indicates which model it is.
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Review', ReviewSchema);

/*
Review
-body -String
-author -Object id ref user
*/