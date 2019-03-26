require('dotenv').config();
var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer')
const Offer = require('../../models/Offer')


router.post('/send-mail', (req,res,next) => {
    //step 1
    // take data from offer
    let offerId = req.body.offerId;
    debugger
    Offer.findById(offerId)
        .then((mailOffer) =>{ 
            //step 2 set transport
            debugger
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'iyanezm@gmail.com',
                    pass: 'Sputnik2327'
                }
            });
            debugger
            transporter.sendMail({
                from:       '"Time for time" <iyanezm@gmail.com>',
                to:         mailOffer.authorMail,
                subject:    'You have a new request from time for time',
                text: 
                    `Somebody has sent an application for your offer, you can check this petition in our site.
                    Best regards, 
                    Time for Time team <3 `
            })
            debugger
            return mailOffer;
            }).then((mailOffer) => {
                debugger
                res.status(200).json(mailOffer)
            }).catch(error =>{ 
                    debugger
                 res.status(500).json(error)
                });
});


module.exports = router;