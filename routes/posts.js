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
// the upload.array this a method that takes two arguments. First one is the
// name of the input that is going to have the files coming from the form. The 
// Second number indicates the max number of images a user can upload. Now, when
// we get to the postCreate method we have access to the files that were uploaded 
// from the form via a req.files object returned from the array() method. 
router.post('/', upload.array('images', 4), asyncErrorHandler(postCreate));

/* GET posts show /posts/:id */
router.get('/:id', asyncErrorHandler(postShow));

/* GET posts edit /posts/:id/edit */
router.get('/:id/edit', asyncErrorHandler(postEdit));

/* PUT posts update /posts/:id */
router.put('/:id', upload.array('images', 4), asyncErrorHandler(postUpdate));

/* DELETE posts destroy /posts/:id */
router.delete('/:id', asyncErrorHandler(postDestroy));


module.exports = router;
  

