var express = require('express');
var router = express.Router();
var Offer = require('../../models/Offer')

//find user request and pending status
router.get('/my-offers-requested', function(req, res, next) {
    let username = req.session.user.username
    Offer.find()
      .and([
        {status:'Pending'},
        {authorUsername: username}])
        .then((myOffersRequested) =>{
            res.json(myOffersRequested)
        }) 
        .catch((err) =>{
            res.status(404).json({errorMessage: 'not found'})
        })
});

router.post('/approve-offer', function(req, res, next) {
    Offer.findByIdAndUpdate(req.body.offerId, {status: 'Approved'})
    .then((offerApproved) => {
        res.json(offerApproved)
    })
    .catch((err) => {
        res.status(404).json({errorMessage: 'Offer could not be approved'})
    })
})

module.exports = router;