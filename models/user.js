const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // if not unique then we catch it as an error and write a custom error message
    email: { type: String, require: true, unique: true },
    image: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

/*
User
-email -String
//put into the schema by default because we are using passportlocalmongoose
-password -String
-username -String
-profilePic - String
-Posts -Array of objects ref posts 
-reviews -Array of objects ref reviews

posts: [
        {
            // because we use mongoose.Schema we don't have to use it 
            // at the top. 
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]

*/

