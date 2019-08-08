const Post = require('../models/post');
// give ability to use geocodingclient
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dkulk3gvx',
    api_key: '859914662181975',
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {
    // Post Index
   async postIndex(req, res, next) {
       //gets all the posts in the post collection
        //console.log('ASSS AND TITTIES');
        let posts = await Post.paginate({},{
            // determines which page we are on
            page: req.query.page || 1,
            limit: 10
        });
        posts.page = Number(posts.page);
        //in es5 {posts:posts}
        res.render('posts/index', {
             posts,
             mapBoxToken: process.env.MAPBOX_TOKEN, 
             title: 'Posts Index'});
    },

    // Post New
    // It is not async because all it's doing is rendering the 'posts/new'
    // Whereas the other methods are finding or "looking" for something and will
    // return something for both if found and not found. 
    // If error occurs there is a middleware that will account for that in 
    // app.js 
    postNew(req, res, next) {
        res.render('posts/new',{title: 'New Post'});
    },
    // Posts Create
    async postCreate(req, res, next){
        // array
        req.body.post.images = [];
        //req.files is going to be the array of files.
        for(const file of req.files) {
            // this method returns a promise
            // if we await it, we can get whatever the promise resolves to, so 
            // we can assign whatever it is to a variable. We then will store the info
            // stored in variable imagE. 
           let image = await cloudinary.v2.uploader.upload(file.path);
           // After we get back each images from out uploads to cloudinary let's
           // create an object and store it within req.body.post.images
           req.body.post.images.push({
               url: image.secure_url,
               public_id: image.public_id
           });
        }
        let response = await geocodingClient
            .forwardGeocode({
                //comes from the form so we can take location user enters and turn into geocoordinates
                query: req.body.post.location,
                limit: 1
            })
            .send();
        // create variable in post called coordinates that stores the coordinate location from the form
        req.body.post.coordinates = response.body.features[0].geometry.coordinates;
        // use req.body to create a new Post
        // req.body.post will now also contain req.body.post.images
        let post = await Post.create(req.body.post);
        // req.session.success = 'Post created successfully';
        // use backtick to allow js template literal syntax 
        res.redirect(`/posts/${post.id}`);
    },
    //Post Show
    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id).populate({
            // sort the reviews that we are populating this post with in descending order
            // postive one is ascending order.
            path: 'reviews',
            options: { sort: { '_id': -1 } },
            populate: {
                // author is associated with post model as an id that will then reference the corresponding user model
                path: 'author', 
                model: 'User'
            }
        });
        const floorRating = post.calculateAvgRating();
        res.render('posts/show', { post, floorRating })
    },
    // Posts Edit
    async postEdit(req, res, next){
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', {  post });
    },
    // Posts Update
    // take information from the put request in the edit form, then we will find
    // the post by its id and update it, then redirect. 
    async postUpdate(req, res, next){
        // Find the post by id
        let post = await Post.findById(req.params.id);
        // Check if there's any images for deletion
        //check if deleteImages exist and if length is 0 (because 0 is falsey)
        if(req.body.deleteImages && req.body.deleteImages.length) {
            //eval(require('locus'));
            // assign deleteImages from req.body to its own variable to make it easier to pass around
            let deleteImages = req.body.deleteImages;
            // Loop over deleteImages
            for(const public_id of deleteImages) {
                // Delete images from cloudinary
                await cloudinary.v2.uploader.destroy(public_id);
                // delete image from post.images
                for(const image of post.images) {
                    if(image.public_id === public_id) {
                        let index = post.images.indexOf(image);
                        // we splice it because the order in which
                        // an image is selected for deletion could be
                        // random
                        post.images.splice(index,1);
                    }
                }
            }
        }
        // Check if there are any new images for upload
        // we get req.files through multr after user hits submit on the form
            if(req.files) {
                // upload images
                for(const file of req.files) {
                    let image = await cloudinary.v2.uploader.upload(file.path);
                    // remember we have access to post because we found post at the very beginning of the method
                     // add images to post.images array
                    post.images.push({
                        url: image.secure_url,
                        public_id: image.public_id
                    });
                }
            }
            
            // check if location was updated
            // checking the form against the database
            // if it is different then we know that an edit has been made to the location
            if(req.body.post.location !== post.location) {
                // take that location and use api to geocode that location into a set of coordinates
                let response = await geocodingClient
                .forwardGeocode({
                    //comes from the form so we can take location user enters and turn into geocoordinates
                    query: req.body.post.location,
                    limit: 1
                })
                .send();
                // now that we have access to location we will update coordinates
                post.coordinates = response.body.features[0].geometry.coordinates;
                // now if the location wasn't changed, we wouldn't even bother overwriting whatever was inside anyways
                post.location = req.body.post.location;
            }

            // update the post with new any new properties coming from the form
            post.title = req.body.post.title;
            post.description = req.body.post.description;
            post.price = req.body.post.price;
            // save the updated post into the db
            post.save();
            // redirect to show page
            //we can just plug in req.params.findbyid instead
            // eval(require('locus'));
            res.redirect(`/posts/${post.id}`);
    },
    // Post Destroy
    async postDestroy(req, res, next){
        let post = await Post.findByIdAndRemove(req.params.id);
        // iterate over post.images and extract the public id
        // image represents each of the objects in post.images array.
        for(const image of post.images) {
            await cloudinary.v2.uploader.destroy(image.public_id);
        }
        await post.remove();
        req.session.success = 'Post delted successfully!';
        res.redirect('/posts');
    }

    
}