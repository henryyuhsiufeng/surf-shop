const Post = require('../models/post');
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
        let posts = await Post.find({});
        //in es5 {posts:posts}
        res.render('posts/index', {posts})
    },

    // Post New
    // It is not async because all it's doing is rendering the 'posts/new'
    // Whereas the other methods are finding or "looking" for something and will
    // return something for both if found and not found. 
    // If error occurs there is a middleware that will account for that in 
    // app.js 
    postNew(req, res, next) {
        res.render('posts/new');
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
        // use req.body to create a new Post
        // req.body.post will now also contain req.body.post.images
        let post = await Post.create(req.body.post);
        // use backtick to allow js template literal syntax 
        res.redirect(`/posts/${post.id}`);
    },
    //Post Show
    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/show', { post })
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
        //check if deleteImages exist and if length is 0 because 0 is falsey
        if(req.body.deleteImages && req.body.deleteImages.length) {
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
                        post.images.splice(index,1);
                    }
                }
            }
        }
           
            // Check if there are any new images for upload
                // upload images
                    // add images to post.images array
            // update the post with new any new properties
            // save the updated post into the db
            // redirect to show page


        //we can just plug in req.params.findbyid instead
        // eval(require('locus'));
        res.redirect(`/posts/${post.id}`);
    },
    // Post Destroy
    async postDestroy(req, res, next){
        await Post.findByIdAndRemove(req.params.id);
        res.redirect('/posts');
    }

    
}