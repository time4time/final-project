var express = require('express');
var router = express.Router();
var User = require('../../models/User')

router.get('/author-profile/:id', function(req, res, next) {
  debugger
  //find by author id 
  let {id} = req.params;
  debugger
  User.findById(id)
    .then((authorProfile) => {
      if(!authorProfile) {
        res.status(404).json({errorMessage:"user not found"})
        return;
      }
      debugger
          res.status(200).json(authorProfile)
    })
    .catch((err)=>{
      debugger
          res.status(500).json({errorMessage: 'author data not found'});
    });
  

});

module.exports = router;