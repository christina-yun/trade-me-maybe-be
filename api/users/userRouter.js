const express = require("express");
const router = express.Router();

// middleware goes here

const Users = require("../users/users_model");

// [GET] /users/:user_id
// restricted, checkIfUserExists
router.get("/:user_id", (req, res, next) => {
    Users.findUser({user_id: req.params.user_id})
    .then((user) => {
        res.status(200).json(user)
    })
    .catch(next)
});

// [GET] /users/:user_id/iso
// restricted, checkIfUserExists
router.get("/:user_id/iso", (req, res, next) => {
    Users.findUserIso(req.params.user_id)
    .then((iso => {
        res.status(200).json(iso)
    }))
    .catch(next)
});

// [GET] /users/:user_id/have
router.get("/user_id/have", (req, res, next) => {});

// [PUT] /users/:user_id
//TODO middleware that checks current user matches :user_id
//TODO need to figure out a way to make sure only that particular logged in user can update their own account
//restricted, checkifUserExists, checkUser
router.put("/:user_id", (req, res, next) => {});

//TODO how to handle updating password?

// [DELETE] /users/:user_id
//TODO need to figure out a way to make sure only that particular logged in user or an admin can delete the account
//restricted, checkIfUserExists/checkUser
router.delete("/:user_id", (req, res, next) => {});

module.exports = router;
