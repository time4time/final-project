var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const passport = require('../passport-auth/pauth.js');



//check if username or email it's already taken
router.post("/signup", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  User.findOne({$or:[
      {username: username},
      {email: email},
      ]
    })
    .then(result => {
      if (result) {
        res.status(409).json({message: 'err'})
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          newUser = {
            firstname:        req.body.firstname,
            lastname:         req.body.lastname,
            username:         req.body.username,
            email:            req.body.email,
            birth:            req.body.birth,
            postalCode:       req.body.postalcode,
            password:         hash,
            registrationDate: Date.now(),
            profileImage:     ''            
          }
          User.create(newUser, (err,userCreated) => {
            if (err) res.json('error')
            else {

              res.cookie("username", req.body.username);
              req.session.current = userCreated._doc
              passport.authenticate('local')(req, res, ()=> {
                res.json('user created');
              });
              
            }
          })
        })
      }
    })
})


module.exports = router;