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

async function checkIfMakerExists(req, res, next) {
  const maker = req.params.maker;

  let makerExists = await db("pins").where("maker", maker).first();

  if (makerExists) {
    next();
  } else {
    next({ status: 404, message: "That maker doesn't exist!" });
  }
}

async function noPinDupes(req, res, next) {
  const pin = req.body;

  let dupe = await db("pins").where({ pin_name: pin.pin_name }).first();

  if (!dupe) {
    next();
  } else {
    next({ status: 401, message: "That pin already exists!" });
  }
}

async function checkIfTagExists(req, res, next) {
  const tag_name = req.params.tag_name;

  let tagExists = await db("pin_tags").where("tag_name", tag_name).first();

  if (tagExists) {
    next();
  } else {
    next({ status: 404, message: "That tag doesn't exist" });
  }
}

async function noTagDupes(req, res, next) {
  const tag_name = req.body.tag_name;
  const pin_id = req.params.pin_id;

  let tagDupe = await db("pin_tags")
    .where({ pin_id: pin_id, tag_name: tag_name })
    .first();

  if (!tagDupe) {
    next();
  } else {
    next({ status: 401, message: "That tag already exists for this pin!" });
  }
}

async function checkUser(req, res, next) {
  const user_id = req.decodedToken.subject;
  const haveOrIso_id = req.params.have_id
    ? req.params.have_id
    : req.params.iso_id;

  let userMatchesHave = await db("pins_have")
    .where({ user_id: user_id, have_id: haveOrIso_id })
    .first();

  let userMatchesIso = await db("pins_iso")
    .where({ user_id: user_id, iso_id: haveOrIso_id })
    .first();

  if (userMatchesHave || userMatchesIso) {
    next();
  } else {
    next({ status: 404, message: "User doesn't have this pin" });
  }
}

async function onlyOnce(req, res, next) {
  const user_id = req.decodedToken.subject;
  const pin_id = parseInt(req.params.pin_id);

  const userHaves = await db("pins_have").where("user_id", user_id);

  const userIsos = await db("pins_iso").where("user_id", user_id);

  const haveDupes = userHaves.filter((have) => {
    return have.pin_id === pin_id;
  });

  const isoDupes = userIsos.filter((iso) => {
    return iso.pin_id == pin_id;
  });

  if (haveDupes[0] || isoDupes[0]) {
    next({
      status: 401,
      message: "You already have or are in search of this pin",
    });
  } else {
    next();
  }
}

module.exports = {
  convertForDB,
  checkIfPinExists,
  checkIfTagExists,
  checkIfMakerExists,
  noPinDupes,
  noTagDupes,
  checkUser,
  onlyOnce,
};
