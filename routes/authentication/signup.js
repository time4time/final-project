var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');


// CONTROLAR QUE NO EXISTAN NI EMAIL NI USERNAME

router.post("/signup", (req, res) => {
  const username = req.body.username;
  User.findOne({
      username: username
    })
    .then(result => {
      if (result) {
        res.status(409).json('user already exists')
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          newUser = {
            username: req.body.username,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
          }
          User.create(newUser, (err) => {
            if (err) res.json('error')
            else {
              res.cookie("username", req.body.username);
              req.session.user = result._doc
              res.json('user created');
            }
          })
        })
      }
    })
})


module.exports = router;