const db = require("../data/db-config");

function convertForDB(req, res, next) {
  let makerOrTag = req.body.maker ? req.body.maker : req.body.tag_name;

  const lowerCaseMaker = makerOrTag.toLowerCase();
  let saveToDB = "";
  let i = 0;

  while (i < lowerCaseMaker.length) {
    if (lowerCaseMaker[i] === " ") {
      saveToDB += "-";
    } else {
      saveToDB += lowerCaseMaker[i];
    }
    i++;
  }
  if (req.body.maker) {
    req.body.maker = saveToDB;
  } else {
    req.body.tag_name = saveToDB;
  }
  next();
}

async function checkIfPinExists(req, res, next) {
  const pin_id = req.params.pin_id;

  let pinExists = await db("pins").where("pin_id", pin_id).first();

  if (pinExists) {
    next();
  } else {
    next({ status: 404, message: "That pin doesn't exist!" });
  }
}

async function noPinDupes(req, res, next) {
    
}

function checkIfTagExists(req, res, next) {}

function noTagDupes(req, res, next) {}

module.exports = {
  convertForDB,
  checkIfPinExists,
  checkIfTagExists,
  noPinDupes,
  noTagDupes,
};
