################ surf-shop ################
7/10/19
## CONTINUE USER AUTHENTICATION AND AUTHORIZATION
# Create Register and Login Views
- Create a new file inside of /views named register.ejs


# Update Register and Login
- Comment out the req.user object assignment in app.js where you're setting a user to always be logged in: 
- Add a getRegister method to /controllers/index.js right befire existing postRegister method:
    ````
        // GET /register
        getRegister(req, res, next) {
            res.render('register', { title: 'Register' });
        },
    ````
- Add getLogin method to /controllers/index.js right before existing postLogin method
    ````
    // GET /login
    getLogin(req, res, next) {
        res.render('login', { title: 'Login' });
    },
    ````
- Update postRegister method inside of /controllers/index.js 
    ````
    async postRegister(req, res, next) {
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		image: req.body.image
	});

	let user = await User.register(newUser, req.body.password);
        req.login(user, function(err) {
        if (err) { return next(err); }
        req.session.success = `Welcome to Surf Shop, ${newUser.username}!`;
        res.redirect('/');
        });
    },
    ````
- Add getRegister and getLogin methods to /routes/index.js:
    ````
        const { landingPage, getRegister, postRegister, getLogin, postLogin, getLogout } = require('../controllers');
    ````
## REMOVE LOCAL IMAGE STORAGE
# Delete /uploads directory from app's root directory
- Navigate to root directory of surf-shop app in your terminal and run 'rm -rf ./uplaods'

# Install multer-storage-cloudinary
- 'npm i -S multer-storage-cloudinary'

# Configure Cloudinary and storage
- Create a folder named 'cloudinary '
- Create an index.js file inside of the new /cloudinary directory
- Add the following code to the /cloudinary/index.js file and save it: 
````
        const crypto = require('crypto');
        const cloudinary = require('cloudinary');
        cloudinary.config({
            cloud_name: 'YOUR-CLOUD-NAME-HERE',
            api_key: 'YOUR-API-KEY-HERE',
            api_secret: process.env.CLOUDINARY_SECRET
        });
        const cloudinaryStorage = require('multer-storage-cloudinary');
        const storage = cloudinaryStorage({
        cloudinary: cloudinary,
        folder: 'surf-shop',
        allowedFormats: ['jpeg', 'jpg', 'png'],
        filename: function (req, file, cb) {
            let buf = crypto.randomBytes(16);
            buf = buf.toString('hex');
            let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, '');
            uniqFileName += buf;
            cb(undefined, uniqFileName );
        }
        });

module.exports = {
	cloudinary,
	storage
}
````

# Update /routes/posts.js
- Remove: 'const upload = multer({'dest': 'uploads/'});'
- Add: 'const { cloudinary, storage } = require('../cloudinary');'
- Add: 'const upload = multer({ storage });'

# Update /controllers/posts.js
- Remove: 
    ````
        const cloudinary = require('cloudinary');
        cloudinary.config({
            cloud_name: 'devsprout',
            api_key: '111963319915549',
            api_secret: process.env.CLOUDINARY_SECRET
        });
    ````
- Add: 
- Inside both the postCreate and postUpdate methods, change: 
    ````
        for(const file of req.files) {
        req.body.post.images.push({
            url: file.secure_url,
            public_id: file.public_id
        });
}
    ````

7/8/19
- ADD CLUSTERED MAPS TO LANDING PAGE AND POSTS INDEX
- Add your mapbox token to the .env file 
- Update Post Model (/models/post.js)
- Update Index Controller (/controllers/index.js)

7/7/19
- Need to modify seeds.js so that the client side js does not break.

7/6/19
- ADD AVERAGE RATING TO POST
- Add an extra user to the database so we have three to make reviews with (run in terminal with server running separately)
    'curl -d "username=bob3&password=password' -X POST http://localhost:3000/register
- Add avgRating property to PostSchema (/models/posts.js)
- Add review model, remove all reviews, and add coordinates to post in seeds.js (/seeds.js)

- ADD PAGE NUMBERS TO POSTS INDEX

- ADD PAGINATION TO POSTS INDEX
- Seed some post data
    - Install faker
    'npm i -S faker'
    - Create a seeds.js file in the root directory /surf-shop and open it 
    - Require faker
    'const faker = require('faker');'
    - Write an async function that removes existing posts and runs a loop that generates 40 posts
    ```JS
    async function seedPosts() {
        await Post.remove({});
        for(const i of new Array(40)) {
            const post = {
                title: faker.lorem.word().
                description: faker.lorem.text(),
                author: {
                   '_id' : '5d40aab18f0dc77cc4821b49',
                    'username' : 'bob'
                }
            }
        }
    }

- ADD CLEAR RATING BUTTON TO 5 STAR RATING FEATURE
- Add a button to the new/edit review forms:
```` HTML
    <button class="clear-rating" type="button>Clear Rating</button>
````
- Add styling to /public/stylesheets/post-show.css
````CSS
    .clear-rating {
        display: block;
    }
````
- Add click listener to the clear rating button in /public/javascripts/post-show.js ( selects and clicks nearest zero star rating input):
````JS
    $('.clear-rating').click(function() {
        $(this).siblings('.input-no-rate').click();
    })
````

7/4/19
- ADD 5 STAR RATING FEATURE
- Add starability-basic.min.css to /public/stylesheets from [here](https://raw.githubusercontent.com/LunarLogic/starability/master/starability-minified/starability-basic.min.css)
    - Review [documentation](https://github.com/LunarLogic/starability)
- Add link to starability-basic.min,css in post-show-layout.ejs
- Add starability syntax to review new and edit forms in post show.ejs
- Customize id's and names
- Add client script inside of .forEach loop for reviews to autho check rating in edit form

-REMOVE REFERENCED REVIEWS WHEN A POST GETS DELETED
- Add pre('remove') hook/middleware to Post model
- Add success flash message to posts controller postDestroy method

7/2/19
- RESTRICT ONE REVIEW PER USER, PER POST
- Populate reviews on post in reviewCreate method (in reviews controller)
- Assign hasReviewed to filtered array's length
- If hasReviewed is true, then flash error and redirect
- Otherwise, create review, add to post.reviews, save post, flash success, and redirect. 

- REMOVE REFERENCED REVIEWS WHEN A POST GETS DELETED
- Add pre('remove') hook/middleware to Post model
- Add success flash message to posts controller postDestroy method

7/1/19
- REVIEW AUTHORIZATION
- Create a second user witl cURL
    - curl -d "username=bob2&password=password" -X POST http://localhost:3000/register
- Change existing reviews's author to new user's id
    - We need a review object's id and replace current author with the other auther object's id. 
    - db.reviews.update({"_id" : ObjectId("5d41c6958292f58e708535f0")}, {$set: {"author": ObjectId("5d42f0e9a49d40979d7af1e8")}});
- Add isReviewAuthor async middleware to PUT route and test it
    - req.user is where we access the user id in the backend
    - the middleware that creates the current user variable is actually setting req.user equal to currentUser to have access in the view, but in the middleware we only have access to req.user.
- Add if statement to EJS
    - currentUser._id is where we access the user id in the client side.

- REVIEW DELETE
- Create a delete button with a form in the post show view
- Update the delet eroute with isReviewAuthor middleware and reviewDestroy method
- In reviewDestroy method:
    - Find post by id and update to pull reviews with matching review_id
    - find review by id and remove
    - flash success 
    - redirect to back to post show

6/30/19
- Working on edit review
    - Add stlye.css to post-show-layout
    - Remove body rule from post-show.css
    - Add toggle edit button to post show view
        - Make sure jquery cdn script is run before any other js code
    - Add edit form to the post show view
    - Add edit-form rule to post-show.css
    - Add jQuery to post-show-layout
    - Add click event listener script to post show view 
        - Toggle text cancel/edit
        - Toggle edit-form visibility

- Understand that the req.body is the JSON file being parsed in as an incoming request and that we wrapped it in reviews, so req.body.review will contain everything that was wrapped in the form eg review[body]

- Plugin a user so that we don't have to keep logging in while in development. cURL tool in the terminal that allows us to use http requests in the terminal.
    - Taking username:bob and password: password and using it to trick our website into thinking that we are always logged in.

- Went back to using our original surf-shop database

- mongo shell commands: db.users.find(), db.users.remove({})

- Using cURL: 
    - curl http://localhost:3000 
    - curl -d "username=bob&password=password" -X POST http://localhost:3000/register
        - "-d" allows us to enter in parameters as if in a form for create user
        - No spaces 
        - Once parameters have been made, we need to tell the request what type of method to use. "-X POST"
        - will see a POST request in nodemon


6/29/19
Set up navbar, add flash messages

# Adding Flash Messges
- Update pre-route middleware to check for error or success on the session
- Update post-route error handling middleware to console.log() the full err, then set err.messafe on req.session.error and redirect('back')
- Create a partial for flash messafes and include it in our layouts 
- Write some success messages and throw some erros to test it out.

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