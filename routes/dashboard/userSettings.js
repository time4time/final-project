var express = require('express');
var router = express.Router();
var User = require('../../models/User')
var multer = require("multer")
var bcrypt = require("bcrypt")
var upload = multer({ dest: 'public/images' })

//bcrypt para la nueva password
//control de si la password existe

//image, email, postal code y password

router.post('/profile-image', upload.single('profile-image'), function(req, res, next) {
    let editUser = {}
    editUser.profileImage = req.file.path
    User.findOneAndUpdate({username: req.session.user.username}, editUser)
    .then((response) => {
        res.status(200).json(response)
    })
    .catch((err) => {
        res.status(500).json({message: err})
    })
});


router.post('/user-settings', function(req, res, next) {
    if(req.body.password) {
        debugger
        console.log('nueva password')
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            debugger
            if (err) res.status(500).json({message: err})
            else {
                let editUser = req.body
                editUser.password = hash
                User.findOneAndUpdate({username: req.session.user.username}, editUser)
                .then((response) => {
                    res.status(200).json(response)
                })
                .catch((err) => {
                    res.status(500).json({message: err})
                })
            }
        })
    } else if (!req.body.password){
        debugger
        console.log('password vacia')
        // let editUser = req.body
        let editUser = {}
        req.body.email ? editUser.email = req.body.email : console.log('no email')
        req.body.postalCode ? editUser.postalCode = req.body.postalCode : console.log('no postal code')
        User.findOneAndUpdate({username: req.session.user.username}, editUser)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(500).json({message: err})
        })
    } else {
        res.status(500).json({message: err})
    }
});



module.exports = router;



// router.post('/profile-image', upload.single('profile-image'), function(req, res, next) {
//     debugger
//     if(req.body.password) {
//         debugger
//         console.log('nueva password')
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//             debugger
//             if (err) res.status(500).json({message: err})
//             else {
//                 let editUser = req.body
//                 editUser.profileImage = req.file.path
//                 editUser.password = hash
//                 User.findOneAndUpdate({username: req.session.user.username}, editUser)
//                 .then((response) => {
//                     res.status(200).json(response)
//                 })
//                 .catch((err) => {
//                     res.status(500).json({message: err})
//                 })
//             }
//         })
//     } else if (!req.body.password){
//         debugger
//         console.log('password vacia')
//         // let editUser = req.body
//         let editUser = {}
//         req.body.email ? editUser.email = req.body.email : console.log('no email')
//         req.body.postalCode ? editUser.postalCode = req.body.postalCode : console.log('no postal code')
//         editUser.profileImage = req.file.path
//         User.findOneAndUpdate({username: req.session.user.username}, editUser)
//         .then((response) => {
//             res.status(200).json(response)
//         })
//         .catch((err) => {
//             res.status(500).json({message: err})
//         })
//     } else {
//         res.status(500).json({message: err})
//     }
// });