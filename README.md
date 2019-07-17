# surf-shop

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