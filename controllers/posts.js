const Post = require('../models/post');

module.exports = {
    // Post Index
   async getPosts(req, res, next) {
       //gets all the posts in the post collection
        let posts = await Post.find({});
        //in es5 {posts:posts}
        res.render('posts/index', {posts})
    },

    // Post New
    newPost(req, res, next) {
        res.render('posts/new');
    },
    // Posts Create
    async createPost(req, res, next){
        // use req.body to create a new Post
        let post = await Post.create(req.body);
        // use backtick to allow js template literal syntax 
        res.redirect(`/posts/${post.id}`)
    },
    //Post Show
    async showPost(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/show', { post })
    },
    // Posts Edit
    async editPost(req, res, next){
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', {  post });
    }

    
}