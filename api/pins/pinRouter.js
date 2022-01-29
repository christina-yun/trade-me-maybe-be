const express = require("express");
const router = express.Router();

const { restricted } = require("../middleware/authMiddleware");
const {
  convertForDB,
  checkIfPinExists,
  noPinDupes,
  checkIfTagExists,
  noTagDupes,
  checkIfMakerExists,
  checkUser,
  onlyOnce,
} = require("../middleware/pinMiddleware");

const Pins = require("../pins/pins_model");

//[GET] /pins/:pin_id
router.get("/:pin_id",restricted,  checkIfPinExists, (req, res, next) => {
  Pins.findById(req.params.pin_id)
    .then((pin) => {
      res.status(200).json(pin);
    })
    .catch(next);
});

//[GET] /pins/maker/:maker
//TODO frontend needs to convert spaces to '-' before sending the request
router.get("/maker/:maker", restricted, checkIfMakerExists, (req, res, next) => {
  Pins.findByMaker(req.params.maker)
    .then((pins) => {
      res.status(200).json(pins);
    })
    .catch(next);
});

//[GET] /pins/:pin_id/iso
router.get("/:pin_id/iso", restricted, checkIfPinExists, (req, res, next) => {
  Pins.findUsersIsoPin(req.params.pin_id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

//[GET] /pins/:pin_id/have
router.get("/:pin_id/have", restricted, checkIfPinExists, (req, res, next) => {
  Pins.findUsersWhoHavePin(req.params.pin_id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

//[POST] /pins/:pin_id/have
router.post("/:pin_id/have", restricted, checkIfPinExists, onlyOnce, (req, res, next) => {
  const pinHave = {
    user_id: req.decodedToken.subject,
    pin_id: parseInt(req.params.pin_id),
  };

  Pins.addHave(pinHave)
    .then((have) => {
      res.status(201).json(have);
    })
    .catch(next);
});

//[POST] /pins/:pin_id/iso
router.post("/:pin_id/iso", restricted, checkIfPinExists, onlyOnce, (req, res, next) => {
  const pinIso = {
    user_id: req.decodedToken.subject,
    pin_id: parseInt(req.params.pin_id),
  };

  Pins.addISO(pinIso)
    .then((iso) => {
      res.status(201).json(iso)
    })
    .catch(next);
});

//[DELETE] /pins/:pin_id/have/:have_id
router.delete("/:pin_id/have/:have_id", restricted, checkIfPinExists, checkUser, (req, res, next) => {

  Pins.removeHave(req.params.have_id)
  .then((removed) => {
    res.status(200).json(removed)
  })
  .catch(next)
})

// [DELETE] /pins/:pin_id/iso/:iso_id
router.delete("/:pin_id/iso/:iso_id", restricted, checkIfPinExists, checkUser, (req, res, next) => {
  
  Pins.removeISO(req.params.iso_id)
  .then((removed) => {
    res.status(200).json(removed)
  })
  .catch(next)
})

//[POST] /pins/
//TODO validation that all fields are correct
router.post("/", restricted, convertForDB, noPinDupes, (req, res, next) => {
  Pins.createPin(req.body)
    .then((new_pin) => {
      res.status(201).json(new_pin);
    })
    .catch(next);
});

//[PUT] /pins/:pin_id
//TODO needs some kind of validation middleware for imgurl and maker
router.put("/:pin_id", restricted, checkIfPinExists, convertForDB, (req, res, next) => {
  Pins.updatePin(req.params.pin_id, req.body)
    .then((updated_pin) => {
      res.status(200).json(updated_pin);
    })
    .catch(next);
});

//[DELETE] /pins/:pin_id
// should have admin access to delete pin from database
router.delete("/:pin_id", restricted, checkIfPinExists, (req, res, next) => {
  Pins.removePin(req.params.pin_id)
    .then(() => {
      res.status(200).json({ message: "Pin deleted!" });
    })
    .catch(next);
});

//TAGS stuff
//[GET] /pins/tags/:tag_name
router.get("/tags/:tag_name", restricted, checkIfTagExists, convertForDB, (req, res, next) => {
  Pins.findByTag(req.params.tag_name)
    .then((pins) => {
      res.status(200).json(pins);
    })
    .catch(next);
});

// [GET] /pins/:pin_id/tags
router.get("/:pin_id/tags", restricted, checkIfPinExists, (req, res, next) => {
  Pins.findTagsByPin(req.params.pin_id)
  .then((tags) => {
    res.status(200).json(tags)
  })
  .catch(next);
})

//[POST] /pins/:pin_id/tags
router.post("/:pin_id/tags", restricted, convertForDB, checkIfPinExists, noTagDupes, (req, res, next) => {
  req.body.pin_id = req.params.pin_id;

  Pins.createTag(req.body)
    .then((new_tag) => {
      res.status(201).json(new_tag);
    })
    .catch(next);
});

//[DELETE] /pins/:pin_id/tags/:tag_name
router.delete("/:pin_id/tags/:tag_name", restricted, convertForDB, checkIfPinExists, checkIfTagExists, (req, res, next) => {
  Pins.removeTag(req.params.pin_id, req.params.tag_name)
    .then(() => {
      res.status(200).json({ message: "Tag deleted!" });
    })
    .catch(next);
});

module.exports = router;
