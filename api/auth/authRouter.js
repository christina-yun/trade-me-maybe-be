const express = require('express')
const router = express.Router();

const Users = require('../users/users_model')

// middleware goes here


//[POST] /auth/register
router.post('/register', (req, res, next) => {
    Users.create(req.body)
    .then((newUser) => {
        res.status(201).json(newUser)
    })
    .catch(next)
})

//[POST] /auth/login
router.post('/login', (req, res, next) => {
    try{
        res.status(200).json({
            user_id: req.user_id,
            message: `Welcome back ${req.body.username}`,
            token: req.token
        })
    } catch(err){
        next(err)
    }
})
module.exports = router;