const express = require("express");
const router = express.Router();

const { restricted } = require("../middleware/authMiddleware");
const { convertForDB } = require('../middleware/pinMiddleware')

const Pins = require("../pins/pins_model");

//[GET] /pins/:pin_id
router.get("/:pin_id", (req, res, next) => {
  Pins.findById(req.params.pin_id)
    .then((pin) => {
      res.status(200).json(pin);
    })
    .catch(next);
});

//[GET] /pins/maker/:maker
//TODO frontend needs to convert spaces to '-' to store in the backend
router.get("/maker/:maker", (req, res, next) => {
  Pins.findByMaker(req.params.maker)
    .then((pins) => {
      res.status(200).json(pins);
    })
    .catch(next);
});

//[GET] /pins/:pin_id/iso
router.get("/:pin_id/iso", (req, res, next) => {
  Pins.findUsersIsoPin(req.params.pin_id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

//[GET] /pins/:pin_id/have
router.get("/:pin_id/have", (req, res, next) => {
  Pins.findUsersWhoHavePin(req.params.pin_id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch();
});

//TODO need a way to attach pins a user has to their profile (post)

//TODO need a way to attach pins a user ISO to their profile(post)

//TODO need a way to delete a pin from have

//TODO need a way to delete a pin from ISO

//[GET] /pins/tags/:tag_name
router.get("/tags/:tag_name", (req, res, next) => {
  Pins.findByTag(req.params.tag_name)
    .then((pins) => {
      res.status(200).json(pins);
    })
    .catch(next);
});

//[POST] /pins/
router.post("/", convertForDB, (req, res, next) => {
  Pins.create(req.body)
    .then((new_pin) => {
      res.status(201).json(new_pin);
    })
    .catch(next);
});

//[PUT] /pins/:pin_id
//TODO needs some kind of validation for imgurl and maker
router.put("/:pin_id", convertForDB, (req, res, next) => {
  Pins.update(req.params.pin_id, req.body)
    .then((updated_pin) => {
      res.status(200).json(updated_pin);
    })
    .catch(next);
});

//[DELETE] /pins/:pin_id
// should have admin access to delete pin from database
router.delete("/:pin_id", (req, res, next) => {
  Pins.remove(req.params.pin_id)
    .then(() => {
      res.status(200).json({ message: "Pin deleted!" });
    })
    .catch(next);
});

//[POST] /pins/tags/:pin_id
//TODO adding tags to a pin
router.post("/:pin_id", (req, res, next) => {});

//[DELETE] /pins/tags/:pin_id
//TODO delete tags from a pin
router.delete("/tags/:pin_id", (req, res, next) => {});

module.exports = router;
