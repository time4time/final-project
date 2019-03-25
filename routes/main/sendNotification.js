var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer')
const Offer = require('../../models/Offer')


router.post('/send-mail', (req,res,next) => {

    //step 1
    // take data from offer
    
    Offer.find({id:_id}, {ownerMail: authorMail})
        .then((mailOffer) => res.json(mailOffer))
        .catch(error => console.log(error));

    //step 2 set transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'luis.sanmartin@unix.cl',
            pass: 'h720zmeed'
        }
    });

    //body of email
    transporter.sendMail({
        from:       '"Time for time" <luis.sanmartin@unix.cl>',
        to:         ownerMail,
        subject:    'hiiii',
        text:
        `Alguien ha aplicado a tu cuenta`
        `Puedes revisar la solicitud en el siguiente link`
        `Regards, time for time`
    })
    .then(info => res.json({message: "enviado"}))
    .catch(error => console.log(error));

});