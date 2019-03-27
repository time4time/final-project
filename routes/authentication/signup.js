var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');
// const passport = require('../passport-auth/pauth.js');



//check if either username or email are already taken
router.post("/signup", (req, res) => {
    debugger
  const username = req.body.username;
  const email = req.body.email;
  User.findOne({$or:[
      {username: username},
      {email: email},
      ]
    })
    .then(result => {
        debugger
      if (result) {
          debugger
        res.status(409).json({message: 'err'})
      } else {
          debugger
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
            if (err) {
                debugger
                res.json('error')
            }
            else {
                debugger
              res.cookie("username", req.body.username);
              req.session.current = userCreated._doc
              res.json('user created');
            //   passport.authenticate('local')(req, res, ()=> {
            //     res.json('user created');
            //   });
            }
          })
        })
      }
    })
})


module.exports = router;