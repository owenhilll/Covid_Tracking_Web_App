const express = require('express');
let router = express.Router();
const db = require('../db');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });



// get request for state covid data 
router.get('/:state', function (req, res) {

    var name = req.params.state.toUpperCase();

    var query = 'SELECT * FROM states WHERE state = \''+name+ '\';';

    db.one(query)//set to one because we are only expecting one row to be returned, if it is zero then that means the req wasnt found
    .then(function (rows) {
        res.status(200).json(rows);
        
    })
    .catch(error => { //will enter if the a request is not found in the states table
        console.log(`not cool`);
        

       
        // included status errors
        res.status(404).json({msg: `The requested state could not be found. ${name} is not a valid state. please enter the two letter abbreviation for the state you are searching for.`});
    });   

        
    
    
    //var i;
    // for(i = 0; i < sampleStateInfo.length; i++)//starts at 0 index of sampleStateInfo[] and will loop through array until sampleStateInfo[i].name matches the request
    // {
    //     if(sampleStateInfo[i].name == name)//found the state
    //     {
    //         return res.json(sampleStateInfo[i]);//returning the object in that index but in json format
    //     }
    // }
    // //if we exit the forloop then the state was not present in the array
    // res.sendStatus(404); 
    // return;
 
});



/*Comment Requests: */


// get request for comments filtered by state 
router.get('/:state/comments', function (req, res) {

    // retrieve user param for which state requested
    var stateName = req.params.state.toUpperCase();

    
    
    var query = 'SELECT username, comment FROM comments INNER JOIN users ON comments.userid = users.userid WHERE users.state = \''+stateName+ '\';';

    db.many(query)//set to many because we are expecting one or more row to be returned, if it is zero then that means the req wasnt found
    .then(function (rows) {
        
        res.status(200).json(rows);
        
    })
    .catch(error => { 
        console.log(`not cool`);
        console.log(error);
        // included status errors
        res.status(404).json({ msg: `Comments for ${stateName} cound not be found. `});      
    });   
    
    
   

});


router.post('/state/comments', urlencodedParser, function (req, res) {
    console.log("you have entered the post request ---");

   //console.log(req)
    //console.log(req.body.username)
    //var user = req.body.username;
    var newComment = req.body.new_comment;
    var query1 = 'SELECT userid FROM users WHERE loggedin = 1;';
    
    var date = '20200831';

    
    db.one(query1)
    .then(function (rows) {
        console.log(rows.userid); 
        userID = rows.userid;
        console.log("userID: " + userID);
        var query = 'INSERT INTO comments (comment, date, userid) VALUES (\''+newComment+ '\', \''+date+ '\', \''+userID+ '\');';
    
        db.none(query)
        .then(() => {
            console.log('added comment!');
        })
        .catch(error => {
        console.log(`could not add comment because: ${error.message}`); 
        });
    
    })
    .catch(error => {
        console.log(`some issue happened: ${error.message}`);
    });
    
    
    
    
    
    
    
    
    
    //var query2 = 'INSERT INTO comments (comment, date, userid) VALUES (\''+newComment+ '\', \''+date+ '\', \''+userID+ '\');';

    


    // db.none(query)
    // .then(() => {
    //     console.log('added comment!');
    // })
    // .catch(error => {
    //     console.log(`could not add comment because: ${error.message}`);
    // });


    

    
    
    //console.log(req.body.new_comment);
    
    //var user = user
    //var date = current date
    
    

    
    

});



module.exports = router;
