const express = require('express');
const schedule = require('./schedule');
const cors = require('cors');


// entry point for the app
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT);
app.use(cors());

schedule.scheduler;
// express router for state data (api methods are in ./routes/states.js)
app.use('/covid_data', require('./routes/states'));
// default response for any request not specified yet
app.use(function (req, res) {
    res.sendStatus(404);
});

/*

***** To run app, cd into backend folder, then enter 'npm run dev' into the terminal.
***** Then in browser type 'localhost:5000' to send requests.
***** for example: localhost:5000/covid_data/Colorado will display Colorado. localhost:5000/ will return not found because that
endpoint has not been specified yet.

*/


/*
App Instructions:

1. Setting Up Local Database: *************ONLY NEEDS TO BE DONE ONCE*****************

    To create your local db, first start up your db server (pgadmin or sign in to postgres using your terminal) and run the commands in database.sql in your db command line or pgadmin (** if you are using pgadmin
    you need to manually create a db named covid_group **). After that,
    change the password field in db.js to your password that you use to access your local db. Once you have made those changes start up the app by first using 'cd ./Backend', then running the
    'npm run dev' command and follow the instructions in schedule.js to populate your db with state data.

2. Running The Application: **Step 1 must be completed at least once**

        open a terminal (either the integrated VSCode one or your OS's terminal). cd into our project and into the Backend folder ('cd ./114-3/Backend). Then run the 'npm run dev' command.
        If the app opened successfully you should see '[nodemon] starting `node index index.js' in your terminal. If not run the 'npm install' command and try running the app again with
        'npm run dev'. When you want to stop the application open your terminal and use ctrl (cmd for Mac) + c, then press y and the enter key. ****** MAKE SURE YOUR DATABASE IS RUNNING IN THE BACKGROUND AND db.js HAS YOUR PASSWORD*********


3. Routes:

        Completed routes that are functional will be listed here. Any routes that are in dev will be marked 'DEV'. To test the routes you can open a browser and enter 'localhost:5000' and then the route you want to test.
        As an example if you wanted to test out a GET request for the states route using Colorado, you would enter the url: 'localhost:5000/covid_data/CO'. Once you go to that url you should be given a JSON object with covid
        data for the state of Colorado.

        1) './covid_data/{state}' [GET]: provides covid statistics about the requested state. stats include hospitalizations, deaths, and more. If stat not available for the specified state, then null will be returned for that
        stat. The request state must be in the format of the states abbreviation. Colorado -> CO, California -> CA, New York -> NY. If the state is not valid either by incorrect formatting or the state doesn't exist, a JSON response will be
        sent that has an error message under the 'msg' field and the status code for the request will be 404.

            example request = 'localhost:5000/covid_data/CO'.

        2) '/covid_data/{state}/comments' [GET]: provides the comments from users for that requested state. for instance if a request is sent for New York, then all the comments for the state of New York will be returned. If incorrect or the state has no comments
        a JSON response will be sent that has an error message under the 'msg' field and the status code for the request will be 404.

            example request = 'localhost:5000/covid_data/TX/comments'.

        3) '/covid_data/{state}/comments' [**DEV** POST]: when a new comment is entered, the post will query for the current logged in user's userid and inserts the new comment into the comments table by the logged in user. This comment will now be displayed whenever a user 
        requests to see the comments of the state that the user who made the comment is from. Example: a user from texas with a userid 5 makes a comment "hello". This is added to the database. Then when a user selects Texas from the dropdown, the username of the texas user and their comment will be displayed along with any other comments made by any texas user.

 ***************************
 */
