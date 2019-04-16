const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../other/userQueries');

router.get('/', (req, res) => {
  res.json({
    message: 'Locked'
  });
});

function validUser(user){
  const validEmail = typeof user.email == 'string' && user.email.trim() != '';
  const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;
  return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
  console.log(req.body.email)
  if(validUser(req.body)){
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
  if(validUser(req.body)){
    User.getUserByEmail(req.body.email)
        .then(user => {
          console.log("user",user);
          if (user){
            bcrypt.compare(req.body.password, user.password)
                  .then((result) => {
                    if(result){
                      res.cookie('user_id', user.id, {
                        httpOnly: true,
                        secure: true,
                        signed: true
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
  if(req.signedCookies){
    res.cookie("user_id", "", { expires: new Date(0)});
    res.redirect('/');
  } /*else {
    res.send("You are not logged");
  }*/
});

module.exports = router;
