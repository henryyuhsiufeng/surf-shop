# surf-shop
6/29/19
Set up navbar
6/28/19
added basic map with mapbox to show ejs in mapbox test branch

Start working on templates, which allows us to have a different styling for different views. 

npm install ejs-mate --save
=======
6/28/19

    To do:
    # Geocoding Post Addess and Adding Its Marker to the Map

    ## Update post Model
    - Remove lat and lng and add coordinates: Array
        - we get an array of coordinates already

    ## Update Posts Controller
    - Add the geocodingClient to top of file:
    `````
    const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
    const geocodingClient = mbxGeocodng({
        accessToken: process.env.MAPBOX_TOKEN
    });
    `````
    - Update create (POST) method:
    `````

    `````
    - Assign the responses's coordinates to req.body.post.
    - Save the post

    # Update the Post Show View
    - Remove geojson object
    - Remvoe forEach loop over geoson.features
    - Assign post variable from EJS local variable
    - Update marker to sue post instead 

6/27/19
add mapbox to posts/show
>>>>>>> mapbox

6/26/19
Adding posts - Images Upload - Delete
We have the deletion process to delete the posts, but does not delete the images in Cloudinary.

To handle HTTP POST request in Express.js version 4 and above, you need to install middleware module called body-parser.

body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.

The middleware was a part of Express.js earlier but now you have to install it separately.

This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request. Install body-parser using NPM as shown below.

6/25/19
to acquire the number of pre-existing images. 
    - let imageUpload = document.getElementById('imageUpload');
    - imageUpload.files.length will get you the number of images
    - let imgs = document.querySelectorAll('.imageDeleteCheckbox');
    - imgs.length

Can use debugger code to stop process at a specific point

included ternary operator in script in edit.ejs in posts
    - IF TRUE ? THEN DO X : ELSE(FALSE) DO Y

    To do:
    # Posts Edit form
        - update checkbox name
        - add enctype to form

    # Posts Update Route
        - add upload.array()
    
    # Posts Update Method
        - Find the post by id
        - Check if there's any images for deletion
            - assign deleteImages from req.body to its own variable
            - Loop over deleteImages
                - Delete images from cloudinary
                - delete image from post.images
            - Check if there are any new images for upload
                - upload images
                    - add images to post.images array
            - update the post with new any new properties
            - save the updated post into the db
            - redirect to show page

bodyParser syntax name="deleteImages[]" will create an array even if theres one item.

line duplicate down (shift + option + down arrow key)

Delete posts and making sure that the images associated with the deleted post are removed on cloudinary as well.

We use asynchronous methods because with js we have a lot of calls to servers and it would take a long time for a result to be received. 

old code:
     // update it with req.body.post
        // let post = await Post.findByIdAndUpdate(req.params.id, req.body.post, {new: true});
        // ^^^ {new: true} argument will return the newly updated psot from the databse, instead
        // of the original
        let post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
        //we can just plug in req.params.findbyid instead
        // eval(require('locus'));
        res.redirect(`/posts/${post.id}`);

6/24/19
What is req.files???
What is W3 spec???

(Planning)
Working on trying to be able to edit images. Being able to see the images that are already existing in the edit page. We want to get the images under choose files and be able to select which ones to edit. We only want a post to have a maximum of four images at any given time.

When the form is submitted, we are going to check to see how many images were uploaded and we are going to compare to how many images already exist and how many they want to delete.

In edit.ejs I gave the input image upload an id of "imageUpload" that way we can select that and see how many images a user is trying to upload. Add a checkbox to see what images the user wants to keep and delete. 

6/23/19
Add delete method to post. 

cloudinary allows us to store images in the cloud. Multer is going to allow us to deal with the multipart form data (one or more diff file types).

We pass in req.body.post to create a new post. But we can't simply do that with images because it is an array.

have to download package dotenv to use .env file
- npm i -D dotenv

can export the environment variable for a session with
export CLOUDINARY_SECRET = asdfasdfasdfasdf

------------------------------------
Image upload

- Create cloudinary account
- Activate account from email (very important!)
- Install cloudinary and multer
    'npm i -S cloudinary multer'
- Configure multer for upload in routes file (add image filter?)
    - add middleware -> upload.array('nameAttr', maxNum)
- Update new view form element with enctype='multipart/form-data'
- Add input to form -> attrs: type='file', name='images', accept='images/*', multiple
- Require cloudinary in controller
- Configure cloudinary (put api_secret in .env)
- Add for... of loop with cloudinary upload
- Update Post mode, images field to [{url: String. public_id: String}]
- Test it out!

------------------------------------

- Rubber duck debugging method


6/22/19 
refactor post.js in routes. Changed the method names to better
follow restful routing.


6/21/19
create basic template for post and edit ejs

------Terminal Commands------
npm i -S method-override

6/16/19

create index.js in controllers. This file will coincide with the index.js file in models.

check if controllers was connected to index.js in routes

encountered error: <strong>passport.initialize() middleware</strong>
while adding in authenticate middleware to post login route

------Terminal Commands------
//Update mongoose to version 5.6.4
npm uninstall mongoose ; npm i -S mongoose@5.6.4


6/16/19
------Terminal Commands------

$ npm install -g express-generator
$ express

// Automatically sets everything up with skeleton and dependencies 
$ express --view=ejs surf-shop

$ npm i -S mongoose passport

// The "-D" serves the purpose of not saving onto dependencies so it is not put onto Heroku
$ npm i -D locus
$ npm i -D dotenv

$ npm i

// in case of any vulnerabilities this command will fix it
$ npm audit fix

------------------------------

Change the var's to const because we do not want to modify those 

initialize git repository

created gitignore and added node_modules and .env to it. We do this because package.json already has all the information we need. Node modules will always be automatically created when pulled from someplace else. .env needs to be private as it will contain sensitive information. 

use Postman to check if routes are working

RESTful routes for posts.js
GET index           /posts
GET new             /posts/new
POST create         /posts
GET show            /posts/:id
GET edit            /posts/:id/edit
PUT update          /posts/:id
DELETE destroy      /posts/:id

!!! index.js will contain es6 formatting 

index.js will contain the following features: login and sign up. 

6/15/19
MVC - (M)odels (V)iews (C)ontrollers
Express application generator