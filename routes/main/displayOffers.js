var express = require('express');
var router = express.Router();
var Offer = require('../../models/Offer')
var moment = require('moment')
moment().format()

router.get('/display-offers', function(req, res, next) {



  Offer.find({status:'open'})

    .then((allOffers) => {
        // debugger
        // for(i=0;i<allOffers.length;i++){
        //     let parsedDate = moment(allOffers[i].date).format('dd/mm/yyyy')
        //     allOffers[i].parsedDate=parsedDate
        // }
        res.json(allOffers)
    })
    .catch((err) => {
        res.status(404).json({errorMessage: "Offers not found"})
    })

    // Offer.find({status:'open'})
    // .populate('user')
    //     .then((allOffers)=>{
    //         debugger
    //         console.log(allOffers)
    //         res.json(allOffers)
    //     })
    //     .catch((err)=>{
    //         res.status(404).json({errorMessage: 'not found'})
    //     })
        
    })












module.exports = router;