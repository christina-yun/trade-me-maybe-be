const express = require('express')
const router = express.Router();

const { restricted } = require('../middleware/authMiddleware');  

const Pins = require('../pins/pins_model');

//[GET] /pins/:pin_id
router.get('/:pin_id', (req, res, next) => {
    Pins.findById(req.params.pin_id)
    .then((pin) => {
        res.status(200).json(pin)
    })
    .catch(next);
})

//[GET] /pins/maker/:maker
//TODO frontend needs to convert spaces to '-' to store in the backend
router.get('/maker/:maker', (req, res, next) => {
    Pins.findByMaker(req.params.maker)
    .then((pins) => {
        res.status(200).json(pins)
    })
    .catch(next)
})

//[GET] /pins/:pin_id/iso
router.get('/:pin_id/iso', (req, res, next) => {
    Pins.findUsersIsoPin(req.params.pin_id)
    .then((users) => {
        res.status(200).json(users)
    })
    .catch(next)
})

//[GET] /pins/:pin_id/have
router.get('/:pin_id/have', (req, res, next) => {
    Pins.findUsersWhoHavePin(req.params.pin_id)
    .then((users) => {
        res.status(200).json(users)
    })
    .catch()
})

//TODO need a way to attach pins a user has to their profile (post)

//TODO need a way to attach pins a user ISO to their profile(post)

//TODO need a way to delete a pin from have

//TODO need a way to delete a pin from ISO

//[GET] /pins/tags/:tag_name
router.get('/tags/:tag_name', (req, res, next) => {})

//[POST] /pins/
router.post('/', (req, res, next) => {})

//[PUT] /pins/:pin_id
router.put('/:pin_id', (req, res, next) => {})

//[DELETE] /pins/:pin_id
// should have admin access
router.delete('/:pin_id', (req, res, next) => {})

//[POST] /pins/tags/:pin_id
//TODO adding tags to a pin
router.post('/:pin_id', (req, res, next) => {})

//[DELETE] /pins/tags/:pin_id
//TODO delete tags from a pin
router.delete('/tags/:pin_id', (req, res, next) => {})

module.exports = router;
