var express = require('express')
var router = express.Router()


router.get('/*', (req, res, next) => {
    if(!req.session.currentUser) res.status(403).json({message: "Unauthorized"})
    else next()
})

module.exports = router