
6/15/19
MVC - (M)odels (V)iews (C)ontrollers
Express application generator

6/15/19
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
