var express = require('express');
var router = express.Router();
var Offer = require('../../models/Offer')
var User = require('../../models/User')

//find user request and pending status
// router.get('/my-offers-requested', function(req, res, next) {
//     let username = req.session.user.username
//     Offer.find()
//       .and([
//         {status:'Pending'},
//         {authorUsername: username}])
//         .then((myOffersRequested) =>{
//             res.json(myOffersRequested)
//         }) 
//         .catch((err) =>{
//             res.status(404).json({errorMessage: 'not found'})
//         })
// });

router.get('/my-offers', function(req, res, next) {
    let username = req.session.user.username
    Offer.find({authorUsername: username})
        .then((myOffers) =>{
            res.json(myOffers)
        }) 
        .catch((err) =>{
            res.status(404).json({errorMessage: 'not found'})
        })
});

router.post('/approve-offer', function(req, res, next) {
    debugger
    Offer.findByIdAndUpdate(req.body.offerId, {status: 'Approved'}, {new: true})
    .then((offerApproved) => {
        debugger
        res.json(offerApproved)
    })
    .catch((err) => {
        debugger
        res.status(404).json({errorMessage: 'Offer could not be approved'})
    })
})


router.post('/update-time-wallet', function(req, res, next) {
    Offer.findById(req.body.offerId)
    .then((offerApproved) => {
        let offerDuration = offerApproved.duration
        let userThatRequested = offerApproved.userRequest
        User.findByIdAndUpdate(req.session.user._id, { $inc: {timeWallet: offerDuration}}, {new: true})
            .then((authorOfferUpdated) => {
                res.json(authorOfferUpdated)
            })
            .catch((err) => {
                res.status(400).json({errorMessage: 'Could not find offer author and update their time wallet'})
            })
        User.findOneAndUpdate({username: userThatRequested}, { $inc: {timeWallet: -offerDuration}}, {new: true})
            .then((userRequestUpdated) => {
                res.json(userRequestUpdated)
            })
            .catch((err) => {
                res.status(400).json({errorMessage: 'Could not find the user that requested the offer and update their time wallet'})
            })
    })
    .catch((err) => {
        res.status(404).json({errorMessage: 'Time wallet could not be updated'})
    })

})


module.exports = router;