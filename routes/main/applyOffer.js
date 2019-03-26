var express = require('express');
var router = express.Router();
var Offer = require('../../models/Offer')

router.post('/apply', function(req, res, next) {
    let offerId = req.body.offerId;
    let username = req.session.user.username;
    Offer.findByIdAndUpdate(offerId,  
        {$set:{userRequest:username,status:'pending'}})
        .then(() => { 
            console.log('update!');
            res.json({message: "update"});
        })
        .catch(err => { 
            res.json({message: "not updated"});
        });        
})

module.exports = router;