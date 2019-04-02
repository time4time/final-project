var express = require('express');
var router = express.Router();
var User = require('../../models/User')


router.get('/my-profile', function(req, res, next) {
    debugger
    User.findById(req.session.user._id)
      .then((profileInfo) => {
          debugger
          res.json(profileInfo)
      })
      .catch((err) => {
          debugger
          res.status(404).json({errorMessage: "Personal information not found"})
      })
})
  

module.exports = router;