var express = require('express');
var router = express.Router();
var User = require('../../models/User')
var Review = require('../../models/Review')
var multer = require("multer")
var upload = multer({ dest: 'public/images' })

router.get('/author-profile/:id', function(req, res, next) {
  //find by author id 
  let {id} = req.params;
  User.findById(id)
    .then((authorProfile) => {
      if(!authorProfile) {
        res.status(404).json({errorMessage:"user not found"})
      } else res.status(200).json(authorProfile)
    })
    .catch((err)=>{
          res.status(500).json({errorMessage: 'author data not found'});
    });
});

router.post('/author-profile', upload.single('review-image'), function(req, res, next) {
    debugger
    let addReview = {
        rating: req.body.rate1,
        opinion: req.body.opinion,
        date: req.body.date,
        picture: req.file.path,
        reviewer: req.session.user._id,
    }
    debugger
    Review.create(addReview, (err, reviewCreated) => {
        if(err) res.json('error')
        else res.json(reviewCreated)
    })
})

router.post('/user-reviewed-id', function(req, res, next) {
    //populate
    Review.findByIdAndUpdate(req.body.newReviewId, {userReviewed: req.body.userReviewedId}, {new: true})
        .then((reviewUpdated) => {
            debugger
            res.status(200).json(reviewUpdated)
        })
        .catch(err => {
            debugger
            res.status(500).json({errorMessage: 'Could not update review'})
        })
})

router.get('/get-reviews', function(req, res, next){
    debugger
    Review.find({})
        .then((allReviews) => {
            debugger
            res.status(200).json(allReviews)
        })
        .catch(err => {
            debugger
            res.status(500).json({errorMessage: 'Could not find any reviews'})
        })
})

router.post('/reviewer', function(req, res, next) {
    debugger
    User.findById(req.body.reviewerId)
        .then((reviewer) => {
            debugger
            res.status(200).json(reviewer)
        })
        .catch(err => {
            debugger
            res.status(500).json({errorMessage: 'Could not find the user that made the review'})
        })
})

// Tank.create({ size: 'small' }, function (err, small) {
//     if (err) return handleError(err);
//     // saved!
// });


module.exports = router;