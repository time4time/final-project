require('dotenv').config({ path: '../../.env' });
var express = require('express');
var router = express.Router();
const Chatkit = require('@pusher/chatkit-server')


// const chatkit = new Chatkit.default({
//     instanceLocator: 'v1:us1:f51d67d6-018a-4569-b4d8-59e517592a01',
//     key: '994a6519-dd57-4156-87d4-a0641a70b79f:kFzgXpiWgEIvO+DuUq6uiXJEHSb19tU0RXbhisIty9A=',
// })

const chatkit = new Chatkit.default({
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
    key: process.env.CHATKIT_SECRET_KEY,
});
  
router.post('/chat-users', (req, res) => {
    const { username } = req.body
    chatkit
        .createUser({
            id: username,
            name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
        if (error.error === 'services/chatkit/user_already_exists') {
            res.sendStatus(200)
        } else {
            res.status(error.status).json(error)
        }
    })
})


router.post('/authenticate', (req, res) => {
    const authData = chatkit.authenticate({ userId: req.query.user_id })
    res.status(authData.status).send(authData.body)
})


module.exports = router;