const express = require('express')
const router = express.Router();

// middleware goes here

const Pins = require('../pins/pins_model');

//[GET] /pins/:pin_id

//[GET] /pins/:maker

//[GET] /pins/:pin_id/iso

//[GET] /pins/:pin_id/have

//[GET] /pins/:tag_name

//[POST] /pins/new_pin

//[UPDATE] /pins/:pin_id

//[DELETE] /pins/:pin_id
// should have admin access

//[POST] /pins/:pin_id
//TODO adding tags to a pin

//[DELETE] /pins/:pin_id
//TODO delete tags from a pin

module.exports = router;