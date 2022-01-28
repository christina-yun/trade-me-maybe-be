const db = require("../data/db-config");

//Pin-specific functions
function findById(pin_id) {
  return db("pins").where("pin_id", pin_id).first();
}

function findByMaker(maker) {
  return db("pins").where("maker", maker);
}

function findUsersIsoPin(pin_id) {
  return db("users as u")
    .leftJoin("pins_iso as iso", "u.user_id", "iso.user_id")
    .leftJoin("pins as p", "p.pin_id", "iso.pin_id")
    .select("p.pin_id", "u.username")
    .where("p.pin_id", pin_id);
}

function findUsersWhoHavePin(pin_id) {
  return db("users as u")
    .leftJoin("pins_have as have", "u.user_id", "have.user_id")
    .leftJoin("pins as p", "p.pin_id", "have.pin_id")
    .select("p.pin_id", "u.username")
    .where("p.pin_id", pin_id);
}

async function createPin(new_pin) {
  const new_pin_id = await db("pins")
    .insert(new_pin, "pin_id")
    .returning("pin_id");

  return db("pins")
    .select("pin_id", "pin_name", "maker", "imgurl")
    .where("pin_id", parseInt(new_pin_id))
    .first();
}

async function updatePin(pin_id, updated_pin) {
  await db("pins").update(updated_pin).where("pin_id", pin_id);

  return db("pins")
    .select("pin_id", "pin_name", "maker", "imgurl")
    .where("pin_id", pin_id)
    .first();
}

async function removePin(pin_id) {
  const removed_pin = await db("pins")
    .select("pin_id", "pin_name", "maker", "imgurl")
    .where("pin_id", pin_id)
    .first();

  await db("pins").where("pin_id", pin_id).del();

  return removed_pin;
}

// ISO and Have functions
async function addISO(new_iso) {
  const new_ISO_id = await db("pins_iso")
    .insert(new_iso, "iso_id")
    .returning("iso_id");

  return db("pins_iso as iso")
    .leftJoin("pins as p", "iso.pin_id", "p.pin_id")
    .select(
      "iso.iso_id",
      "iso.user_id",
      "p.pin_id",
      "p.pin_name",
      "p.maker",
      "p.imgurl"
    )
    .where("iso_id", parseInt(new_ISO_id))
    .first();
}

async function addHave(new_have) {
  const new_have_id = await db("pins_have")
    .insert(new_have, "have_id")
    .returning("have_id");

  return db("pins_have as have")
    .leftJoin("pins as p", "have.pin_id", "p.pin_id")
    .select(
      "have.have_id",
      "have.user_id",
      "p.pin_id",
      "p.pin_name",
      "p.maker",
      "p.imgurl"
    )
    .where("have_id", parseInt(new_have_id))
    .first();
}

async function removeISO(iso_id) {
  const removed_iso = await db("pins_iso as iso")
    .leftJoin("pins as p", "iso.pin_id", "p.pin_id")
    .select(
      "iso.iso_id",
      "iso.user_id",
      "p.pin_id",
      "p.pin_name",
      "p.maker",
      "p.imgurl"
    )
    .where("iso_id", iso_id)
    .first();

  await db("pins_iso").where("iso_id", iso_id).del();

  return removed_iso;
}

async function removeHave(have_id) {
  const removed_have = await db("pins_have as have")
    .leftJoin("pins as p", "have.pin_id", "p.pin_id")
    .select(
      "have.have_id",
      "have.user_id",
      "p.pin_id",
      "p.pin_name",
      "p.maker",
      "p.imgurl"
    )
    .where("have_id", have_id)
    .first();

  await db("pins_have").where("have_id", have_id).del();

  return removed_have;
}
// Tag functions

function findByTag(tag_name) {
  return db("pins as p")
    .leftJoin("pin_tags as tags", "p.pin_id", "tags.pin_id")
    .select("p.pin_id", "p.pin_name", "p.maker", "p.imgurl", "tags.tag_name")
    .where("tags.tag_name", tag_name);
}

function findTagsByPin(pin_id) {
  return db("pins as p")
    .leftJoin("pin_tags as tags", "p.pin_id", "tags.pin_id")
    .select("p.pin_id", "tags.tag_name", "p.pin_name", "p.maker", "p.imgurl")
    .where("p.pin_id", pin_id);
}

async function createTag(new_tag) {
  const new_tag_id = await db("pin_tags")
    .insert(new_tag, "tags_id")
    .returning("tags_id");

  return db("pin_tags")
    .select("tags_id", "tag_name", "pin_id")
    .where("tags_id", parseInt(new_tag_id))
    .first();
}

//could potentially change tags_id to tag_name and have endpoint use tag_name instead of :tags_id
async function removeTag(pin_id, tag_name) {
  const removed_tag = await db("pin_tags")
    .select("tags_id", "tag_name", "pin_id")
    .where({ pin_id: pin_id, tag_name: tag_name })
    .first();

  await db("pin_tags").where({ pin_id: pin_id, tag_name: tag_name }).del();

  return removed_tag;
}

module.exports = {
  findById,
  findByMaker,
  findUsersIsoPin,
  findUsersWhoHavePin,
  findByTag,
  findTagsByPin,
  createPin,
  updatePin,
  removePin,
  createTag,
  removeTag,
  addISO,
  addHave,
  removeISO,
  removeHave,
};
