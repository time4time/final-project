var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');


router.post("/login", (req, res) => {
  console.log(req.body)
  User.findOne({
      username: req.body.username
    })
    .then((result) => {
      if(!result) {
        res.status(401).json({errorMessage: "invalid credentials"})
        return;
      }
      else {
        bcrypt.compare(req.body.password, result.password, (err,equal)=>{
          if(err) res.status(401).json({errorMessage: 'error'})
          else if(equal) {
          res.cookie("username", req.body.username);
          req.session.user = result._doc
          res.status(200).send({
              message: "great success",
              user:result
          })}
        })
      }
    })
    .catch((error) => {
      res.json(error)
    })
})


module.exports = router;