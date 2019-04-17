const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../other/userQueries');

router.get('/', (req, res) => {
  res.json({
    message: 'Locked'
  });
});

router.post('/signup', (req, res, next) => {
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Password is invalid').isLength({min: 6}).equals(req.body.confirmPassword);
  var errors = req.validationErrors();
  if(!errors){
    User
      .getUserByEmail(req.body.email)
      .then(user => {
        console.log('user', user);
        if (!user){
          bcrypt.hash(req.body.password, 10).then((hash) => {
            const user = {
              email: req.body.email,
              password: hash
            };
            User.create(user).then(id => {
              res.json({
                id,
                messagge: "Logged"
              });
            });
          });
        } else {
          next(new Error("Email in use!"));
        }
    });
  } else {
    next(new Error('Invalid user'));
  }
});


router.post('/login', (req, res, next) => {
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Password is invalid').isLength({min: 6});
  var errors = req.validationErrors();
  if(!errors){
    User.getUserByEmail(req.body.email)
        .then(user => {
          console.log("user",user);
          if (user){
            bcrypt.compare(req.body.password, user.password)
                  .then((result) => {
                    if(result){
                      res.cookie('user_id', user.id, {
                        httpOnly: true,
                        signed: true
                        //adding secure remove the cookies from signedCookies I don't know why
                      });
                      res.json({
                        message: "Logged in!"
                      });
                    } else {
                      next(new Error("Invalid login"));
                    }
                  });
          } else {
            next(new Error("Invalid login"));
          }
        });
  } else {
    next(new Error("Invalid login"));
  }
});

router.post('/logout', (req, res, next) => {
  console.log(req.signedCookies);
  if(req.signedCookies.user_id){
    res.cookie("user_id", "", { expires: new Date(0)});
    res.redirect('/auth');
  } else {
    res.send("You are not logged");
  }
});

module.exports = router;
