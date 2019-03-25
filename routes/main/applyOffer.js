var express = require('express');
var router = express.Router();
var Offer = require('../../models/Offer')

router.post('/apply', function(req, res, next) {
    let offerId = req.body.plantId;
    let username = req.session.user.username;

    Offer.findByIdAndUpdate(offerId, { $push: {status:'pending',username:username}})
        .then(() => { 
            console.log('update!');
            res.json({message: "offer saved"});
        })
        .catch(err => { 
            res.json({message: "error"});
        });
});


