var express = require('express');
var router = express.Router();
var Offer = require('../../models/Offer')

router.get('/display-offers', function(req, res, next) {

  Offer.find({status:'open'})
    .then((allOffers) => {
        res.json(allOffers)
    })
    .catch((err) => {
        res.status(404).json({errorMessage: "Offers not found"})
    })
});



module.exports = router;