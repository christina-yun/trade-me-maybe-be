const express = require('express')
const router = express.Router();

// middleware goes here

const Users = require('../users/users_model')

// [GET] /users/:user_id

// [GET] /users/:user_id/iso

// [GET] /users/:user_id/have

// [PUT] /users/:user_id
//TODO need to figure out a way to make sure only that particular logged in user can update their own account
//TODO how to handle updating password?

// [DELETE] /users/:user_id
//TODO need to figure out a way to make sure only that particular logged in user can delete their own account

module.exports = router;