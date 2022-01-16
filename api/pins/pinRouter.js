const express = require("express");
const router = express.Router();

const { restricted } = require("../middleware/authMiddleware");
const { convertForDB } = require("../middleware/pinMiddleware");

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
//TODO frontend needs to convert spaces to '-' before sending the request
router.get("/maker/:maker", (req, res, next) => {
  Pins.findByMaker(req.params.maker)
    .then((pins) => {
      res.status(200).json(pins);
    })
    .catch(next);
});

//[GET] /pins/:pin_id/iso
// checkPinExists
router.get("/:pin_id/iso", (req, res, next) => {
  Pins.findUsersIsoPin(req.params.pin_id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

//[GET] /pins/:pin_id/have
//checkPinExists
router.get("/:pin_id/have", (req, res, next) => {
  Pins.findUsersWhoHavePin(req.params.pin_id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

//[POST] /pins/:pin_id/have
//TODO need a way to attach pins a user has to their profile (post)

//[POST] /pins/:pin_id/iso

//[DELETE] /pins/:pin_id/have
//TODO need a way to delete a pin from have

// [DELETE] /pins/:pin_id/iso
//TODO need a way to delete a pin from ISO

//[POST] /pins/
//noDupes
router.post("/", convertForDB, (req, res, next) => {
  Pins.createPin(req.body)
    .then((new_pin) => {
      res.status(201).json(new_pin);
    })
    .catch(next);
});

//[PUT] /pins/:pin_id
//TODO needs some kind of validation for imgurl and maker
// checkIfPinExists
router.put("/:pin_id", convertForDB, (req, res, next) => {
  Pins.updatePin(req.params.pin_id, req.body)
    .then((updated_pin) => {
      res.status(200).json(updated_pin);
    })
    .catch(next);
});

//[DELETE] /pins/:pin_id
// should have admin access to delete pin from database
//middleware - checkIfPinExists
router.delete("/:pin_id", (req, res, next) => {
  Pins.removePin(req.params.pin_id)
    .then(() => {
      res.status(200).json({ message: "Pin deleted!" });
    })
    .catch(next);
});

//TAGS stuff
//[GET] /pins/tags/:tag_name
// checkIfTagExists
router.get("/tags/:tag_name", convertForDB,  (req, res, next) => {
  Pins.findByTag(req.params.tag_name)
    .then((pins) => {
      res.status(200).json(pins);
    })
    .catch(next);
});



//[POST] /pins/:pin_id/tags
//middleware: checkIfPinExists, noTagDupes
router.post("/:pin_id/tags", convertForDB, (req, res, next) => {
  req.body.pin_id = req.params.pin_id;
  console.log(req.body)

  Pins.createTag(req.body)
    .then((new_tag) => {
      res.status(201).json(new_tag);
    })
    .catch(next);
});

//[DELETE] /pins/tags/:pin_id
//middleware:checkIfPinExists, checkIfTagExists
router.delete("/:pin_id/tags/:tag_id", convertForDB, (req, res, next) => {
  Pins.removeTag(req.params.tag_id)
    .then(() => {
      res.status(200).json({ message: "Tag deleted!" });
    })
    .catch(next);
});

module.exports = router;
