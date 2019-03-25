var express = require('express');
var router = express.Router();
var Offer = require('../../models/Offer')

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// implementar sessions, con la session
router.post('/publish-offer', function (req,res) {
    console.log(req.session.user)
    let addOffer = {
        author:         req.session.user._id,
        authorUsername: req.session.user.username,
        postalCode:     req.body.postalcode,
        title :         req.body.title,
        description :   req.body.description,
        date :          req.body.date,
        duration :      req.body.duration,
        category :      req.body.category,
        status:         'open'
    }

    const newOffer = new Offer(addOffer);
    newOffer.save()
    .then((newOfferDocument) => {
        res.json(newOfferDocument)
    })
    .catch((err) => {
        res.status(404).json({errorMessage: "offer not created"})
    })

})

module.exports = router;