const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware');
const multer = require('multer');
// uploads directory is where the files will be stored temporarily before
// they get uploaded into the cloud and stored into the database
const upload = multer({'dest': 'uploads/'});
const { postIndex, 
        postNew, 
        postCreate,
        postShow,
        postEdit,
        postUpdate,
        postDestroy
    } = require('../controllers/posts');

/* GET posts index /posts */
router.get('/', asyncErrorHandler(postIndex));

/* GET posts index /posts/new */
//postNew is not async
router.get('/new', postNew);
  
/* POST posts create index /posts */
router.post('/', asyncErrorHandler(postCreate));

/* GET posts show /posts/:id */
router.get('/:id', asyncErrorHandler(postShow));

/* GET posts edit /posts/:id/edit */
router.get('/:id/edit', asyncErrorHandler(postEdit));

/* PUT posts update /posts/:id */
router.put('/:id', asyncErrorHandler(postUpdate));

/* DELETE posts destroy /posts/:id */
router.delete('/:id', asyncErrorHandler(postDestroy));


module.exports = router;
  

