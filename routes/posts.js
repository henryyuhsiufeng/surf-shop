const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware');
const { getPosts, 
        newPost, 
        createPost,
        showPost,
        editPost
    } = require('../controllers/posts');

/* GET posts index /posts */
router.get('/', errorHandler(getPosts));

/* GET posts index /posts/new */
router.get('/new', newPost);
  
/* POST posts create index /posts */
router.post('/', errorHandler(createPost));

/* GET posts show /posts/:id */
router.get('/:id', errorHandler(showPost));

/* GET posts edit /posts/:id/edit */
router.get('/:id/edit', errorHandler(editPost));

/* PUT posts update /posts/:id */
router.put('/:id', function(req, res, next) {
    res.send('PUT /posts/:id')
});

/* DELETE posts destroy /posts/:id */
router.delete('/:id', function(req, res, next) {
    res.send('DELETE /posts/:id')
});


module.exports = router;
  

