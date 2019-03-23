var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');

router.post("/login", (req, res)=> {

  debugger
  User.findOne({username: req.body.username})
    .then((result)=> {
      if(bcrypt.compareSync(req.body.password, result.password)) {
        debugger
        req.session.user = result._doc
        res.status(200).send({...result._doc})
        res.cookie("username", req.body.username);
      }
      else res.status(403).json({username: "Invalid credentials"})
    })
    .catch((error)=> {
      res.status(500).json(error)
    })
})


module.exports = router;