var express = require('express');
var router = express.Router();
var User = require('../../models/User')


router.get('/my-profile', function(req, res, next) {
    User.findById(req.session.user._id)
      .then((profileInfo) => {
          res.json(profileInfo)
      })
      .catch((err) => {
          res.status(404).json({errorMessage: "Personal information not found"})
      })
})
  

module.exports = router;