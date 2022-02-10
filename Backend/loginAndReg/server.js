if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const express = require('express')
  const app = express()
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')
  
  const db = require('../db');

  const initializePassport = require('./passport-config')
  initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  )
  
  const users = []
  
  app.set('view-engine', 'ejs')
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))
  
  //app.get('/', (req, res) => {
  //  res.render('index.ejs', { name: req.user.name })
  //})
  
  //app.get('/login', (req, res) => {
    //console.log("getting login page")
    //res.render('login.html')
  //})
  
  /*
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  */

  app.post('/login', (req, res) => {
    console.log(req.body.password)
    console.log(req.body.email)
    var email = req.body.email;

    var query = 'SELECT password FROM users WHERE username = \''+email+ '\';' // USE THIS TO FIND PASSWORD TO COMPARE TO

    db.one(query) // THIS SHOULD COMPARE THE DB PASSWORD TO THE PASSWORD ENTERED
    .then(function (rows) {
        console.log("Comparing")
        console.log(rows.password)
        console.log(req.body.password)
        if(rows.password == req.body.password)
        {
          console.log("Logged in!")

          var query2 = 'UPDATE users SET loggedin = 0;' // TO UPDATE ALL USERS TO LOGGED OUT BEFORE LOGGEDIN USER IS UPDATED
          db.none(query2)
          .then(()=>{
            console.log("Second stage")
            var query3 = 'UPDATE users SET loggedin = 1 WHERE username = \''+email+ '\';' // SET THE LOGGEDIN VALUE OF CURRENT USER TO 1
            
            db.none(query3)
            .then(()=>{
              console.log("Full login complete")
            })
            .catch(error=>{
              console.log(`Could not login because: ${error.message}`);
            })

          })
          .catch(error=>{
            console.log(`Could not login because: ${error.message}`);
          })
        }       
    })
    .catch(error => { //will enter if the a request is not found in the states table
        console.log(`INCORRECT PASSWORD`);
        // included status errors
        res.status(404).json({msg: `You do not have an account. Please go to the registration page and then come back.`});
    });  

    
    
  })

 // app.get('/register', (req, res) => {
 //   console.log("Getting registration")
 //W   res.render('register.ejs')
 // })
  
 
  app.post('/register', async (req, res) => {
    try {
      //const hashedPassword = await bcrypt.hash(req.body.confPass, 10)
      var id = Math.floor(Date.now() / 10000)

      console.log(id)
      var query = 'INSERT INTO users (userid, username, password, state) VALUES (\''+id+ '\', \''+req.body.email+ '\', \''+req.body.confPass+ '\', \''+req.body.state+ '\');';
      db.none(query)
      .then(() => {
        console.log('added user!');
      })
      .catch(error => {
        console.log(`could not add user because: ${error.message}`);
      });
      // NEED RESPONSE?
    } catch {
      //res.redirect('/Frontend/register.html')
    }
  })

/*
  app.post('/register', function(req, res){
    var id = Math.floor(Date.now() / 10000)
    console.log("Id: ", id)
    var query = 'INSERT INTO users (userid, username, password, state) VALUES (\''+id+ '\', \''+req.body.email+ '\', \''+hashedPassword+ '\', \''+req.body.state+ '\');';
    db.none(query)
      .then(() => {
        console.log('added user!');
      })
      .catch(error => {
        console.log(`could not add user because: ${error.message}`);
      });
  })
  */
  app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })


  app.listen(3000)