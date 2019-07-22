const Post = require('../models/post');

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
        // use req.body to create a new Post
        let post = await Post.create(req.body);
        // use backtick to allow js template literal syntax 
        res.redirect(`/posts/${post.id}`)
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
    }

    
}