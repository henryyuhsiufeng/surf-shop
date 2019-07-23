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
        //update it with req.body.post
        // let post = await Post.findByIdAndUpdate(req.params.id, req.body.post, {new: true});
        // ^^^ {new: true} argument will return the newly updated psot from the databse, instead
        // of the original
        let post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
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